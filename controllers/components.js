import Component from "../models/Component.js"

const createComponent = async(componentInfo) => {
    const newComponent = new Component(componentInfo)

    try {
        await newComponent.save()

        return newComponent
    } catch (err) {
        throw new Error(err)
    }
}

const deleteComponent = async(componentId) => {
    try {
        const delComponent = await Component.findByIdAndDelete(componentId)
        
        return delComponent
    } catch (err) {
        throw new Error(err)
    }
}