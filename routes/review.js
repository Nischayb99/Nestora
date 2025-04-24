const express = require('express');
const router = express.Router({ mergeParams: true });
const wrapAsync = require("../utils/wrapAsync.js");
const { isLoggesIn, isReviewAuthor, validateReview } = require("../middleware.js");
const reviewController = require("../controllers/reviews.js");


//Review Post Route
router.post(
    "/", 
    isLoggesIn, 
    validateReview, 
    wrapAsync(reviewController.createReview));

//Review Delete Route
router.delete(
    "/:reviewId", 
    isLoggesIn,
    isReviewAuthor,
    wrapAsync(reviewController.destroyReview));

module.exports = router;