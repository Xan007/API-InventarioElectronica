import Component from "../models/Component.js";

export const createComponent = async (componentBody) => {
  const newComponent = new Component(componentBody);

  try {
    await newComponent.save();

    return newComponent;
  } catch (err) {
    throw new Error(err);
  }
};

export const deleteComponent = async (componentBody) => {
  try {
    const delComponent = await Component.findOneAndDelete(componentBody);

    return delComponent;
  } catch (err) {
    throw new Error(err);
  }
};

export const getAllComponents = async () => {
  return await Component.find({});
};

export const getComponentByName = async (componentName) => {
  return await Component.find({ name: name });
};

export const getComponentById = async (componentId) => {
  return await Component.findById(componentId);
};
