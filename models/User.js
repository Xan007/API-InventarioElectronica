import mongoose, { Schema, model } from "mongoose"

const UserSchema =  new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
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

const User = model("User", UserSchema)

export default User