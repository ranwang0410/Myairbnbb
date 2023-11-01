const express = require('express');
const { Op } = require('sequelize');
const bcrypt = require('bcryptjs');

const { setTokenCookie, restoreUser,requireAuth } = require('../../utils/auth');
const { User,Spot,Booking,Review, ReviewImage, SpotImage } = require('../../db/models');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const router = express.Router();
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

//
module.exports = router;
