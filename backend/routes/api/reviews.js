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

//get-reviews-of-current-user => get->/api/reviews/current
router.get('/current', requireAuth, async(req,res,next) => {
    const userId = req.user.id;
    const reviews = await Review.findAll({
        where:{
            userId:userId
        },
        include:[
            {
                model:User,
                attributes:['id','firstName', 'lastName']
            },
            {
                model:Spot,
                attributes:['id', 'ownerId', 'address', 'city', 'state', 'country', 'lat', 'lng', 'name', 'description','price'],
                include:
                    {
                        model:SpotImage,
                        attributes:['url'],
                        where:{preview:true},
                        require:false
                    },

            },
            {
                model:ReviewImage,
                attributes:['id','url']
            }
        ]
    })

    const body = {
        Reviews:reviews.map(ele => {

            const { url: previewImageUrl } = (ele.Spot.SpotImages[0] || {});
            return{
                id:ele.id,
                userId:ele.userId,
                spotId:ele.Spot.id,
                review: ele.review,
                    stars: ele.stars,
                    createdAt: ele.createdAt,
                    updatedAt: ele.updatedAt,
                    User:{
                        id: ele.User.id,
                        firstName: ele.User.firstName,
                        lastName: ele.User.lastName
                    },
                    Spot:{
                        id:ele.Spot.id,
                        ownerId: ele.Spot.ownerId,
                        address:ele.Spot.address,
                        city:ele.Spot.city,
                        state:ele.Spot.state,
                        country:ele.Spot.country,
                        lat:ele.Spot.lat,
                        lng:ele.Spot.lng,
                        name:ele.Spot.name,
                        description:ele.Spot.description,
                        price:ele.Spot.price,
                        previewImage:previewImageUrl
                    },
                    ReviewImages: ele.ReviewImages

            }
        })
    }
    return res.json(body);
})


module.exports = router;
