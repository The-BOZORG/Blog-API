import mongoose from 'mongoose';

const TokenSchema = new mongoose.Schema(
  {
    refreshToken: {
      type: String,
      required: true,
      index: true,
    },
    ip: {
      type: String,
      required: true,
    },
    userAgent: {
      type: String,
      required: true,
    },
    deviceId: {
      type: String,
      required: true,
    },
    user: {
      type: mongoose.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    expiresAt: {
      type: Date,
      default: () => Date.now() + 7 * 24 * 60 * 60 * 1000,
      index: { expires: '7d' },
    },
  },
  { timestamps: true },
);

export default mongoose.model('Token', TokenSchema);
