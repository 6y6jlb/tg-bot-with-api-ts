import mongoose, { Schema } from "mongoose";
import { IUserSettings } from './types';
import { APP_TYPE_ENUM } from "./const";

const UserSettings = new mongoose.Schema<IUserSettings>({
    user_id: { type: Schema.Types.ObjectId, ref: 'User' },
    app_type: { type: Number, required: true, default: APP_TYPE_ENUM.DEFAULT },
    payload: { type: Object, required: false },
    created_at: { type: Date, required: true },
})

export default mongoose.model('UserSettings', UserSettings);
