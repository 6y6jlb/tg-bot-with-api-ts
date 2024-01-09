import TelegramBotApi from "node-telegram-bot-api";
import Bot from "../../controllers/telegram/Bot";
import { COMMANDS } from "../../utils/const";
import { NotificationFactory } from "../BotNotification/AbstractFactory";
import { TypeEnum } from "../BotNotification/consts";
import { CALLBACK_COMMAND } from './../../utils/const';
import { choiceOptions } from "./commands/choiceOptions";
import { currencies } from "./commands/currencies";
import { deleteTask } from "./commands/deleteTask";
import { language } from './commands/language';
import { makeTaskRegular } from "./commands/makeTaskRegular";
import { restart } from "./commands/restart";
import { setOptions } from "./commands/setOptions";
import { storeTask } from "./commands/storeTask";
import { updateTask } from './commands/updateTask';


export const callbackHandler = async (bot: Bot, msg: TelegramBotApi.CallbackQuery) => {
  const data = msg.data;

  if (!data) {
    throw new Error('Callback handler does not have data')
  }

  const callback = new NotificationFactory(TypeEnum.CALLBACK, { bot: bot.instance, msg }).build();


  if (data === COMMANDS.RESTART) {
    await restart(callback, bot.localeService.i18);
  }

  else if (data.includes(COMMANDS.TASKS_DELETE)) {
    await deleteTask(callback, bot.localeService.i18);
  }

  else if (data === COMMANDS.CURRENCIES) {
    await currencies(callback, bot.localeService.i18);
  }

  else if (data.includes(COMMANDS.TASKS_MAKE_REGULAR)) {
    await makeTaskRegular(callback, bot.localeService.i18);
  }

  else if (data.includes(COMMANDS.TASKS_CHOICE_OPTIONS)) {
    await choiceOptions(callback, bot.localeService.i18);
  }

  else if (data.includes(COMMANDS.TASKS_SET_OPTIONS)) {
    await setOptions(callback, bot.localeService.i18);
  }

  else if (data.includes(COMMANDS.TASKS_STORE)) {
    await storeTask(callback, bot.localeService.i18);
  }

  else if (data.includes(COMMANDS.TASKS_UPDATE)) {
    await updateTask(callback, bot.localeService.i18);
  }

  else if (data.includes(CALLBACK_COMMAND.LANGUAGE_CHOICE)) {
    await language(callback, bot.localeService.i18)
  }


  else {
    await callback.send({ text: bot.localeService.i18.t('actions.undefined.description') });
  }

};

