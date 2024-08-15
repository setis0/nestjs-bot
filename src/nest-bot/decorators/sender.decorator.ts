import { PipeTransform, Type } from '@nestjs/common';
import { createBotPipesParamDecorator } from '../utils/param-decorator.util';
import { BotParamtype } from '../interfaces/bot-paramtype.enum';

export function Sender(): ParameterDecorator;
export function Sender(
  ...pipes: (Type<PipeTransform> | PipeTransform)[]
): ParameterDecorator;
export function Sender(
  property: string,
  ...pipes: (Type<PipeTransform> | PipeTransform)[]
): ParameterDecorator;
export function Sender(
  property?: string | (Type<PipeTransform> | PipeTransform),
  ...pipes: (Type<PipeTransform> | PipeTransform)[]
) {
  return createBotPipesParamDecorator(BotParamtype.SENDER)(
    property,
    ...pipes,
  );
}
