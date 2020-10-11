const actionModel = require("../data/helpers/actionModel")

function validateActionId() {
    return async (req, res, next) => {
      try {
        const actions = await actionModel.get(req.params.id);
  
        if (actions) {
          req.actions = actions;
          next();
        } else {
          res.status(404).json({
            message: "Invalid Action id",
          });
        }
      } catch (error) {
        console.log(error);
        res.status(500).json({
          message: "Error retrieving the Action",
        });
      }
    };
  }
  
  function validateAction() {
    return (req, res, next) => {
      if (Object.keys(req.body).length === 0) {
        res.status(400).json({
          message: "missing Action Data",
        });
      } else if (!req.body.description || !req.body.notes || !req.body.completed) {
        res.status(400).json({
          message: "missing required description, notes or completed field",
        });
      } else if (req.body.description > 127) {
        res.status(400).json({
            message: "Description must be less than 128 characters",
          });
      } else {
        next();
      }
    };
  }
  

  module.exports = {
    validateAction,
    validateActionId,
}