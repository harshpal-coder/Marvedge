import mongoose, { Schema, Document } from 'mongoose';

export interface ITour extends Document {
  title: string;
  steps: { id: string; image?: string; description: string }[];
  visibility: 'public' | 'private';
  createdAt: Date;
  views: number;
  owner: string;
}

const StepSchema = new Schema({
  id: { type: String, required: true },
  image: String,
  description: { type: String, required: true },
});

const TourSchema = new Schema<ITour>({
  title: { type: String, required: true },
  steps: [StepSchema],
  visibility: { type: String, enum: ['public', 'private'], default: 'private' },
  createdAt: { type: Date, default: Date.now },
  views: { type: Number, default: 0 },
  owner: { type: String, required: true },
});

export default mongoose.model<ITour>('Tour', TourSchema);
