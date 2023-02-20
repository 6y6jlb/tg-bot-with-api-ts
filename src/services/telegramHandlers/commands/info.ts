import { i18n } from "i18next";
import moment from "moment-timezone";
import Bot from "../../../controllers/telegram/Bot";
import { IUser } from "../../../models/types";
import { Message } from "../../Notification/Message";
import UserService from "../../User/UserService";


export async function info(notification: Message, i18: i18n) {
    let message = '';
    const chatId = notification.getChatId();
    try {
        const user = await UserService.get({ id: chatId }) as IUser;

        const createdAt = moment(user.created_at).tz(user.tz).format('HH:mma M.D.YYYY');

        message = i18.t('actions.info', { name: user.name, userId: user.id, lang: user.language, tz: user.tz, createdAt });
    } catch (error) {
        message = error.message;
    }

    await notification.send({text: message, options: {
        parse_mode: 'HTML',
    }});
}
