import { ModuleMetadata, Type } from '@nestjs/common/interfaces';
import { Middleware, Telegraf } from 'telegraf';

export interface BotModuleOptions {
  type:"telegram"
  botName?: string;
  options?: Partial<Telegraf.Options<any>>;
  launchOptions?: Telegraf.LaunchOptions | false;
  include?: Function[];
  middlewares?: ReadonlyArray<Middleware<any>>;
}

export interface BotOptionsFactory {
  createTelegrafOptions():
    | Promise<BotModuleOptions>
    | BotModuleOptions;
}

export interface BotModuleAsyncOptions
  extends Pick<ModuleMetadata, 'imports'> {
  botName?: string;
  useExisting?: Type<BotOptionsFactory>;
  useClass?: Type<BotOptionsFactory>;
  useFactory?: (
    ...args: any[]
  ) => Promise<BotModuleOptions> | BotModuleOptions;
  inject?: any[];
}
