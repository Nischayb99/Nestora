const Listing = require("./models/listing.js");
const Review = require("./models/review.js");
const ExpressError = require("./utils/ExpressError.js");
const { listingSchema, reviewSchema } = require("./schema.js");

module.exports.isLoggesIn = (req, res, next) => {
    if (!req.isAuthenticated()) {
        req.session.redirectUrl = req.originalUrl;
        req.flash("error", "You must be signed in to create a listing!");
        return res.redirect("/login");
    }
    next();
};

module.exports.saveRedirectUrl = (req, res, next) => {
    if (req.session.redirectUrl) {
        res.locals.redirectUrl = req.session.redirectUrl;
    }
    next();
};

module.exports.isOwner = async (req, res, next) => {
    let { id } = req.params;
    let existingListing = await Listing.findById(id);
    if (!existingListing.owner.equals(res.locals.currUser._id)) {
        req.flash("error", "you are not the owner of this listing!");
        return res.redirect(`/listings/${id}`);
    }
    next();
};

//listing validation
module.exports.validateListing = (req, res, next) => {
    let { error } = listingSchema.validateAsync(req.body);
    if (error) {
        let errMsg = error.details.map((el) => el.message).join(",");
        throw new ExpressError(400, errMsg);
    } else {
        next();
    }
};

//Review Validation
module.exports.validateReview = (req, res, next) => {
    let { error } = reviewSchema.validateAsync(req.body);
    if (error) {
        let errMsg = error.details.map((el) => el.message).join(",");
        throw new ExpressError(400, errMsg);
    } else {
        next();
    }
};

module.exports.isReviewAuthor = async (req, res, next) => {
    let { id, reviewId } = req.params;
    let existingReview= await Review.findById(reviewId);
    if (!existingReview.author.equals(res.locals.currUser._id)) {
        req.flash("error", "you are not the author of this review!");
        return res.redirect(`/listings/${id}`);
    }
    next();
};

// module.exports.validateListing = async (req, res, next) => {
//     try {
//         if (req.body._method) {
//             delete req.body._method; // 🚫 Remove _method before validation
//         }

//         await listingSchema.validateAsync(req.body); // ✅ Await the promise

//         next(); // ✅ If validation passes, go ahead
//     } catch (error) {
//         let errMsg = error.details.map((el) => el.message).join(",");
//         throw new ExpressError(400, errMsg);
//     }
// };