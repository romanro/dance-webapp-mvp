import mongoose, { Document, Model, model } from 'mongoose';
import { IVideo } from "./Video"

const practiceItemSchema = new mongoose.Schema(
    {
        // TODO: notes should be added here  
        video: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Video' },
        name: { type: String, required: true },
    },
    { timestamps: true }
);

interface IPracticeItemSchema extends Document {
    name: string;
}

interface IPracticeItemBase extends IPracticeItemSchema {
}

export interface IPracticeItem extends IPracticeItemBase {
    video: IVideo["_id"];
}

export interface IPracticeItemModel extends Model<IPracticeItem> {
}

export default model<IPracticeItem, IPracticeItemModel>('PracticeItem', practiceItemSchema);
