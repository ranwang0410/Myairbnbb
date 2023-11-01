const express = require('express');
const { Op } = require('sequelize');
const bcrypt = require('bcryptjs');

const { setTokenCookie, restoreUser,requireAuth } = require('../../utils/auth');
const { User,Spot,Booking,Review, ReviewImage, SpotImage } = require('../../db/models');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const router = express.Router();

async function checkSpot(req, res, next){
    const spotId = req.params.spotId;
    const spot = await Spot.findByPk(spotId);

    if(spot){
        req.spot = spot;
        return next()
    }else{
        res.status(404).json({
            message:"Spot couldn't be found"
        })
    }
};

async function properAuthSpot(req,res,next){
    // console.log('User ID:', req.user.id);
    // console.log('Spot Owner ID:', req.spot.ownerId);

    if(req.user.id === req.spot.ownerId){
        return next();
    }
    res.status(403).json({
        message:'Forbidden'
      })
}

async function checkAuthSpot_booking(req,res,next){
    const spot = await Spot.findByPk(parseInt(req.params.spotId, 10));
    if (req.user.id !== spot.ownerId){
        return next();
    }
    res.status(403).json({
        message:'Forbidden'
    })
}
//get all spots
router.get('/',async(req,res,next)=>{
    const spots = await Spot.findAll({
        include:[
            {
                model:SpotImage,
                attributes:['url'],
                where:{preview:true},
                require:false
            },
            {
                model:Review,
                attributes:['stars']
            }
        ]
    });
// console.log('spots-->',spots),
// console.log('----/>',spots[0].Reviews[0])
    const body = {
        Spots:spots.map(ele => {
            const avgRating = ele.Reviews.length > 0 ? (ele.Reviews.reduce((acc,review) => acc + review.stars, 0) / ele.Reviews.length).toFixed(2) : null;//???
            // console.log(avgRating)
            // console.log(ele.Reviews.stars)
            const { url: previewImageUrl } = (ele.SpotImages[0] || {});
            return{
                id:ele.id,
                ownerId:ele.ownerId,
                    address:ele.address,
                    city:ele.city,
                    state:ele.state,
                    country:ele.country,
                    lat:ele.lat,
                    lng:ele.lng,
                    name:ele.name,
                    description:ele.description,
                    price:ele.price,
                    createdAt:ele.createdAt,
                    updatedAt:ele.updatedAt,
                    avgRating:avgRating,
                    previewImage:previewImageUrl
            }
        })
    }
    return res.json(body);
})

//create_a_spot
const validateCreateSpot = [
    check('address')
      .notEmpty()
      .withMessage('Street address is required'),
    check('city')
      .notEmpty()
      .withMessage('City is required'),
    check('state')
      .notEmpty()
      .withMessage('State is required'),
    check('country')
      .notEmpty()
      .withMessage('Country is required'),
    check('lat')
      .isNumeric()
      .withMessage('Latitude is not valid')
      .custom(value=>{
        if(value < -90 || value >90){
            throw new Error('Latitude is not valid')
        }
        return true
    }),
    check('lng')
      .isNumeric()
      .withMessage('Longitude is not valid')
      .custom(value=>{
        if(value < -180 || value >180){
            throw new Error('Longitude is not valid')
        }
        return true
      }),
    check('name')
      .isLength({ max: 50 })
      .notEmpty()
      .withMessage('Name must be less than 50 characters'),
    check('description')
      .notEmpty()
      .withMessage('Description is required'),
    check('price')
    //   .notEmpty()
      .isNumeric()
      .withMessage('Price per day is required')
      .custom(value=>{
        if(value<=0){
            throw new Error('Price per day is required')
        }
        return true
      }),
handleValidationErrors
  ];
router.post('/',requireAuth, validateCreateSpot, async(req,res,next)=>{

    const {address, city, state, country, lat, lng, name, description, price} = req.body;
    const newSpot = await Spot.create({
        ownerId:req.user.id, address, city, state, country, lat, lng, name, description,price
    })
    return res.status(201).json({
        id:newSpot.id,
        ownerId:newSpot.ownerId,
        address:newSpot.address,
        city:newSpot.city,
        state:newSpot.state,
        country:newSpot.country,
        lat:newSpot.lat,
        lng:newSpot.lng,
        name:newSpot.name,
        description:newSpot.description,
        price:newSpot.price,
        createdAt:newSpot.createdAt,
        updatedAt:newSpot.updatedAt
      });

})

