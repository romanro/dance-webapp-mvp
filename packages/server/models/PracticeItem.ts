import mongoose, { Schema, Document, Model, model, Types } from 'mongoose';
import Video, { IVideo } from "./Video"

const practiceItemSchema = new mongoose.Schema(
    {
        associatedVideo: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Video' }, 
    },
    { timestamps: true }
);

interface IPracticeItemSchema extends Document {
}

interface IPracticeItemBase extends IPracticeItemSchema {
    // Virtuals and instance methods - should be here
}

export interface IPracticeItem extends IPracticeItemBase {
    associatedVideo: IVideo["_id"];
}

export interface IPracticeItemModel extends Model<IPracticeItem> {
}

export default model<IPracticeItem, IPracticeItemModel>('PracticeItem', practiceItemSchema);
