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

const validateReview = [
    check('review')
    .notEmpty()
    .withMessage('Review text is required'),
    check('stars')
    .isInt({min:1,max:5})
    .withMessage('Stars must be an integer from 1 to 5'),
    handleValidationErrors
]

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
                    city:ele.Spot.city,                        state:ele.Spot.state,
                    country:ele.Spot.country,
                    lat:ele.Spot.lat,
                    lng:ele.Spot.lng,
                    name:ele.Spot.name,
                    description:ele.Spot.description,                        price:ele.Spot.price,
                    previewImage:previewImageUrl
                    },
                    ReviewImages: ele.ReviewImages

            }
        })
    }
    return res.json(body);
})

//edit-a-review => put -> /api/reviews/:reviewId
router.put('/:reviewId', requireAuth,validateReview, checkReview, properAuthReview, async(req, res, next)=>{
    const reviewId = parseInt(req.params.reviewId,10)
    const {review, stars} = req.body;
    const editReview = await Review.findByPk(reviewId);

    editReview.review = review;
    editReview.stars = stars;

    await editReview.save();

    return res.status(200).json({
        id:editReview.id,
        userId:editReview.userId,
        spotId:editReview.spotId,
        review:editReview.review,
        stars:editReview.stars,
        createdAt:editReview.createdAt,
        updatedAt:editReview.updatedAt
    })
})

//delete-a-review => delete -> /api/reviews/:reviewId
router.delete('/:reviewId', requireAuth, checkReview, properAuthReview, async (req, res, next) => {
    await ReviewImage.destroy({
        where: { reviewId: req.params.reviewId },
    });
    await req.review.destroy();
    return res.status(200).json({
        message: "Successfully deleted"
    });
})
module.exports = router;
