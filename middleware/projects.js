const projectModel = require("../data/helpers/projectModel")

function validateProjectId() {
    return async (req, res, next) => {
      try {
        const projects = await projectModel.get(req.params.id);
  
        if (projects) {
          req.projects = projects;
          next();
        } else {
          res.status(404).json({
            message: "Invalid project id",
          });
        }
      } catch (error) {
        console.log(error);
        res.status(500).json({
          message: "Error retrieving the project",
        });
      }
    };
  }

  function validateActionsId() {
    return async (req, res, next) => {
      try {
        const projects = await projectModel.getProjectActions(req.params.id);
  
        if (projects) {
          req.projects = projects;
          next();
        } else {
          res.status(404).json({
            message: "Invalid project actions id",
          });
        }
      } catch (error) {
        console.log(error);
        res.status(500).json({
          message: "Error retrieving the actions for the project",
        });
      }
    };
  }
  
  function validateProjects() {
    return (req, res, next) => {
      if (Object.keys(req.body).length === 0) {
        res.status(400).json({
          message: "missing Project Data",
        });
      } else if (!req.body.name || !req.body.description) {
        res.status(400).json({
          message: "missing required name, and description field",
        });
      } else {
        next();
      }
    };
  }
  

  module.exports = {
    validateProjects,
    validateActionsId,
    validateProjectId,
}