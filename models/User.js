import mongoose, { Schema, model } from "mongoose"
import bcrypt from "bcryptjs"

import { updateComponent, addComponent, deleteComponent } from "../helpers/componentHelper.js"

const UserSchema =  new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    components: [
        {
            componentId: {
                type: mongoose.Types.ObjectId,
                ref: "Component"
            },
            amount: {
                type: Number,
                required: true
            }
        }
    ]
})

UserSchema.method("encryptPassword", async function () {
    this.password = await bcrypt.hash(this.password, 10)
})

UserSchema.method("validatePassword", async function (plainPassword) {
    return bcrypt.compare(plainPassword, this.password)
})

UserSchema.method("updateComponent", async(componentId, amount) => {
    this.components = updateComponent(this.components, componentId, amount)

    try {
        await this.save()
    } catch (err) {
        throw new Error(err)
    }
})

UserSchema.method("addComponent", async(componentId, amount) => {
    this.components = addComponent(this.components, componentId, amount)

    try {
        await this.save()
    } catch (err) {
        throw new Error(err)
    }
})

UserSchema.method("deleteComponent", async(componentId) => {
    this.components = deleteComponent(this.components, componentId)

    try {
        await this.save()
    } catch (err) {
        throw new Error(err)
    }
})

const User = model("User", UserSchema)

export default User