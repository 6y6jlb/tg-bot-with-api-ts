import { Request, Response } from "express";
import TaskApiRequest from "../../requests/Task/TaskApiRequest";
import AdminService from "../../services/Admin/AdminService";
import TaskService from "../../services/Task/TaskService";
import ErrorResponse from "../../services/response/ErrorResponse";
import { TaskError } from "../../exceptions/Task";
import { IUser } from "../../models/types";


class TasksController {
    async get(req: Request, res: Response) {
        try {
            //@ts-ignore
            const user: IUser = req.user;
            if (user._id) {
                const data = await TaskApiRequest.get(req);
                if (await AdminService.checkAdmin(Number(user.telegram_id))) {
                    res.json(await TaskService.get(data))
                } else {
                    res.json(await TaskService.get({ user_id: user._id, ...data }))
                }

            } else {
                throw new TaskError('Invalid user')
            }
        } catch (error: any) {
            ErrorResponse.setError(error).setResponse(res).build().json()
        }
    }
    async update(req: Request, res: Response) {
        try {
            //@ts-ignore
            const user: IUser = req.user;
            if (user._id) {
                const data = await TaskApiRequest.update(req);
                if (await AdminService.checkAdmin(Number(user.telegram_id))) {
                    res.json(await TaskService.update(data))
                } else {
                    res.json(await TaskService.update({ ...data, user_id: user._id }))
                }

            } else {
                throw new TaskError('Invalid user')
            }

        } catch (error: any) {
            ErrorResponse.setError(error).setResponse(res).build().json()
        }
    }
    async store(req: Request, res: Response) {
        try {
            //@ts-ignore
            const user: IUser = req.user;
            if (user._id) {
                const data = await TaskApiRequest.store(req);
                if (await AdminService.checkAdmin(Number(user.telegram_id))) {
                    res.json(await TaskService.store({ ...data, user_id: user._id }))
                } else {
                    res.json(await TaskService.store({ ...data, user_id: user._id }))
                }

            } else {
                throw new TaskError('Invalid user')
            }

        } catch (error: any) {
            ErrorResponse.setError(error).setResponse(res).build().json()
        }
    }
    async delete(req: Request, res: Response) {
        try {
            //@ts-ignore
            const user: IUser = req.user;
            if (user._id) {
                const data = await TaskApiRequest.delete(req);
                if (await AdminService.checkAdmin(Number(user.telegram_id))) {
                    res.json(await TaskService.delete(data))
                } else {
                    res.json(await TaskService.delete({ user_id: user._id, ...data }))
                }

            } else {
                throw new TaskError('Invalid user')
            }
        } catch (error: any) {
            ErrorResponse.setError(error).setResponse(res).build().json()
        }
    }

}

export default new TasksController();