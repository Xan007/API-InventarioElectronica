import { Schema, Model } from "mongoose"

export const RoleList = ["admin", "user"]

const RoleSchema =  new Schema({
    name: {
        type: String,
        required: true
    }
}, {
    versionKey: false
})

const Role = Model("Role", RoleSchema)

export default Role