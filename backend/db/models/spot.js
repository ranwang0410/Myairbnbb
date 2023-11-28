'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Spot extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Spot.belongsTo(models.User,{
        foreignKey:'ownerId',
        as:'Owner'
      }),
      Spot.hasMany(models.Booking,{
        foreignKey:'spotId',
<<<<<<< HEAD
        onDelete:'CASCADE',
        hooks:true
      }),
      Spot.hasMany(models.Review,{
        foreignKey:'spotId',
        onDelete:'CASCADE',
      }),
      Spot.hasMany(models.SpotImage,{
        foreignKey:'spotId',
        onDelete:'CASCADE',
=======
        onDelete: 'CASCADE',
        // hooks: true
      }),
      Spot.hasMany(models.Review,{
        foreignKey:'spotId',
        onDelete: 'CASCADE',
      }),
      Spot.hasMany(models.SpotImage,{
        foreignKey:'spotId',
        onDelete: 'CASCADE',
>>>>>>> dev
      })
    }
  }
  Spot.init({
    ownerId: {
      type: DataTypes.INTEGER,

    },
    address: {
      type: DataTypes.STRING,
      allowNull:false
    },
    city: {
      type: DataTypes.STRING,
      allowNull:false
    },
    state: {
      type: DataTypes.STRING,
      allowNull:false
    },
    country: {
      type: DataTypes.STRING,
      allowNull:false
    },
    lat: {
      type: DataTypes.DECIMAL,
      validate:{
        min:-90,
        max:90,
        validLat(value){
          if(value < -90 || value > 90){
            throw new Error('The lat must be in -90 to 90.')
          }
        }
      }

    },
    lng: {
      type: DataTypes.DECIMAL,
      validate:{
        min:-180,
        max:180,
        validLat(value){
          if(value < -180 || value > 180){
            throw new Error('The lng must be in -180 to 180.')
          }
        }
      }
    },
    name: {
      type: DataTypes.STRING(50)
    },
    description: {
      type: DataTypes.STRING,
      allowNull:false
    },
    price: {
      type: DataTypes.DECIMAL,
      allowNull:false,
      validate:{
        min:0,
        validPrice(value){
          if(value < 0){
            throw new Error("The price must great than 0!")
          }
        }
      }
    },
  }, {
    sequelize,
    modelName: 'Spot',
  });
  return Spot;
};
