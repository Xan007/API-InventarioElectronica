import mongoose, { Schema, model } from "mongoose"

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
            type: mongoose.Types.ObjectId,
            ref: "Component"
        }
    ],
    participants: [
        {
            type: mongoose.Types.ObjectId,
            ref: "User"
        }
    ],
    admins: [
        {
            type: mongoose.Types.ObjectId,
            ref: "User"  
        }
    ]
})

const Project = model("Project", ProjectSchema)

export default Project