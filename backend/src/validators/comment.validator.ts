import Joi from 'joi';

export const createCommentSchema = Joi.object({
  username: Joi.string().required().max(50).trim().messages({
    'string.empty': 'Username is required',
    'string.max': 'Username cannot exceed 50 characters',
  }),
  comment: Joi.string().required().max(1000).trim().messages({
    'string.empty': 'Comment is required',
    'string.max': 'Comment cannot exceed 1000 characters',
  }),
  videoID: Joi.string().required().trim().messages({
    'string.empty': 'Video ID is required',
  }),
});
