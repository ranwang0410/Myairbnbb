'use strict';

const { ReviewImage } = require('../models');
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
    await ReviewImage.bulkCreate([
      {
        "reviewId":1,
        "url": "image url1"
      },
      {
        "reviewId":2,
        "url":"image url2"
      },
      {
        "reviewId":3,
        "url":"image url3"
      },{
        "reviewId":4,
        "url": "image url4"
      },
      {
        "reviewId":5,
        "url":"image url5"
      },

    ],{ validate: true })
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    options.tableName = 'ReviewImages';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      url: { [Op.in]: ['image url1', 'image url2', 'image url3','image url4','image url5'] }
    }, {});
  }
};
