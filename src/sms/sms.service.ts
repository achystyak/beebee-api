import { forwardRef, Inject, Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { InjectTwilio, TwilioClient } from 'nestjs-twilio';
import { UsersService } from 'src/api/users/users.service';
import { User } from 'src/api/users/users.type';
import { AuthService } from 'src/auth/auth.service';
import { BaseService } from 'src/common/base.service';
import { HashUtils } from 'src/utils/hash.utils';
import { Sms, SmsDocument } from './sms.type';

@Injectable()
export class SmsService extends BaseService<Sms> {

    public constructor(
        @InjectModel(Sms.name) private model: Model<SmsDocument>,
        @InjectTwilio() private readonly client: TwilioClient,
        @Inject(forwardRef(() => UsersService)) private readonly usersService: UsersService,
        @Inject(forwardRef(() => AuthService)) private readonly authService: AuthService,
    ) {
        super(model);
    }

    private static readonly logger = new Logger(SmsService.name);

    // Resolve Fields
    // ===============================================================================================

    async recipients(smsId: string): Promise<User[]> {
        return [];
    }

    // Methods
    // ===============================================================================================

    async sendSmsCode(phone: string, hash: string): Promise<any> {
        if (!HashUtils.verifySign(phone, hash)) {
            return null;
        }
        let user = await this.usersService.findOne({ phone })
        if (!user) {
            user = await this.usersService.registerPhone(phone);
        }
        const code = this.generateCode();
        const sms = await this.createOne(new Sms({ code, user, date: new Date() }));
        if (!sms) {
            return null;
        }
        await this.sendSms(user, code);
        return {
            code: sms.code,
            userId: user._id,
            phone: user.phone
        };
    }

    async verifySmsCode(phone: string, code: string): Promise<User> {
        const user = await this.usersService.findOne({ phone });
        if (user) {
            const messages = await this.model.find({ user });
            const sms = messages.find(m => {
                return m.code === code &&
                    Date.now() + 15 * 60 * 1000 > m.createdAt.getTime() &&
                    m.verified != true
            });
            if (sms) {
                sms.verified = true;
                await this.model.updateOne({ _id: sms._id }, { sms });
                return await this.authService.login(user);
            }
        }
        return null;
    }

    // Private
    // ===============================================================================================

    private async sendSms(user: User, body: string) {
        try {
            return await this.client.messages.create({
                body, from: process.env.TWILIO_PHONE_NUMBER,
                to: user.phone.toString(),
            })
        } catch (e) {
            console.log(e);
        }
    }

    private generateCode(): string {
        return Math.floor(100000 + Math.random() * 900000) + ""
    }
}


