import { ModuleMetadata, Type } from '@nestjs/common/interfaces';
import { Middleware, Telegraf } from 'telegraf';
export interface BotApiManager{
  start: ()=>Promise<void>,
  stop: ()=>Promise<void>
  api:unknown
}
export interface BotApiContext{
  options?:object
  api: (options?:object)=>Promise<unknown & BotApiManager>

}
export interface BotModuleOptions {
  type:string
  name?: string;
  configure:BotApiContext
  middlewares?: ReadonlyArray<Middleware<any>>;
  include?: Function[];
}

export interface BotOptionsFactory {
  createBotOptions():
    | Promise<BotModuleOptions>
    | BotModuleOptions;
}

export interface BotModuleAsyncOptions
  extends Pick<ModuleMetadata, 'imports'> {
  name?: string;
  useExisting?: Type<BotOptionsFactory>;
  useClass?: Type<BotOptionsFactory>;
  useFactory?: (
    ...args: any[]
  ) => Promise<BotModuleOptions> | BotModuleOptions;
  inject?: any[];
}
