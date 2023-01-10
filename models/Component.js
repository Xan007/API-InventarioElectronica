import { Schema, model } from "mongoose";

const ComponentSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
  },
  {
    versionKey: false,
  }
);

ComponentSchema.static("findByName", async (componentName) => {
  return await Component.findOne({ name: componentName });
});

const Component = model("Component", ComponentSchema);

export default Component;