//create_an_image_to_a_spot
router.post('/:spotId/images',requireAuth,checkSpot,properAuthSpot,async(req,res,next)=>{
    const {spotId} = req.params;
    const {url, preview} = req.body;


    const spotImage = await SpotImage.create({
        url:url,
        preview:preview,
        spotId:spotId
    });
    res.json({
        id:spotImage.id,
        url:spotImage.url,
        preview:spotImage.preview
    })

});

//get-spot-of-current-user
router.get('/current', requireAuth, async(req,res,next)=>{
    const spots = await Spot.findAll({
        include:[
            {
                model:SpotImage,
                attributes:['url'],
                where:{preview:true},
                require:false
            },
            {
                model:Review,
                attributes:['stars']
            }
        ],
        where:{ownerId:req.user.id}
    });
    const body = {
        Spots:spots.map(ele => {

            const avgRating = ele.Reviews.length > 0 ? (ele.Reviews.reduce((acc,review) => acc + review.stars, 0) / ele.Reviews.length).toFixed(2) : null;
            const { url: previewImageUrl } = (ele.SpotImages[0] || {});
            return{
                id:ele.id,
                ownerId:ele.ownerId,
                    address:ele.address,
                    city:ele.city,
                    state:ele.state,
                    country:ele.country,
                    lat:ele.lat,
                    lng:ele.lng,
                    name:ele.name,
                    description:ele.description,
                    price:ele.price,
                    createdAt:ele.createdAt,
                    updatedAt:ele.updatedAt,
                    avgRating:avgRating,
                    previewImage:previewImageUrl
            }
        })
    }
    return res.json(body);

});

