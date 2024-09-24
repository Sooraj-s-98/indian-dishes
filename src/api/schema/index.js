const Joi = require("joi");


// Schema for validating dish ingredients.
const dishIngredientsSchema = Joi.object({
    ingredients: Joi.array()
      .items(Joi.string().min(1).required())
      .min(1)
      .required(),
  });

  module.exports = {
    dishIngredientsSchema
  };
  