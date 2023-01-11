import mongoose, { Schema, model } from "mongoose";
import bcrypt from "bcryptjs";

import {
  updateComponent,
  addComponent,
  deleteComponent,
} from "../helpers/componentHelper.js";

export const roleEnum = ["user", "admin"];

const UserSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  components: [
    {
      componentId: {
        type: mongoose.Types.ObjectId,
        ref: "Component",
      },
      amount: {
        type: Number,
        required: true,
      },
    },
  ],
  roles: {
    type: [
      {
        type: String,
        enum: roleEnum,
      },
    ],
    default: [roleEnum[0]],
  },
});

UserSchema.method("safeReturn", function() {
  const objectUser = this.toObject();
  delete objectUser.password;
  delete objectUser.__v;

  return objectUser
})

UserSchema.method("encryptPassword", async function () {
  this.password = await bcrypt.hash(this.password, 10);
});

UserSchema.method("validatePassword", async function (plainPassword) {
  return bcrypt.compare(plainPassword, this.password);
});

UserSchema.method("updateComponent", async function (componentId, amount) {
  this.components = updateComponent(this.components, componentId, amount);
});

UserSchema.method("addComponent", async function (componentId, amount) {
  this.components = addComponent(this.components, componentId, amount);
});

UserSchema.method("deleteComponent", async function (componentId) {
  this.components = deleteComponent(this.components, componentId);
});

const User = model("User", UserSchema);

export default User;
