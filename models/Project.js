import mongoose, { Schema, Model } from "mongoose"

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

const Project = Model("Project", ProjectSchema)

export default Project