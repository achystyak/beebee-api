import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { ServerError } from './common.errors';

export const GqlSession = createParamDecorator(
    (data: unknown, context: ExecutionContext) => {
        try {
            const ctx = GqlExecutionContext.create(context)
            return ctx.getContext().req.user;
        } catch {
            throw ServerError.unauthorized('GQL auth error');
        }
    },
);

export const RestSession = createParamDecorator(
    (data: unknown, context: ExecutionContext) => {
        try {
            const ctx = context.switchToHttp().getRequest()
            return ctx.user;
        } catch {
            throw ServerError.unauthorized('REST auth error');
        }
    },
);