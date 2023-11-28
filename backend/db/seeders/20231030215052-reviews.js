'use strict';

const { User,Spot,Review } = require('../models');
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
    await Review.bulkCreate([
      {
        "userId": 1,
        "spotId": 1,
        "review": "We had a fantastic stay for a week. This is the best place to stay with a beautiful view of a very safe area.",
        "stars": 1,
      },
      {
        "userId": 2,
        "spotId": 2,
        "review": "Wonderful villa. Beautiful view, wonderful amenities. Secluded but less than 10 min from groceries, shops. Very responsive host. We will come back.",
        "stars": 2,
      },
      {
        "userId": 3,
        "spotId": 3,
        "review": "Very charming house with a beautiful and large patio. The patio is surrounded by many trees, it feels like a tree house.",
        "stars": 3,
      },
      {
        "userId": 4,
        "spotId": 4,
        "review": "Sandra and Mike were great hosts. the air bnb was beautiful, just like the photos. great location and privacy. the sit bnb was also fully equipped with beach towels games books and beach equipment. great place to stay for a beach getaway. highly recommend the host and location.",
        "stars": 4,
      },
      {
        "userId": 5,
        "spotId": 5,
        "review": "This is an incredible stay. You will not regret staying here. The views are incredible and the home itself is spectacular. We fit 6 adults very comfortably in this home. We cannot wait to be back!",
        "stars": 5,
      }
    ],{ validate: true })
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    options.tableName = 'Reviews';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      review: { [Op.in]: ['This is first review!', 'This is second review!', 'This is third review!','This is fourth review!','This is fifth review!'] }
    }, {});
  }
};
