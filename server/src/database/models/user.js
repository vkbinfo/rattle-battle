import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { Schema, model } from 'mongoose';
import { JWT_SECRET } from '../../app/appConstants';

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  username: {
    type: String,
    required: true,
    trim: true,
    unique: true,
    minlength: 3,
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
  },
});

/**
 * Overides the model's default JSON stringify method
 * @returns Object with user ID and username
 */
userSchema.methods.toJSON = function toJSON() {
  const user = this;
  const { id, username } = user;
  return {
    id,
    username,
  };
};

/**
 * Generates new JWT and returns it
 * @returns JWT
 */
userSchema.methods.generateAuthToken = function generateAuthToken() {
  const user = this;
  const access = 'auth';
  const { id, username } = user;
  const token = jwt.sign(
    {
      id,
      username,
      access,
    },
    JWT_SECRET,
  );
  return token;
};

/**
 * Hashes the password on the user model
 * @returns User model
 */
userSchema.methods.hashPassword = async function hashPassword() {
  const user = this;
  const hashedPassword = await bcrypt.hash(user.password, 14);
  user.password = hashedPassword;
  return user;
};

const User = model('User', userSchema);

export default User;
