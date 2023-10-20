module.exports = app => {
  const templates = require("../controllers/templates.controller.js");
  const mongodbTemplates = require('../controllers/templates.mongodb.js');
  const router = require("express").Router();
  app.use('/api', router);

  // Create a new Tutorial
  router.post("/mysql", templates.create);
  router.post("/mysql/truncate", templates.truncate);
  router.post("/mysql/sync", templates.sync);
  router.post("/mongodb", mongodbTemplates.create);
  router.post("/mongodb/truncate", mongodbTemplates.truncate);

};
