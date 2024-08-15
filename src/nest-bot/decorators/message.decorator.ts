import { PipeTransform, Type } from '@nestjs/common';
import { createBotPipesParamDecorator } from '../../utils/param-decorator.util';
import { BotParamtype } from '../../enums/bot-paramtype.enum';

export function Message(): ParameterDecorator;
export function Message(
  ...pipes: (Type<PipeTransform> | PipeTransform)[]
): ParameterDecorator;
export function Message(
  property: string,
  ...pipes: (Type<PipeTransform> | PipeTransform)[]
): ParameterDecorator;
export function Message(
  property?: string | (Type<PipeTransform> | PipeTransform),
  ...pipes: (Type<PipeTransform> | PipeTransform)[]
) {
  return createBotPipesParamDecorator(BotParamtype.MESSAGE)(
    property,
    ...pipes,
  );
}
