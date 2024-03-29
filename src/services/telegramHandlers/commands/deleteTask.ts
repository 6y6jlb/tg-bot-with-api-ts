import { i18n } from "i18next";
import { TaskError } from "../../../exceptions/Task";
import { ITask } from "../../../models/types";
import { COMMANDS } from "../../../utils/const";
import AdminService from "../../Admin/AdminService";
import { Callback } from "../../BotNotification/Callback";
import TaskService from "../../Task/TaskService";


export async function deleteTask(notification: Callback, i18: i18n) {
  const user = await notification.getUser();
  const data = notification.getData();
  const chatId = String(notification.getChatId());
  const notificator = notification.getNotificator()

  if (!data) {
    throw new TaskError('Task can not be deleted because data is empty')
  }

  const params = new URLSearchParams(data.split('?')[1]);
  const taskId = params.has('task_id') && params.get('task_id');
  const buttons = [];
  let message = '';

  if (taskId) {
    //@ts-ignore
    await TaskService.delete({ _id: taskId });
    message = i18.t('tasks.delete.success');

  } else {

    const isAdmin = user.telegram_id && await AdminService.checkAdmin(user.telegram_id);
    const tasks = await TaskService.get(isAdmin ? {} : { user_id: user._id }) as ITask[];

    tasks.forEach(task => buttons.push([{ text: task._id, callback_data: `${COMMANDS.TASKS_DELETE}?task_id=${task._id}` }]))
    message = i18.t('actions.tasks.delete-description');

  }

  buttons.push([{ text: i18.t('buttons.reset'), callback_data: COMMANDS.RESTART }])

  await notificator.send(chatId, {
    text: message, options: {
      parse_mode: 'HTML',
      reply_markup: {
        inline_keyboard: buttons
      }
    }
  });
}
