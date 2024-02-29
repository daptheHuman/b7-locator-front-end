import { object, string } from 'zod';

export const authSchema = object({
  username: string()
    .min(1, 'Username is required')
    .max(255, 'Username must less than 255 characters'),
  password: string()
    .min(1, 'Password is required')
    .max(255, 'Password must less than 255 characters'),
});
