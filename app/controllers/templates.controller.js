const db = require("../models");
const Template = db.templates;
const Op = db.Sequelize.Op;
const { TemplateModel } = require('../models/template.schema');


exports.create = async (req, res) => {
  // Validate request
  if (!req.body.quantity) {
    res.status(400).send({
      message: "Quantity can not be empty!"
    });
    return;
  }

  // Create a Tutorial
  const template = {
    index: 0,
    guid: '131233',
    isActive: false,
    picture: 'http://google.com',
    width: 1000,
    height: 2000,
    position: 1,
    scale: 1,
    userId: 1,
    bgColor: '123',
    childsCount: 1,
    templateBaseId: 5,
    name: 'Template Name',
    gender: 'figure',
    company: 'bb',
    email: 'user@mail.com',
    title: 'Template title',
    address: 'Ve',
    about: 'This a template',
    registeredBy: new Date(),
    tags: '1 2 3',
    createdAt: new Date(),
    updatedAt: new Date()
  };
  let quantity = req.body.quantity
  const limitByRound = 500;
  let startItem = 0;
  if (Math.sign(req.body.quantity) == -1) {
    console.log('>>: REMOVE CONDITION')
    quantity = quantity * -1;
    const templates = await Template.findAll({
      limit: quantity
    })
    const ids = templates.map(element => element?.dataValues?.id);
    await Template.destroy({
      where: {
        id: {
          [Op.in]: ids
        }
      },
    });
  } else {
    console.log('>>: ADD CONDITION')
    do {
      let round = limitByRound;
      if ((startItem + limitByRound) > quantity) {
        round = startItem - quantity
      }
      const items = Array.apply(null, { length: round }).map(() => template);
      await Template.bulkCreate(items)
        .catch(err => {
          res.status(500).send({
            message:
              err.message || "Some error occurred while creating the Tutorial."
          });
        });
      startItem += round

    } while (startItem < quantity);
  }

  // Save Tutorial in the database
  res.send('Data Added successfully');

};

exports.truncate = async (req, res) => {
  await Template.truncate();
  res.send('Table truncated successfully');
}

exports.sync = async (req, res) => {
  let templates = await Template.findAll();

  templates = templates.map(element => {
    let item = { ...element.dataValues }
    delete item.id
    return item
  });
  const quantity = templates.length;
  const limitByRound = 500;
  let startItem = 0;
  do {
    let round = limitByRound;
    if ((startItem + limitByRound) > quantity) {
      round = startItem - quantity
    }
    const items = templates.slice(startItem, startItem + round);
    await TemplateModel.insertMany(items)
      .then(function () {
        console.log('>>: mongoose data saved >')
      })
      .catch(function (err) {
        console.log('>>: bulk inser error > ', err)
      });
    startItem += round

  } while (startItem < quantity);
  res.send('Database synced successfully');
}