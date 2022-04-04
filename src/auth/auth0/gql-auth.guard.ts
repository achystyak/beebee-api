import { UnauthorizedException } from "@nestjs/common";
import { ExecutionContext, Injectable } from "@nestjs/common";
import { GqlExecutionContext } from "@nestjs/graphql";
import { AuthGuard } from "@nestjs/passport";
import { ServerError } from "src/common/common.errors";

@Injectable()
export class GqlAuthGuard extends AuthGuard('jwt') {
  getRequest(context: ExecutionContext) {
    try {
      const ctx = GqlExecutionContext.create(context)
      return ctx.getContext().req
    } catch {
      throw ServerError.unauthorized('GQL Guard auth failed');
    }
  }
}