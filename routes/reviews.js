const express = require('express');
const router = express.Router({ mergeParams: true });

const { validateReview, isLoggedIn, isReviewAuthor } = require('../middleware');
const reviews = require('../controllers/reviews');
const Campground = require('../models/campground');
const Review = require('../models/review');

const catchAsync = require('../utilities/catchAsync');



//Reviews Route
router.post('/', isLoggedIn, validateReview, catchAsync(reviews.createReviews));

router.delete('/:reviewId', isLoggedIn, isReviewAuthor, catchAsync(reviews.deleteReviews));


module.exports = router;