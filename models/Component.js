import { Schema, Model } from "mongoose"

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

const Component = Model("Component", ComponentSchema)

export default Component