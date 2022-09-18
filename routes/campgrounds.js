const express = require('express');
const router = express.Router();
const campgrounds = require('../controllers/campgrounds');
const catchAsync = require('../utilities/catchAsync');
const Campground = require('../models/campground');
const Review = require('../models/review');

const multer = require('multer');
const { storage } = require('../cloudinary');
const upload = multer({ storage });

const { isLoggedIn, campValidation, isAuthor } = require('../middleware');


router.route('/')
    .get(catchAsync(campgrounds.index))
    .post(isLoggedIn, upload.array('image'), campValidation, catchAsync(campgrounds.createNewCamp));



router.get('/new', isLoggedIn, campgrounds.newCamp);

router.route('/:id')
    .get(catchAsync(campgrounds.showCamp))
    .put(isLoggedIn, isAuthor, upload.array('image'), campValidation, catchAsync(campgrounds.updateCamp))
    .delete(isLoggedIn, isAuthor, catchAsync(campgrounds.deleteCamp));

router.get('/:id/edit', isLoggedIn, isAuthor, catchAsync(campgrounds.editCamp));


module.exports = router;