import mongoose from 'mongoose';
import validator from 'validator';
import bcrypt from 'bcrypt';

const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      maxLength: [20, 'username must be less than 20 character'],
      unique: true,
    },
    email: {
      type: String,
      required: [true, 'email is required'],
      maxLength: [40, 'email must be less than 40 character'],
      unique: [true, 'email must be unique'],
      validate: {
        validator: validator.isEmail,
        message: 'please provide valid email',
      },
    },
    password: {
      type: String,
      select: false,
      required: [true, 'password is required'],
      minLength: [6, 'password must more than 6 character'],
    },
    role: {
      type: String,
      select: false,
      required: [true, 'role is required'],
      enum: {
        values: ['admin', 'user'],
        message: '{VALUE} is not supported',
      },
      default: 'user',
    },
    firstName: {
      type: String,
      maxLength: [20, 'fistName must be less than 20 character'],
    },
    lastName: {
      type: String,
      maxLength: [20, 'LastName must be less than 20 character'],
    },
  },
  { timestamps: true },
);

UserSchema.pre('save', async function () {
  if (!this.isModified('password')) {
    return;
  }
  this.password = await bcrypt.hash(this.password, 10);
});

UserSchema.methods.comparePassword = async function (candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

export default mongoose.model('User', UserSchema);
