import { BotModule } from "../bot.module";
import { Logger, Module } from "@nestjs/common";
import { Telegraf } from "telegraf";
import { TestAppModule } from "./test.app/test.app.module";

@Module({
  imports: [
    BotModule.forRoot({
      configure: {
        options: {
          token: "fdkjsdkfjkldsf"
        },
        api: async (options) => {
          const bot = new Telegraf<any>(options.token, options.options);
          if(options.middlewares){
            bot.use(...(options.middlewares ?? []));
          }
          bot.catch((err, ctx) =>
            Logger.error(err, `bot: ${ctx.botInfo.username}`)
          );
          return {
            start:async ()=>{
              if (options.launchOptions !== false) {
                await bot.launch(options.launchOptions);
              }
            },
            stop:async ()=>{
              await bot.stop();
            },
            api:bot
          };
        }
      },
      type: "telegraf",
      name: "test",
    })
  ]
})
export class TestBotModule {
}