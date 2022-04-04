import { forwardRef, Inject, Injectable, Logger } from '@nestjs/common';
import { UsersService } from 'src/api/users/users.service';
import { JwtService } from '@nestjs/jwt';
import { SessionsService } from '../api/sessions/sessions.service';
import { User } from 'src/api/users/users.type';
import { AbilityFactory } from './ability/ability.factory';
import { Action } from 'src/common/common.enums';
import { BaseEntity } from 'src/common/base.entity';
import { ServerError } from 'src/common/common.errors';
import { SmsService } from 'src/sms/sms.service';

const jwt = require('jsonwebtoken')

@Injectable()
export class AuthService {
    constructor(
        @Inject(forwardRef(() => UsersService)) private readonly usersService: UsersService,
        @Inject(forwardRef(() => SessionsService)) private readonly sessionService: SessionsService,
        @Inject(forwardRef(() => AbilityFactory)) private abilityFactory: AbilityFactory,
        @Inject(forwardRef(() => SmsService)) private readonly smsService: SmsService,
        @Inject(forwardRef(() => JwtService)) private readonly jwtService: JwtService) {
    }

    private readonly logger = new Logger(AuthService.name);

    async login(user: any) {
        const session = await this.sessionService.sessionFor(user);
        if (session) {
            const payload = { ...user, password: undefined }
            return {
                _id: user?._id?.toString() ?? user?.id,
                refresh_token: session.secret,
                access_token: this.jwtService.sign(payload),
            };
        }
        throw ServerError.unauthorized('Wrong credentials');
    }

    // Ability
    // =================================================================================================================

    async able<Entity extends BaseEntity>(session: User, action: Action, entity: Entity): Promise<Entity> {
        const ability = await this.abilityFactory.createForUser(session)
        if (!ability.can(action, entity)) {
            throw ServerError.forbidden('Forbidden resource');
        }
        return entity
    }

    async ableAll<Entity extends BaseEntity>(session: User, action: Action, entities: Entity[]): Promise<Entity[]> {
        const ability = await this.abilityFactory.createForUser(session)
        if (!entities.every(entity => ability.can(action, entity))) {
            throw ServerError.forbidden('Forbidden resource');
        }
        return entities
    }

    async ableOrNull<Entity extends BaseEntity>(session: User, action: Action, entity: Entity): Promise<Entity> {
        const ability = await this.abilityFactory.createForUser(session)
        return ability.can(action, entity) ? entity : null
    }

    async ableFilter<Entity extends BaseEntity>(session: User, action: Action, entities: Entity[]): Promise<Entity[]> {
        const ability = await this.abilityFactory.createForUser(session)
        return entities.filter(entity => ability.can(action, entity))
    }

    // User Validation
    // =================================================================================================================

    async jwtUser(token: string): Promise<User> {
        const jwtToken = token?.split("Bearer ")?.join("")?.trim() ?? null
        if (jwtToken) {
            const decoded = jwt.decode(jwtToken)
            if (decoded?.exp && (decoded?.exp - (Date.now() / 1000)) > 0) {
                const user = await this.usersService.findOne({ _id: decoded?._id })
                if (user) {
                    return user
                }
            }
        }
    }

    // Prolonging
    // =================================================================================================================

    async sendCode(phone: string, hash: string): Promise<any> {
        return await this.smsService.sendSmsCode(phone, hash);
    }

    async verifyCode(phone: string, code: string): Promise<any> {
        return await this.smsService.verifySmsCode(phone, code);
    }

    // Subscription Utils
    // =================================================================================================================

    public subGuard(vars: any, payload: any, subName: any): boolean {
        try {
            const data = vars.data;
            const token = (data.token + "").replace("Bearer ", "");
            const result = this.jwtService.decode(token, { complete: true, json: true });
            if (data?._ids?.length) {
                const entities = payload[subName] as [];
                const _ids = data?._ids.map(_id => { return { _id } }) as [] ?? [];
                const results = _ids.filter(
                    ({ _id: id1 }) => entities.some(({ _id: id2 }) => id1 === id2)
                );
                return !!(result && results.length);
            }
            return !!(result);
        } catch {
            return false;
        }
    }
}