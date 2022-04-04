import { forwardRef, Inject, Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UsersService } from 'src/api/users/users.service';
import { User } from 'src/api/users/users.type';
import { Action } from 'src/common/common.enums';
import { BaseService } from 'src/common/base.service';
import { SessionDocument, Session } from 'src/api/sessions/sessions.type';
import { v4 as uuid } from 'uuid'

const sha256 = require('js-sha256').sha256;

@Injectable()
export class SessionsService extends BaseService<Session> {

    public constructor(
        @InjectModel(Session.name) private model: Model<SessionDocument>,
        @Inject(forwardRef(() => UsersService)) private readonly usersService: UsersService,
    ) {
        super(model, SessionsService.logger);
    }

    private static readonly logger = new Logger(SessionsService.name);

    // Resolve Fields
    // ===============================================================================================

    async user(secret: string): Promise<User> {
        const session = await this.findOne({ secret });
        if (session?.user?._id) {
            return await this.usersService.findOne({ _id: session.user.toString() });
        }
        return null;
    }

    // Public Methods
    // ===============================================================================================

    async prolong(user: User, token: string): Promise<User> {
        this.log(Action.Update, "Prolonging session: [" + user._id + "]:[" + token + "]");
        const session = await this.sessionFor(user);
        if (session?.secret == token) {
            const newSession = await this.update(session, user);
            if (newSession && newSession.secret !== token) {
                return await this.usersService.findOne({ _id: user._id });
            }
        }
        return undefined
    }

    async sessionFor(user: User): Promise<Session> {
        if (!user?._id) {
            return null;
        }
        let sessions = await await this.find({ user: user._id, expired: false });
        let session: Session = null;
        if (sessions.length != 1) {
            const deletes = sessions.map(s => s._id);
            if (deletes.length) {
                this.log(Action.Delete, user, sessions);
                await this.model.deleteMany({ _id: { $in: deletes } });
            }
            session = await this.create(user);
        } else {
            session = sessions[0];
        }
        return session;
    }

    // Private Methods
    // ===============================================================================================

    private async create(user: User): Promise<Session> {
        this.log(Action.Create, user);
        return await this.model.create(new Session({
            secret: this.longToken(),
            expired: false,
            user,
        }));
    }

    private async update(session: Session, user: User): Promise<Session> {
        this.log(Action.Update, user._id);
        session.secret = this.longToken();
        await this.model.updateOne({ _id: session._id }, session);
        return await this.sessionFor(user);
    }

    private longToken(): string {
        return sha256(uuid());
    }
}
