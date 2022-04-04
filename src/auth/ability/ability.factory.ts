import { Ability, AbilityBuilder, AbilityClass, ExtractSubjectType, InferSubjects } from "@casl/ability";
import { forwardRef, Inject, Injectable } from "@nestjs/common";
import { UsersService } from "src/api/users/users.service";
import { User } from "src/api/users/users.type";
import { Bike } from "src/api/bikes/bikes.type";
import { Credit } from "src/api/credits/credits.type";
import { Log } from "src/api/logs/logs.type";
import { Purchase } from "src/api/purchases/purchases.type";
import { Ride } from "src/api/rides/rides.type";
// Imports
import { AbleType, Action, DomainType } from "src/common/common.enums";
import { Session } from "src/api/sessions/sessions.type";

type AbilitySubjects = InferSubjects<
    typeof Session
  | typeof Bike
  | typeof Credit
  | typeof Log
  | typeof Purchase
  | typeof Ride
  | typeof User
> | 'all'

export type AppAbility = Ability<[Action, AbilitySubjects]>

@Injectable()
export class AbilityFactory {
    constructor(
        @Inject(forwardRef(() => UsersService)) private readonly usersService: UsersService
    ) { }
    async createForUser(user: User) {
        const { can, cannot, build } =
            new AbilityBuilder<Ability<[Action, AbilitySubjects]>>(Ability as AbilityClass<AppAbility>);

        allActions().map(action => {
            can(action, 'all')
        });

        // Role-based permissions
        /**
         const EntityType = toSubjectType(permission.domain);
                permission.actions.forEach(action => {
                    if (permission.type == AbleType.Can) {
                        can(action, EntityType, permission.conditions ?? undefined)
                    } else if (permission.type == AbleType.Cannot) {
                        cannot(action, EntityType, permission.conditions ?? undefined)
                    }
                });
         */

        return build({
            detectSubjectType: type => type.constructor as ExtractSubjectType<AbilitySubjects>
        });
    }
}

function toSubjectType(domain: DomainType) {
    switch (domain) {
        case DomainType.Session: return Session;
                case DomainType.Bike: return Bike;
        case DomainType.Credit: return Credit;
        case DomainType.Log: return Log;
        case DomainType.Purchase: return Purchase;
        case DomainType.Ride: return Ride;
        case DomainType.User: return User;
// Subject Types
    }
}

function allActions(): Action[] {
    return [
        Action.View,
        Action.Create,
        Action.Update,
        Action.Delete,
        Action.Subscribe
    ];
}
