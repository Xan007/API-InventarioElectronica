import mongoose, { Schema, model } from "mongoose"
import { updateComponent, addComponent, deleteComponent } from "../helpers/componentHelper.js"

const ProjectSchema =  new Schema({
    title: {
        type: String,
        required: true
    },
    about: {
        type: String
    },
    components: [
        {
            componentId: {
                type: mongoose.Types.ObjectId,
                ref: "Component",
                required: true,
                unique: true
            },
            amount: {
                type: Number,
                required: true
            }
        }
    ],
    participants: [
        {
            type: mongoose.Types.ObjectId,
            ref: "User",
            unique: true
        }
    ],
    admins: [
        {
            type: mongoose.Types.ObjectId,
            ref: "User",
            unique: true
        }
    ]
})

ProjectSchema.method("addUser", async(userId, isAdmin) => {
    if (isAdmin === true)
        this.admins.push(userId)
    this.participants.push(userId)

    try {
        await this.save()
    } catch (err) {
        throw new Error(err)
    }  
})

ProjectSchema.method("removeUser", async(userId) => {
    this.admins = this.admins.filter((adminId) => adminId !== userId)
    this.participants = this.participants.filter((id) => id !== userId)

    try {
        await this.save()
    } catch (err) {
        throw new Error(err)
    }
})

ProjectSchema.method("updateComponent", async(componentId, amount) => {
    this.components = updateComponent(this.components, componentId, amount)

    try {
        await this.save()
        return componentToUpdate
    } catch (err) {
        throw new Error(err)
    }
})

ProjectSchema.method("addComponent", async(componentId, amount) => {
    this.components = addComponent(this.components, componentId, amount)

    try {
        await this.save()
    } catch (err) {
        throw new Error(err)
    }
})

ProjectSchema.method("deleteComponent", async(componentId) => {
    this.components = deleteComponent(this.components, componentId)

    try {
        await this.save()
    } catch (err) {
        throw new Error(err)
    }
})

const Project = model("Project", ProjectSchema)

export default Project