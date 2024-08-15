import { ModuleMetadata, Type } from '@nestjs/common/interfaces';
import { Middleware, Telegraf } from 'telegraf';

export interface TelegrafModuleOptions {
  botName?: string;
  type:'telegraf'
  name?: string;
  configure:{
    options:{
      token: string;
      options?: Partial<Telegraf.Options<any>>;
      launchOptions?: Telegraf.LaunchOptions | false;
    }
    api: ()=>Promise<Telegraf>
    start: ()=>Promise<void>,
    stop: ()=>Promise<void>
  }
  middlewares?: ReadonlyArray<Middleware<any>>;
}

export interface TelegrafOptionsFactory {
  createTelegrafOptions():
    | Promise<TelegrafModuleOptions>
    | TelegrafModuleOptions;
}

export interface TelegrafModuleAsyncOptions
  extends Pick<ModuleMetadata, 'imports'> {
  botName?: string;
  useExisting?: Type<TelegrafOptionsFactory>;
  useClass?: Type<TelegrafOptionsFactory>;
  useFactory?: (
    ...args: any[]
  ) => Promise<TelegrafModuleOptions> | TelegrafModuleOptions;
  inject?: any[];
}
