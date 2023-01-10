import { Schema, model } from "mongoose"

export const RoleList = ["admin", "user"]

const RoleSchema =  new Schema({
    name: {
        type: String,
        required: true,
        enum: RoleList
    }
}, {
    versionKey: false
})

const Role = model("Role", RoleSchema)

export default Role