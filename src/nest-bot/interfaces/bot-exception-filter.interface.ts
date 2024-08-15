import { ArgumentsHost } from '@nestjs/common';

export interface BotExceptionFilter<T = any> {
  catch(exception: T, host: ArgumentsHost): any;
}
