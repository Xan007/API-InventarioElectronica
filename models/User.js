import mongoose, { Schema, Model } from "mongoose"

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

const User = Model("User", UserSchema)

export default User