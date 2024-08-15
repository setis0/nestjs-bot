import { DiscoveryModule, ModuleRef } from '@nestjs/core';
import {
  DynamicModule,
  Global,
  Inject,
  Module,
  OnApplicationShutdown,
  Provider,
  Type,
} from '@nestjs/common';
import {
  BotModuleAsyncOptions,
  BotModuleOptions,
  BotOptionsFactory,
} from './interfaces';
import {
  BOT_NAME,
  BOT_MODULE_OPTIONS,
} from './interfaces/bot.constants';
import { ListenersExplorerService, MetadataAccessorService } from './services';
import { BotStageProvider } from './providers/stage.provider';
import {
  allBotsMap,
  allBotsProvider,
} from './providers/all-bots.provider';
import { createBotFactory, getBotToken } from './utils';
import { BotService } from './services/bot.service';
import { TestAppModule } from './test/test.app/test.app.module';

@Global()
@Module({
  imports: [DiscoveryModule, TestAppModule],
  providers: [ListenersExplorerService, MetadataAccessorService, BotService],
})
export class BotCoreModule implements OnApplicationShutdown {
  constructor(
    @Inject(BOT_NAME)
    private readonly botName: string,
    private readonly moduleRef: ModuleRef,
  ) {}

  public static forRoot(options: BotModuleOptions): DynamicModule {
    const BotName = getBotToken(options.name);

    const BotNameProvider = {
      provide: BOT_NAME,
      useValue: BotName,
    };

    const BotProvider: Provider = {
      provide: BotName,
      useFactory: async () => {
        const bot = await options.configure.api(options.configure.options);
        allBotsMap.set(BotName, bot);
        return bot;
      },
    };

    return {
      module: BotCoreModule,
      providers: [
        {
          provide: BOT_MODULE_OPTIONS,
          useValue: options,
        },
        BotStageProvider,
        BotNameProvider,
        BotProvider,
        allBotsProvider,
      ],
      exports: [
        BotStageProvider,
        BotNameProvider,
        BotProvider,
        allBotsProvider,
      ],
    };
  }

  public static forRootAsync(
    options: BotModuleAsyncOptions,
  ): DynamicModule {
    const telegrafBotName = getBotToken(options.botName);

    const telegrafBotNameProvider = {
      provide: BOT_NAME,
      useValue: telegrafBotName,
    };

    const telegrafBotProvider: Provider = {
      provide: telegrafBotName,
      useFactory: async (options: BotModuleOptions) => {
        const bot = await options.configure.api(options.configure.options);
        allBotsMap.set(telegrafBotName, bot);
        return bot;
      },
      inject: [BOT_MODULE_OPTIONS],
    };

    const asyncProviders = this.createAsyncProviders(options);
    return {
      module: BotCoreModule,
      imports: options.imports,
      providers: [
        ...asyncProviders,
        BotStageProvider,
        telegrafBotNameProvider,
        telegrafBotProvider,
        allBotsProvider,
      ],
      exports: [
        BotStageProvider,
        telegrafBotNameProvider,
        telegrafBotProvider,
        allBotsProvider,
      ],
    };
  }

  async onApplicationShutdown(): Promise<void> {
    const bot = this.moduleRef.get<any>(this.botName);
    bot && (await bot.stop());
  }

  private static createAsyncProviders(
    options: BotModuleAsyncOptions,
  ): Provider[] {
    if (options.useExisting || options.useFactory) {
      return [this.createAsyncOptionsProvider(options)];
    }
    const useClass = options.useClass as Type<BotOptionsFactory>;
    return [
      this.createAsyncOptionsProvider(options),
      {
        provide: useClass,
        useClass,
      },
    ];
  }

  private static createAsyncOptionsProvider(
    options: BotModuleAsyncOptions,
  ): Provider {
    if (options.useFactory) {
      return {
        provide: BOT_MODULE_OPTIONS,
        useFactory: options.useFactory,
        inject: options.inject || [],
      };
    }
    // `as Type<TelegrafOptionsFactory>` is a workaround for microsoft/TypeScript#31603
    const inject = [
      (options.useClass || options.useExisting) as Type<BotOptionsFactory>,
    ];
    return {
      provide: BOT_MODULE_OPTIONS,
      useFactory: async (optionsFactory: BotOptionsFactory) =>
        await optionsFactory.createBotOptions(),
      inject,
    };
  }
}
