import { forwardRef, Module } from '@nestjs/common';
import { UsersModule } from 'src/api/users/users.module';
import { AbilityFactory } from './ability.factory';

@Module({
  imports: [
    forwardRef(() => UsersModule),
  ],
  providers: [AbilityFactory],
  exports: [AbilityFactory],
})
export class AbilityModule { }