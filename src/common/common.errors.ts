import { ForbiddenException, HttpException, HttpStatus, NotFoundException, UnauthorizedException } from "@nestjs/common";

export class ServerError {
    static badRequest(title: string, messages: string[] = []) {
        return new HttpException({
            status: HttpStatus.BAD_REQUEST,
            errors: [{
                body: "Bad Request",
                title,
                messages
            }]
        }, HttpStatus.BAD_REQUEST);
    }

    static unauthorized(title: string, messages: string[] = []) {
        return new UnauthorizedException({
            errors: [{
                body: "Not authorized",
                title,
                messages
            }]
        })
    }

    static forbidden(title: string, messages: string[] = []) {
        return new ForbiddenException({
            errors: [{
                body: "Not authorized",
                title,
                messages
            }]
        })
    }

    static notFound(title: string, messages: string[] = []) {
        return new NotFoundException({
            errors: [{
                body: "Not found",
                title,
                messages
            }]
        })
    }
}