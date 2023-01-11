import { userHasRole } from "../middleware/auth.js";
import User from "../models/User.js";

export const getAllUsers = async (safeReturn) => {
  const allUsers = await User.find()
  if (safeReturn)
    return allUsers.map((user) => user.safeReturn())

  return allUsers
};

export const getUserById = async (userId, safeReturn) => {
  const user = await User.findById(userId);

  if (!user)
    throw new Error("No user with given ID")

  if (safeReturn)
    return user.safeReturn()
  
  return user
};

export const getUserComponents = async (userId) => {
  return await User.findById(userId).select("components");
};

export const deleteUserById = async (userId) => {
  return await User.findByIdAndDelete(userId);
};

export const userHasPermissionsOn = (user, otherUserId) => {
  if (!(user._id == otherUserId || userHasRole(user, "admin")))
    throw new Error("Unathorized")
  
  return true
}