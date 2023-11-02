const express = require('express');
const { Op } = require('sequelize');
const bcrypt = require('bcryptjs');

const { setTokenCookie, restoreUser,requireAuth } = require('../../utils/auth');
const { User,Spot,Booking,Review, ReviewImage, SpotImage } = require('../../db/models');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const router = express.Router();

async function checkBooking(req, res, next){
    const bookingId = req.params.bookingId;
    const booking = await Booking.findByPk(bookingId);

    if(booking){
        req.booking = booking;
        return next()
    }else{
        res.status(404).json({
            message:"Booking couldn't be found"
        })
    }
};

async function properAuthBooking(req,res,next){

    if(req.user.id === req.booking.userId){
        return next();
    }
    res.status(403).json({
        message:'Forbidden'
      })
}

async function deleteProperAuth(req, res, next){
    const spot = await Spot.findByPk(req.booking.spotId);
    if(req.user.id === req.booking.userId || req.user.id === spot.ownerId){
        return next();
    }
    res.status(403).json({
        message:'Forbidden'
      })
}
const validatebooking =[
    check('startDate')
    .exists({checkFalsy:true})
    .withMessage('Error startDate'),
    check('endDate')
    .exists({checkFalsy:true})
    .withMessage('Error endDate')
    .custom((value, { req }) => {
        if (new Date(value) <= new Date(req.body.startDate)) {
          throw new Error('endDate cannot come before startDate');
        }
        return true;
      }),
handleValidationErrors
];

//get-all-current-users-bookings => get -> /api/bookings/current
router.get('/current',requireAuth, async(req, res, next) => {
    const userId = req.user.id;
    const bookings = await Booking.findAll({
        where:userId,
        include:[
            {
                model:Spot,
                attributes:['id', 'ownerId', 'address', 'city', 'state', 'country','lat', 'lng', 'name', 'price'],
                include:[
                    {
                        model:SpotImage,
                        attributes:['url'],
                        where:{preview:true},
                        required:false
                    }
                ]

            }
        ]
    })

    const body = {
        Bookings:bookings.map(ele => {

            const { url: previewImageUrl } = (ele.Spot.SpotImages[0] || {});
            return{
                id:ele.id,

                spotId:ele.Spot.id,
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

                    price:ele.Spot.price,
                    previewImage:previewImageUrl
                },
                userId:ele.userId,
                startDate:ele.startDate,
                endDate:ele.endDate,
                createdAt: ele.createdAt,
                updatedAt: ele.updatedAt,

            }
        })
    }
    return res.json(body);
})

//edit-a-booking => put -> /api/bookings/:bookingId
router.put('/:bookingId', requireAuth, checkBooking, validatebooking,properAuthBooking, async(req,res,next) => {
    const {startDate, endDate} = req.body;
    const bookingId = parseInt(req.params.bookingId, 10);
    const bookings= await Booking.findByPk(bookingId);

    const conflictingBooking = await Booking.findOne({
        where: {
            id: { [Op.ne]: bookingId },
            spotId: bookings.spotId,
          [Op.or]: [
            {
              startDate: {
                [Op.lt]: endDate,
                [Op.gt]: startDate
              }
            },
            {
              endDate: {
                [Op.lt]: endDate,
                [Op.gt]: startDate
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
      if (new Date(startDate) < new Date() || new Date(endDate) < new Date()) {
        return res.status(403).json({
            message: "Past bookings can't be modified"
        });
    }
        bookings.startDate = startDate;
        bookings.endDate = endDate;
        await bookings.save();

        return res.status(200).json({
            id: bookings.id,
            spotId: bookings.spotId,
            userId: bookings.userId,
            startDate: bookings.startDate,
            endDate: bookings.endDate,
            createdAt: bookings.createdAt,
            updatedAt: bookings.updatedAt
        });
})

//delete-a-booking => delete -> /api/bookings/:bookingId
function checkBookingNotStart(req, res, next) {
    if (new Date(req.booking.startDate) < new Date()) {
        return res.status(403).json({
            message: "Bookings that have been started can't be deleted"
        });
    }
    return next();
}

router.delete('/:bookingId', requireAuth, checkBooking, deleteProperAuth, checkBookingNotStart, async (req, res, next) => {
    await req.booking.destroy();
    res.status(200).json({
        message:"Successfully deleted"
    })
})
module.exports = router;