//get-details-of-a-spot-by-id -> /api/spots/:spotId
router.get('/:spotId', checkSpot, async(req, res, next) => {
    const spotId = req.params.spotId;
    const spot = await Spot.findByPk(spotId, {
            include: [
                {
                    model: SpotImage,
                    attributes:['id', 'url', 'preview']
                },
                {
                    model: User,
                    as: 'Owner',
                    attributes: ['id', 'firstName', 'lastName']
                },
                {
                    model:Review
                }
            ]
        });

        const numReviews = spot.Reviews ? spot.Reviews.length : 0;
        // console.log(spot)
        const avgRating = numReviews > 0 ? (spot.Reviews.reduce((acc, review) => acc + review.stars, 0) / numReviews).toFixed(2) : null;

        const response = {
            id: spot.id,
            ownerId: spot.ownerId,
            address: spot.address,
            city: spot.city,
            state: spot.state,
            country: spot.country,
            lat: spot.lat,
            lng: spot.lng,
            name: spot.name,
            description: spot.description,
            price: spot.price,
            createdAt: spot.createdAt,
            updatedAt: spot.updatedAt,
            numReviews: numReviews,
            avgRating: avgRating,
            SpotImages: spot.SpotImages,
            Owner: spot.Owner
        };

        return res.status(200).json(response);

    })

    //edit-a-spot
    router.put('/:spotId', requireAuth, validateCreateSpot, checkSpot, properAuthSpot, async(req,res,next)=>{
        const {address, city, state, country, lat, lng, name, description, price} = req.body;
        const spotId = req.params.spotId;

        const spot = await Spot.findByPk(spotId);
        spot.address = address;
        spot.city = city;
        spot.state = state;
        spot.country = country;
        spot.lat = lat;
        spot.lng = lng;
        spot.name = name;
        spot.description = description;
        spot.price = price;

        await spot.save();

        return res.status(200).json({
            id: spot.id,
            ownerId: spot.ownerId,
            address: spot.address,
            city: spot.city,
            state: spot.state,
            country: spot.country,
            lat: spot.lat,
            lng: spot.lng,
            name: spot.name,
            description: spot.description,
            price: spot.price,
            createdAt: spot.createdAt,
            updatedAt: spot.updatedAt
        });

    })

    //create-a-review-for-a-spot => post -->/api/spots/:spotId/reviews
    const validateReview = [
        check('review')
        .notEmpty()
        .withMessage('Review text is required'),
        check('stars')
        .isInt({min:1,max:5})
        .withMessage('Stars must be an integer from 1 to 5'),
        handleValidationErrors
    ]

    router.post('/:spotId/reviews', requireAuth, checkSpot, validateReview,async(req, res, next) => {
        const spotId = parseInt(req.params.spotId, 10);
        const userId = req.user.id;
        const { review, stars } = req.body;

        const existingReview = await Review.findOne({
            where: { userId, spotId }
        });

        if (existingReview) {
            return res.status(500).json({ message: "User already has a review for this spot" });
        }

        const newReview = await Review.create({
            userId,
            spotId,
            review,
            stars
        });

        return res.status(201).json({
            id: newReview.id,
            userId: newReview.userId,
            spotId: newReview.spotId,
            review: newReview.review,
            stars: newReview.stars,
            createdAt: newReview.createdAt,
            updatedAt: newReview.updatedAt
        });

    })


    //get-reviews-by-spot-id => get -> /api/spots/:spotId/reviews
    router.get('/:spotId/reviews', checkSpot,async(req, res, next) => {
        const spotId = req.params.spotId;
        const reviews = await Review.findAll({
            where:{spotId:spotId},
            include:[
                {
                    model:User,
                    attributes:['id','firstName','lastName']
                },
                {
                    model:ReviewImage,
                    attributes:['id','url']
                }
            ]
        })

        const body = {
            Reviews:reviews.map(ele => {
                return{
                    id:ele.id,
                    userId:ele.userId,
                    spotId:parseInt(req.params.spotId, 10),
                    review: ele.review,
                        stars: ele.stars,
                        createdAt: ele.createdAt,
                        updatedAt: ele.updatedAt,
                        User:{
                            id: ele.User.id,
                            firstName: ele.User.firstName,
                            lastName: ele.User.lastName
                        },
                        ReviewImages: ele.ReviewImages

                }
            })
        }
        return res.json(body);
    })

    const validatebooking =[
        check('startDate')
        .exists({checkFalsy:true})
        .withMessage('Error startDate'),
        check('endDate')
        .exists({checkFalsy:true})
        .withMessage('Error endDate')
        .custom((value, { req }) => {
            if (new Date(value) <= new Date(req.body.startDate)) {
              throw new Error('endDate cannot be on or before startDate');
            }
            return true;
          }),
    handleValidationErrors
    ];
    //create-a-booking-based-on-a-spot-id => post -> /api/spots/:spotId/bookings
    router.post('/:spotId/bookings', requireAuth,checkSpot,checkAuthSpot_booking,  validatebooking, async(req,res,next) => {
        const { startDate, endDate } = req.body;
        const spotId = req.spot.id;
        const conflictingBooking = await Booking.findOne({
            where: {
              spotId,
              [Op.or]: [
                {
                  startDate: {
                    [Op.lte]: endDate,
                    [Op.gte]: startDate
                  }
                },
                {
                  endDate: {
                    [Op.lte]: endDate,
                    [Op.gte]: startDate
                  }
                }
              ]
            }
          });

          if (conflictingBooking) {
            return res.status(403).json({
              message: "Sorry, this spot is already booked for the specified dates",
              errors: {
                startDate: "Start date conflicts with an existing booking",
                endDate: "End date conflicts with an existing booking"
              }
            });
          }

          const newBooking = await Booking.create({
            userId: req.user.id,
            spotId,
            startDate,
            endDate
          });

          return res.status(200).json({
            id: newBooking.id,
            spotId: newBooking.spotId,
            userId: newBooking.userId,
            startDate: newBooking.startDate,
            endDate: newBooking.endDate,
            createdAt: newBooking.createdAt,
            updatedAt: newBooking.updatedAt
          });


    })

module.exports = router;
