'use strict';

const { User,Spot } = require('../models');
const bcrypt = require("bcryptjs");

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    await Spot.bulkCreate([
      {
        ownerId:1,
        address:'street1',
        city:'city1',
        state:'state1',
        country:'country1',
        lat:-10,
        lng:10,
        name:'name1',
        description:'description1',
        price:10
      },
      {
        ownerId:2,
        address:'street2',
        city:'city2',
        state:'state2',
        country:'country2',
        lat:38.5,
        lng:40.5,
        name:'name2',
        description:'description2',
        price:55
      },
      {
        ownerId:3,
        address:'street3',
        city:'city3',
        state:'state3',
        country:'country3',
        lat:35,
        lng:35,
        name:'name3',
        description:'description3',
        price:80
      },
      {
        ownerId:4,
        address:'street4',
        city:'city4',
        state:'state4',
        country:'country4',
        lat:40,
        lng:40,
        name:'name4',
        description:'description4',
        price:90
      },
      {
        ownerId:5,
        address:'street5',
        city:'city5',
        state:'state5',
        country:'country5',
        lat:33.3,
        lng:39.8,
        name:'name5',
        description:'description5',
        price:50
      }
    ], { validate: true })
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    options.tableName = 'Spots';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      address: { [Op.in]: ['street1', 'street2', 'street3','street4','street5'] }
    }, {});
  }
};
