const express = require("express");
const Offer = require("../models/Offer");
const cloudinary = require("cloudinary");

const isAuthenticated = require("../middlewares/isAuthentificated");

const router = express.Router();

router.post("/offer/publish", isAuthenticated, async (req, res) => {
  try {
    const newOffer = new Offer({
      product_name: req.fields.title,
      product_description: req.fields.description,
      product_price: req.fields.price,
      product_details: [
        { MARQUE: req.fields.brand },
        { TAILLE: req.fields.size },
        { ETAT: req.fields.condition },
        { COULEUR: req.fields.color },
        { EMPLACEMENT: req.fields.city },
      ],
      owner: req.user,
    });

    //J'envoie mon image sur cloudinary
    const result = await cloudinary.uploader.upload(req.files.picture.path);
    //J'enregistre ce que me renvoie cloudinary dans la clé product_image
    newOffer.product_image = result;

    await newOffer.save();
    res.json(newOffer);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

/*
const offerByFiltering = (req, res, next) => {
    if ()
    return 
}
*/
router.get("/offers", async (req, res) => {
  console.log(req.query);
  let skipOpts = 0;
  let limitOpts = 10;
  const sortOpts = {};
  const findOpts = {};

  if (!req.query.page) {
    skipOpts = 0;
    limitOpts = 50;
  } else {
    skipOpts = Number(req.query.page);
    limitOpts = limitOpts * 2;
  }

  if (!req.query.sort || req.query.sort === "price-asc") {
    sortOpts["price"] = 1;
  } else if (req.query.sort === "price-desc") {
    sortOpts["price"] = 1;
  } else {
    sortOpts["price"] === 1;
  }

  const result = await Offer.find({
    product_name: new RegExp(req.query.title, "i"),
  })
    .sort(sortOpts)
    .limit(limitOpts)
    .skip(skipOpts);
  console.log("Ok", skipOpts, limitOpts, sortOpts);
});
//Offer.save()

module.exports = router;
