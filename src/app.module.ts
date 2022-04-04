import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { GraphQLModule } from "@nestjs/graphql";
import { MongooseModule } from "@nestjs/mongoose";
import { SessionsModule } from "./api/sessions/sessions.module";
import { AbilityModule } from "./auth/ability/ability.module";
import { AuthModule } from "./auth/auth.module";
import { BikesModule } from "./api/bikes/bikes.module";
import { CreditsModule } from "./api/credits/credits.module";
import { LogsModule } from "./api/logs/logs.module";
import { PurchasesModule } from "./api/purchases/purchases.module";
import { RidesModule } from "./api/rides/rides.module";
import { UsersModule } from "./api/users/users.module";
import { TwilioModule } from "nestjs-twilio";
import { SmsModule } from "./sms/sms.module";
// Imports

const GQL_CORS_OPTIONS = {
  // origin: [
  //   "http://localhost:8080",
  //   "http://localhost:5000",
  //   "http://localhost:3000",
  // ],
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  allowedHeaders: "authorization, content-type",
  credentials: true,
}

@Module({
  imports: [

    // Config
    ConfigModule.forRoot({
      envFilePath: [".env"],
      isGlobal: true,
    }),

    // Database
    MongooseModule.forRoot(process.env.MONGO_URI),
    // SMS Module
    TwilioModule.forRoot({
      accountSid: process.env.TWILIO_ACCOUNT_SID,
      authToken: process.env.TWILIO_AUTH_TOKEN,
    }),
    // Modules
    UsersModule,
    RidesModule,
    PurchasesModule,
    LogsModule,
    CreditsModule,
    BikesModule,
    AbilityModule,
    AuthModule,
    SessionsModule,
    SmsModule,
  ]
})
export class AppModule { }
