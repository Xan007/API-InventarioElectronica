import mongoose, { Schema, model } from "mongoose"
import bcrypt from "bcryptjs"

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
            type: mongoose.Types.ObjectId,
            ref: "Component"
        }
    ]
})

UserSchema.method("encryptPassword", async function () {
    this.password = await bcrypt.hash(this.password, 10)
})

UserSchema.method("validatePassword", async function (plainPassword) {
    return bcrypt.compare(plainPassword, this.password)
})

const User = model("User", UserSchema)

export default User