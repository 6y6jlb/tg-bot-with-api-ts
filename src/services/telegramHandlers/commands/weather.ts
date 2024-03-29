import { i18n } from "i18next";
import { APP_TYPE_ENUM } from "../../../models/const";
import { COMMANDS } from "../../../utils/const";
import { Message } from "../../BotNotification/Message";
import UserSettingsService from "../../UserSetttings/UserSettingsService";


export async function weather(notification: Message, i18: i18n) {
    const chatId = String(notification.getChatId());
    const notificator = notification.getNotificator()
    const user = await notification.getUser();

    if (!user) return;

    let message = '';

    try {
        UserSettingsService.updateOrCreate({ user_id: user._id, app_type: APP_TYPE_ENUM.WEATHER_REQUEST, created_at: new Date() });
        message = i18.t('weather.get-description');
    } catch (error: any) {
        message = error.message;
    }

    await notificator.send(chatId, {
        text: message, options: {
            reply_markup: {
                inline_keyboard: [
                    [{ text: i18.t('buttons.reset'), callback_data: COMMANDS.RESTART }],
                ]
            }
        }
    });
}
