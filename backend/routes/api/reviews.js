const express = require('express');
const { Op } = require('sequelize');
const bcrypt = require('bcryptjs');

const { setTokenCookie, restoreUser,requireAuth } = require('../../utils/auth');
const { User,Spot,Booking,Review, ReviewImage, SpotImage } = require('../../db/models');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const router = express.Router();

async function checkReview(req, res, next){
    const reviewId = req.params.reviewId;
    const review = await Review.findByPk(reviewId);

    if(review){
        req.review = review;
        return next()
    }else{
        res.status(404).json({
            message:"Review couldn't be found"
        })
    }
};

async function properAuthReview(req,res,next){

    if(req.user.id === req.review.userId){
        return next();
    }
    res.status(403).json({
        message:'Forbidden'
      })
}
//create-an-image-for-a-review => post -> /api/reviews/:reviewId/images
router.post('/:reviewId/images', requireAuth, checkReview,properAuthReview,  async(req,res,next)=>{

    const reviewId = req.params.reviewId;

    const imageCount = await ReviewImage.count({
        where:{reviewId}
    })

    if(imageCount >= 10){
        return res.status(403).json({
            message:"Maximum number of images for this resource was reached"
        })
    }

    const imageUrl = req.body.url;
        const newImage = await ReviewImage.create({
            url:imageUrl,
            reviewId:reviewId
        });

        res.json({
            id:newImage.id,
            url:newImage.url
        })
})




module.exports = router;
