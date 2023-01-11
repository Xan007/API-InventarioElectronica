const isInArray = (arr, item) => {
  return arr.some((arrItem) => arrItem === item);
};

export const updateComponent = async (componentsArray, componentId, amount) => {
  const index = componentsArray.findIndex(
    (arr) => arr.componentId === componentId
  );

  if (index === -1) throw new Error("Couldn't find componentId");

  let componentToUpdate = componentsArray[index];
  componentToUpdate.amount = amount;

  componentsArray[index] = componentToUpdate;

  return componentsArray;
};

export const deleteComponent = async (componentsArray, componentId) => {
  if (!isInArray(componentsArray, componentId))
    throw new Error("Component doesn't exist");

  componentsArray = componentsArray.filter(
    (arr) => arr.componentId !== componentId
  );

  return componentsArray;
};

export const addComponent = async (componentsArray, componentId, amount) => {
  if (isInArray(componentsArray, componentId))
    throw new Error("Component already existing");

  componentsArray.push({
    componentId: componentId,
    amount: amount,
  });

  return componentsArray;
};
