import { assignMetadata, PipeTransform, Type } from '@nestjs/common';
import { isNil, isString } from '@nestjs/common/utils/shared.utils';
import { BotParamtype } from '../interfaces/bot-paramtype.enum';
import { PARAM_ARGS_METADATA } from '../interfaces/bot.constants';

export type ParamData = object | string | number;

export const createBotParamDecorator =
  (paramtype: BotParamtype) =>
  (data?: ParamData): ParameterDecorator =>
  (target, key, index) => {
    const args =
      Reflect.getMetadata(PARAM_ARGS_METADATA, target.constructor, key) || {};
    Reflect.defineMetadata(
      PARAM_ARGS_METADATA,
      assignMetadata(args, paramtype, index, data),
      target.constructor,
      key,
    );
  };

export const createBotPipesParamDecorator =
  (paramtype: BotParamtype) =>
  (
    data?: any,
    ...pipes: (Type<PipeTransform> | PipeTransform)[]
  ): ParameterDecorator =>
  (target, key, index) => {
    addPipesMetadata(paramtype, data, pipes, target, key, index);
  };

export const addPipesMetadata = (
  paramtype: BotParamtype,
  data: any,
  pipes: (Type<PipeTransform> | PipeTransform)[],
  target: Record<string, any>,
  key: string | symbol,
  index: number,
) => {
  const args =
    Reflect.getMetadata(PARAM_ARGS_METADATA, target.constructor, key) || {};
  const hasParamData = isNil(data) || isString(data);
  const paramData = hasParamData ? data : undefined;
  const paramPipes = hasParamData ? pipes : [data, ...pipes];

  Reflect.defineMetadata(
    PARAM_ARGS_METADATA,
    assignMetadata(args, paramtype, index, paramData, ...paramPipes),
    target.constructor,
    key,
  );
};
