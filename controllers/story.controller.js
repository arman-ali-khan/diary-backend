const Story = require("../models/story.model");


exports.findAll = (req, res) => {
  Story.getAll((err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving users."
      });
    else res.send(data);
  });
};

exports.create = (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }
  
  const story = {
    title: req.body.title,
    description: JSON.stringify(req.body.description),
    storyId:req.body.storyId,
    thumbnail:req.body.thumbnail,
    read:req.body.rating,
    rating:req.body.rating,
    subscribers:req.body.subscribers,
    likes:req.body.likes,
    tags:req.body.tags,
    categories:req.body.categories,
    author:req.body.author,
    reports:req.body.reports,
    blocked:req.body.blocked,
    published:req.body.published,
  };

  Story.createOrUpdate(story, (err, data) => {
    console.log(data,'data');
    if (err)
      res.status(500).send({
        message: err.message || "Some error occurred while creating the User."
      });
    else res.send(data);
  });
};

exports.createPart = (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  const story = {
    title: req.body.title,
    summary: JSON.stringify(req.body.summary),
    storyId: req.body.storyId
  };

  Story.createPart(story, (err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || "Some error occurred while creating the User."
      });
    else res.send(data);
  });
};

exports.findOne = (req, res) => {
  Story.findById(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found User with id ${req.params.id}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving User with id " + req.params.id
        });
      }
    } else {
      Story.findPartsById(req.params.id, (err,partsData)=>{
        if (err) {
          if (err.kind === "not_found") {
            res.send(data)
          } else {
            res.status(500).send({
              message: "Error retrieving User with id " + req.params.id
            });
          }
        }else{
          const storyDataWithParts = {...data,parts:partsData||''}
          res.send(storyDataWithParts)
        return  
      }
    })
    
    };
  });
};
