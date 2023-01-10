import Component from "../models/Component.js";

export const createComponent = async (req, res, next) => {
  const newComponent = new Component(req.body);

  try {
    await newComponent.save();

    return newComponent;
  } catch (err) {
    throw new Error(err);
  }
};

export const deleteComponent = async (req, res, next) => {
  try {
    const delComponent = await Component.findOne(req.body);

    return delComponent;
  } catch (err) {
    throw new Error(err);
  }
};

export const getAllComponents = async () => {
  return await Component.find({});
};
