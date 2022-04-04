import * as mongoose from 'mongoose'

import { Logger, NotFoundException } from "@nestjs/common";
import { Action } from './common.enums';
import { PaginatedDto } from './common.dto';
import { ServerError } from './common.errors';

export class BaseServiceArgs {
    paged?: PaginatedDto
    projection?: object
    populate?: mongoose.PopulateOptions
    sort?: object
}

export class BaseService<Entity> {

    constructor(
        private readonly _model: mongoose.Model<Entity & mongoose.Document>,
        private readonly logger = new Logger(_model.collection.name)
    ) {
    }

    public searchFor({ search, fields }: {
        search: string; fields: string[];
    }): any {
        let filter = {};
        if (search?.length && fields?.length) {
            filter['$or'] = [];
            for (const key of fields) {
                filter['$or'].push({
                    '$expr': {
                        $regexMatch: {
                            input: `$${key}`,
                            regex: search,
                            options: 'i'
                        }
                    }
                });
            }
        }
        return filter;
    }

    // Getters
    // ===========================================================================================

    public async findOne(opt?: any, args?: BaseServiceArgs): Promise<Entity> {
        try {
            return (await this._model
                .findOne(opt, args?.projection, { ...(args?.paged ?? {}), lean: true })
                .populate(args?.populate)
                .sort(args?.sort)
                .exec()
            ) as Entity
        }
        catch {
            throw ServerError.notFound(`${this._model.collection.name} not found`)
        }
    }

    public async find(opt?: any, args?: BaseServiceArgs): Promise<Entity[]> {
        try {
            return (await this._model
                .find(opt, args?.projection, { ...(args?.paged ?? {}), lean: true })
                .populate(args?.populate)
                .sort(args?.sort)
                .exec()
            ) as Entity[]
        }
        catch {
            throw ServerError.notFound(`${this._model.collection.name} not found`)
        }
    }

    public async count(opt?: any): Promise<number> {
        try {
            return await this._model.countDocuments(opt);
        }
        catch (e) {
            throw ServerError.notFound(`${this._model.collection.name} not counted`)
        }
    }

    // Create methods
    // ===========================================================================================

    protected async createOne(entity: Entity): Promise<Entity> {
        try {
            return (await this._model.create(entity))['_doc'] as Entity
        }
        catch {
            throw ServerError.badRequest(`${this._model.collection.name} not created`);
        }
    }

    protected async createMany(entities: Entity[]): Promise<Entity[]> {
        try {
            return (await this._model.create(entities))?.map(e => e['_doc']) as Entity[]
        }
        catch {
            throw ServerError.badRequest(`${this._model.collection.name} not created`);
        }
    }

    // Update Methods
    // ===========================================================================================

    protected async updateOne(opt: any, entity: Entity, args?: BaseServiceArgs): Promise<Entity> {
        try {
            const result = await this._model.updateOne(opt, entity);
            if (result.ok) {
                return await this.findOne(opt, args);
            }
            throw ServerError.badRequest(`${this._model.collection.name} updating failed`);
        }
        catch {
            throw ServerError.badRequest(`${this._model.collection.name} not updated`);
        }
    }

    protected async updateMany(opt: any, entity: Entity, args?: BaseServiceArgs): Promise<Entity[]> {
        try {
            const result = await this._model.updateMany(opt, entity);
            if (result.ok) {
                return await this.find(opt, args);
            }
            throw ServerError.badRequest(`${this._model.collection.name} updating failed`);
        }
        catch {
            throw ServerError.badRequest(`${this._model.collection.name} not updated`);
        }
    }

    // Delete Methods
    // ===========================================================================================

    protected async deleteOne(opt: any, args?: BaseServiceArgs): Promise<Entity> {
        try {
            const result = await this.findOne(opt, args);
            if (result) {
                await this._model.deleteOne(result);
                return result;
            }
            return null;
        }
        catch {
            throw ServerError.badRequest(`${this._model.collection.name} not deleted`);
        }
    }

    protected async deleteMany(opt: any, args?: BaseServiceArgs): Promise<Entity[]> {
        try {
            const result = await this.find(opt, args);
            if (result) {
                await this._model.deleteMany(opt);
                return result;
            }
            return [];
        }
        catch {
            throw ServerError.badRequest(`${this._model.collection.name} not deleted`);
        }
    }

    // Logging
    // ===========================================================================================

    protected async log(type: Action, session: any, input?: object) {

        this.logger.log(type + " -> [" + session + "]" + (input ? ":[" + JSON.stringify(input) + "]" : ""))
    }
}