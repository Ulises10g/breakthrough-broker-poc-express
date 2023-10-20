const { TemplateModel } = require('../models/template.schema');

exports.create = async (req, res) => {
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
    quantity = quantity * -1;
    const templates = await TemplateModel
      .find()
      .limit(quantity);
    const ids = templates.map(element => element._id);
    await TemplateModel.deleteMany({ _id: ids });
  } else {
    do {
      let round = limitByRound;
      if ((startItem + limitByRound) > quantity) {
        round = startItem - quantity
      }
      const items = Array.apply(null, { length: round }).map(() => template);
      await TemplateModel.insertMany(items)
        .then(function () {
          console.log('>>: mongoose data saved >')
        })
        .catch(function (err) {
          console.log('>>: bulk inser error > ', err)
        });
      startItem += round

    } while (startItem < quantity);
  }
  res.send('Collections Saved')
}

exports.truncate = async (req, res) => {
  await TemplateModel.deleteMany()
  res.send('Mongodb truncatwed')
}