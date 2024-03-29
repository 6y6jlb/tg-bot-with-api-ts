import { i18n } from "i18next";
import { TaskError } from "../../../exceptions/Task";
import { EVENT_ENUM, EVENT_OPTIONS } from "../../../models/const";
import { COMMANDS } from '../../../utils/const';
import { Callback } from "../../BotNotification/Callback";
import UserSettingsService from "../../UserSetttings/UserSettingsService";

export async function setOptions(notification: Callback, i18: i18n) {
  const chatId = String(notification.getChatId());
  const notificator = notification.getNotificator()
  const data = notification.getData();
  const user = await notification.getUser();

  if (!data) {
    throw new TaskError('Task options can not be setted because data is empty')
  }

  const params = new URLSearchParams(data.split('?')[1]);

  const taskId = params.has('id') && params.get('id');
  const type = params.has('type') && params.get('type');
  if (taskId && type) {
    const key = Object.keys(EVENT_OPTIONS).find(key => EVENT_OPTIONS[key] === type);

    //@ts-ignore
    await UserSettingsService.updateOrCreate({ user_id: user._id, app_type: Number(key), created_at: new Date(), payload: { task_id: taskId } });

    await notificator.send(chatId, {
      text: i18.t(message[type]), options: {
        parse_mode: 'HTML',
        reply_markup: {
          inline_keyboard: [
            [{ text: i18.t('buttons.reset'), callback_data: COMMANDS.RESTART }],
          ]
        }
      }
    });
  } else {
    console.warn('Set task option error: data - ' + data)
    await notificator.send(chatId, { text: `${i18.t('tasks.update.error')}` });
  }
}

const message: { [key: string]: string } = {
  [EVENT_ENUM.EXCHANGE]: 'tasks.options.exchange',
  [EVENT_ENUM.REMINDER]: 'tasks.options.reminder',
  [EVENT_ENUM.WEATHER]: 'tasks.options.weather',
}

