const express = require('express');
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const { isLoggesIn, isOwner, validateListing } = require("../middleware.js");
const listingController = require("../controllers/listings.js");
const multer = require('multer');
const { storage } = require("../cloudConfig.js");
const upload = multer({ storage });


router
    .route("/")
    .get(wrapAsync(listingController.index))//Index Route
    .post(
        isLoggesIn,
        upload.single('listing[image]'),
        validateListing,
        wrapAsync(listingController.createListing)//Create Route
    );

router.get(
    "/new",
    isLoggesIn,
    listingController.renderNewForm);//New Route

router
    .route("/:id")
    .get(wrapAsync(listingController.showListing))//Show Route
    .post(
        isLoggesIn,
        isOwner,
        upload.single('listing[image]'),
        validateListing,
        wrapAsync(listingController.updateListing))//Update Route
    .delete(
        isLoggesIn,
        isOwner,
        wrapAsync(listingController.destroyListing))//Delete Route

router.get(
    "/:id/edit",
    isLoggesIn,
    isOwner,
    wrapAsync(listingController.renderEditForm));//Edit Route

module.exports = router;
