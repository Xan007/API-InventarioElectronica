import { Schema, model } from "mongoose"

const ComponentSchema =  new Schema({
    name: {
        type: String,
        required: true
    },
    quantity: {
        type: Number,
        required: true
    }
})

const Component = model("Component", ComponentSchema)

export default Component