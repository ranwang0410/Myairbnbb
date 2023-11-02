const express = require('express');
const { Op } = require('sequelize');
const bcrypt = require('bcryptjs');

const { setTokenCookie, restoreUser,requireAuth } = require('../../utils/auth');
const { User,Spot,Booking,Review, ReviewImage, SpotImage } = require('../../db/models');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const router = express.Router();


async function checkSpotImage(req, res, next){
    const spotImageId = req.params.imageId;
    const spotImage = await SpotImage.findByPk(spotImageId);

    if(spotImage){
        req.spotImage = spotImage;
        return next()
    }else{
        res.status(404).json({
            message:"Spot Image couldn't be found"
        })
    }
};

async function properAuthSpotImage(req,res,next){
    const spot = await Spot.findByPk(req.spotImage.spotId);
    if(req.user.id === spot.ownerId){
        return next();
    }
    res.status(403).json({
        message:'Forbidden'
      })
}

//delete-a-spot-image => delete -> /api/spot-images/:imageId
router.delete('/:imageId', requireAuth, checkSpotImage, properAuthSpotImage,async(req, res, next) => {
    const spotImageId = req.params.imageId;
    const spotImage = await SpotImage.findByPk(spotImageId);
    await spotImage.destroy();
    res.status(200).json({
        message:"Successfully deleted"
    })
})
module.exports = router;
