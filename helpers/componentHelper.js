export const updateComponent = async(componentsArray, componentId, amount) => {
    const index = componentsArray.findIndex((arr) => arr.componentId === componentId)

    if (index === -1)
        throw new Error("Couldn't find componentId")

    let componentToUpdate = componentsArray[index]
    componentToUpdate.amount = amount

    componentsArray[index] = componentToUpdate

    return componentsArray
}

export const deleteComponent = async(componentsArray, componentId) => {
    componentsArray = componentsArray.filter((arr) => arr.componentId !== componentId)

    return componentsArray
}

export const addComponent = async(componentsArray, componentId, amount) => {
    componentsArray.push({
        componentId: componentId,
        amount: amount
    })

    return componentsArray
}