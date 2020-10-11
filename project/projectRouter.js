const express = require("express");
const projectModel = require("../data/helpers/ProjectModel");
const { validateProjects, validateActionsId, validateProjectId } = require("../middleware/projects");

const router = express.Router();

// request to fetch all actions
router.get("/", async (req, res, next) => {
  try {
    const projects = await projectModel.get();
    res.status(200).json(projects);
  } catch (err) {
    next(err);
  }
});


// request to fetch a specific action by id
router.get("/:id", validateProjectId(), (req, res) => {
  res.status(200).json(req.projects);
});

// request to fetch all the actions for the project
router.get("/:id/actions", validateActionsId(), (req, res) => {
    res.status(200).json(req.projects);
  });

// request to add a new action
router.post("/", validateProjects(),async (req, res, next) => {
 try {

    const projects = await projectModel.insert(req.body);

    res.status(201).json(projects);
  } catch (err) {
    next(err);
  } 
});


// request to change actions
router.put("/:id", validateProjects(), validateProjectId(), async (req, res, next) => {
  try {
    const projects = await projectModel.update(req.params.id, req.body);

    if (projects) {
      res.status(200).json(projects);
    } else {
      res.status(404).json({
        message: "The projects could not be found",
      });
    }
  } catch (error) {
    next(error);
  }
});

// request to change actions 
router.delete("/:id", validateProjectId(), async (req, res, next) => {
  try {
    const projects = await projectModel.remove(req.params.id);

    if (projects > 0) {
      res.status(200).json({
        message: "The projects has been erased from this part of the Earth",
      });
    } else {
      res.status(404).json({
        message: "The projects could not be found",
      });
    }
  } catch (error) {
    next(error);
  }
});


module.exports = router