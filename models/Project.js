import mongoose, { Schema, model } from "mongoose";
import {
  updateComponent,
  addComponent,
  deleteComponent,
} from "../helpers/componentHelper.js";

const ProjectSchema = new Schema({
  title: {
    type: String,
    required: true,
    unique: true,
  },
  about: {
    type: String,
  },
  components: [
    {
      componentId: {
        type: mongoose.Types.ObjectId,
        ref: "Component",
        required: true,
      },
      amount: {
        type: Number,
        required: true,
      },
    },
  ],
  participants: [
    {
      type: mongoose.Types.ObjectId,
      ref: "User",
    },
  ],
  admins: [
    {
      type: mongoose.Types.ObjectId,
      ref: "User",
    },
  ],
});

const isInArray = (arr, item) => {
  return arr.some((arrItem) => arrItem === item);
};

ProjectSchema.method("isAdmin", function (userId) {
  return isInArray(this.admins, userId);
});

//Añade admin
ProjectSchema.method("addAdmin", function (userId) {
  if (isInArray(this.admins, userId)) new Error("Admin already existing");

  this.admins.push(userId);
  this.addUser(userId);
});

//Quita admin
ProjectSchema.method("removeAdmin", function (userId) {
  this.admins = this.admins.filter((adminId) => adminId !== userId);
});

//Añade usuario
ProjectSchema.method("addUser", function (userId) {
  if (isInArray(this.participants, userId)) return new Error("User already existing");

  this.participants.push(userId);
});

//Elimina usuario
ProjectSchema.method("removeUser", function (userId) {
  this.admins = this.admins.filter((adminId) => adminId !== userId);
  this.participants = this.participants.filter((id) => id !== userId);
});

//Actualiza componente existente
ProjectSchema.method("updateComponent", function (componentId, amount) {
  this.components = updateComponent(this.components, componentId, amount);
});

//Añade componente
ProjectSchema.method("addComponent", function (componentId, amount) {
  if (isInArray(this.components, componentId))
    return new Error("Component already existing")

  this.components = addComponent(this.components, componentId, amount);
});

//Elimina componente
ProjectSchema.method("deleteComponent", function (componentId) {
  this.components = deleteComponent(this.components, componentId);
});

const Project = model("Project", ProjectSchema);

export default Project;
