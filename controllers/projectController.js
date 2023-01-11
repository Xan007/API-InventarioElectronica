import Project from "../models/Project.js";
import { userHasRole } from "../middleware/auth.js";

export const findProjectById = async (projectId) => {
  try {
    const project = await Project.findById(projectId);

    if (!project)
      throw new Error(`No project with ID: ${projectId}`)

    return project
  } catch (err) {
    throw new Error(err);
  }
};

export const getAllProjects = async () => {
  return await Project.find();
};

export const getUserProjects = async (userId) => {
  return await Project.find({ participants: { $in: [userId] } });
};

export const getUserProjectsWithAdmin = async (userId) => {
  return await Project.find({ admins: { $in: [userId] } });
};

export const getProjectComponents = async (projectId) => {
  return await Project.findById(projectId).select("components");
};

export const userHasPermissions = async (user, projectId) => {
  const project = await findProjectById(projectId);
  if (!project)
    throw new Error("No project with given ID")

  if (!(project.isAdmin(user._id) || userHasRole(user, "admin")))
    throw new Error("Unathorized");

  return true;
};