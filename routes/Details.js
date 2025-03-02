const router = require("express").Router(); //express router
let DetailsData = require("../models/Details.model.js");

router.route("/").get((req, res) => {
  // end point of http requests at the end of "/"
  DetailsData.find() //list of all users from mongodb database
    .then(users => res.json(users)) //users in json format
    .catch(err => res.status(400).json("Error: " + err));
});

router.route("/add").post((req, res) => {
  const name = req.body.name;
  const age = Number(req.body.age);
  const course = req.body.course;
  const newDetailsData = new aqiData({ name,age,course});

  //new user saved in database
  newDetailsData
    .save()
    .then(() => res.json("New data added!"))
    .catch(err => res.status(400).json("Error: " + err));
});

router.route('/update/:id').put((req, res) => {

  DetailsData.findById(req.params.id)
 .then(DetailsData => {
  DetailsData.name = req.body.name,
  DetailsData.age = req.body.age,
  DetailsData.course =req.body.course,
  DetailsData.save()
      .then(() => res.json('Data Updated!'))
      .catch(err => res.status(400).json('Error: ' + err));
})
.catch(err => res.status(400).json('Error: ' + err));
});


router.route("/:id").get((req, res) => {
  DetailsData.findById(req.params.id)
    .then(DetailsData => res.json(DetailsData))
    .catch(err => res.status(400).json("Error: " + err));
});
router.route("/:id").delete((req, res) => {
  DetailsData.findByIdAndDelete(req.params.id)
    .then(() => res.json("Data deleted."))
    .catch(err => res.status(400).json("Error: " + err));
});

module.exports = router;