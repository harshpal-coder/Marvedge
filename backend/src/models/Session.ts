import mongoose, { Schema, Document } from 'mongoose';

export interface ISession extends Document {
  userId: string;
  sessionToken: string;
  createdAt: Date;
  expiresAt: Date;
}

const SessionSchema = new Schema<ISession>({
  userId: { type: String, ref: 'User', required: true },
  sessionToken: { type: String, required: true, unique: true },
  createdAt: { type: Date, default: Date.now },
  expiresAt: { type: Date, required: true },
});

export default mongoose.model<ISession>('Session', SessionSchema);
