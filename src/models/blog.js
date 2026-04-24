import mongoose from 'mongoose';
import { generateSlug } from '../utils';

const BlogSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'title is required'],
    maxLength: [120, 'title must me less than 120 characters'],
  },
  slug: {
    type: String,
    required: [true, 'slug is required'],
    unique: [true, 'slug must be unique'],
  },
  content: {
    type: String,
    required: [true, 'content is required'],
  },
  url: {
    type: String,
    required: [true, 'URL is required'],
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'author is required'],
  },
  status: {
    type: String,
    enum: {
      values: ['draft', 'published'],
      message: '{VALUE} is not supported',
    },
    default: 'draft',
  },
  timestamps: {
    createdAt: 'publishedAt',
  },
});

BlogSchema.pre('validate', async function () {
  if (this.title && !this.slug) {
    this.slug = generateSlug(this.title);
  }
});

export default mongoose.model('Blog', BlogSchema);
