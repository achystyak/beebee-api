import { PubSub } from "apollo-server-express";

export class Publisher {
    public static sub = new PubSub();
}