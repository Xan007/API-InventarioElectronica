import { Router } from "express";
import projects from "./projects.js";
import site from "./site.js";
import users from "./users.js";

const router = Router();

const routeList = [projects, site, users];

routeList.forEach((route) => {
  router.use(route.endpoint, route.router);
});

export default router;
