const express = require("express");
const actionModel = require("../data/helpers/actionModel");
const { validateAction, validateActionId } = require("../middleware/actions");

const router = express.Router();

// request to fetch all actions
router.get("/", async (req, res, next) => {
  try {
    const user = await actionModel.get();
    res.status(200).json(user);
  } catch (err) {
    next(err);
  }
});

// request to fetch a specific action by id
router.get("/:id", validateActionId(), (req, res) => {
  res.status(200).json(req.actions);
});

// request to add a new action
router.post("/", validateAction(), async (req, res, next) => {
 try {

    const actions = await actionModel.insert({ description: req.body.description, notes: req.body.notes, project_id: req.body.project_id });

    res.status(201).json(actions);
  } catch (err) {
    next(err);
  } 
});


// request to change actions
router.put("/:id", validateAction(), validateActionId(), async (req, res, next) => {
  try {
    const actions = await actionModel.update(req.params.id, req.body);

    if (actions) {
      res.status(200).json(actions);
    } else {
      res.status(404).json({
        message: "The actions could not be found",
      });
    }
  } catch (error) {
    next(error);
  }
});

// request to change actions 
router.delete("/:id", validateActionId(), async (req, res, next) => {
  try {
    const action = await actionModel.remove(req.params.id);

    if (action > 0) {
      res.status(200).json({
        message: "The action has been erased from this part of the Earth",
      });
    } else {
      res.status(404).json({
        message: "The action could not be found",
      });
    }
  } catch (error) {
    next(error);
  }
});


module.exports = router