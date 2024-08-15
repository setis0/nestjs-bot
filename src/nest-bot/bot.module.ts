import { Module, DynamicModule } from '@nestjs/common';
import { BotCoreModule } from './bot-core.module';
import {
  BotModuleOptions,
  BotModuleAsyncOptions,
} from './interfaces';

@Module({})
export class BotModule {
  public static forRoot(options: BotModuleOptions): DynamicModule {
    return {
      module: BotModule,
      imports: [BotCoreModule.forRoot(options)],
      exports: [BotCoreModule],
    };
  }

  public static forRootAsync(
    options: BotModuleAsyncOptions,
  ): DynamicModule {
    return {
      module: BotModule,
      imports: [BotCoreModule.forRootAsync(options)],
      exports: [BotCoreModule],
    };
  }
}
