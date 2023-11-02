const express = require('express');
const { Op } = require('sequelize');
const bcrypt = require('bcryptjs');

const { setTokenCookie, restoreUser,requireAuth } = require('../../utils/auth');
const { User,Spot,Booking,Review, ReviewImage, SpotImage } = require('../../db/models');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const router = express.Router();

async function checkReviewImage(req, res, next){
    const reviewImageId = req.params.imageId;
    const reviewImage = await ReviewImage.findByPk(reviewImageId);

    if(reviewImage){
        req.reviewImage = reviewImage;
        return next()
    }else{
        res.status(404).json({
            message:"Review Image couldn't be found"
        })
    }
};

async function properAuthReviewImage(req,res,next){
    const review = await Review.findByPk(req.reviewImage.reviewId);
    if(req.user.id === review.userId){
        return next();
    }
    res.status(403).json({
        message:'Forbidden'
      })
}




// delete-a-review-image => delete -> /api/review-images/:imageId
router.delete('/:imageId', requireAuth, checkReviewImage, properAuthReviewImage, async (req,res,next) => {
    await req.reviewImage.destroy();
    return res.status(200).json({
        message: "Successfully deleted"
    });
})

module.exports = router;
