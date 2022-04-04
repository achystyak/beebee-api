import { registerEnumType } from "@nestjs/graphql"

export enum DomainType {
  Session = "Session",
  Bike = "Bike",
Credit = "Credit",
Log = "Log",
Purchase = "Purchase",
Ride = "Ride",
User = "User",
// DomainTypes
}
registerEnumType(DomainType, { name: "DomainType" });

export enum Action {
  View = "View",
  Create = "Create",
  Update = "Update",
  Delete = "Delete",
  Subscribe = "Subscribe"
}
registerEnumType(Action, { name: "Action" });

export enum AbleType {
  Can = "Can",
  Cannot = "Cannot"
}
registerEnumType(AbleType, { name: "AbleType" });