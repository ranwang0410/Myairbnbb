'use strict';

const { SpotImage } = require('../models');
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
    await SpotImage.bulkCreate([
      {
        "spotId": 1,
        "url": "https://a0.muscache.com/im/pictures/b09bfd48-d73a-4ea0-b319-1c07aefd615b.jpg?im_w=1440",
        "preview": true
    },
    {
      "spotId": 2,
      "url": "https://a0.muscache.com/im/pictures/miso/Hosting-38187802/original/f464b390-e363-41a4-889d-f28759f9e234.jpeg?im_w=1200",
      "preview": true
    },
    {
      "spotId": 3,
      "url": "https://a0.muscache.com/im/pictures/127308fe-a721-4c9c-8f46-4cd1e9d2c1b6.jpg?im_w=1200",
      "preview": true
    },
    {
      "spotId": 4,
      "url": "https://a0.muscache.com/im/pictures/167eb876-04a8-4e9c-b2b9-5992f2bcb58c.jpg?im_w=1200",
      "preview": true
  },
  {
    "spotId": 5,
    "url": "https://a0.muscache.com/im/pictures/708e58ab-d1f2-4304-9d0a-73553a2147c8.jpg?im_w=1200",
    "preview": true
  }
    ],{validate:true})
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    options.tableName = 'SpotImages';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      url: { [Op.in]: [
      'https://a0.muscache.com/im/pictures/b09bfd48-d73a-4ea0-b319-1c07aefd615b.jpg?im_w=1440',
      'https://a0.muscache.com/im/pictures/miso/Hosting-38187802/original/f464b390-e363-41a4-889d-f28759f9e234.jpeg?im_w=1200',
      'https://a0.muscache.com/im/pictures/127308fe-a721-4c9c-8f46-4cd1e9d2c1b6.jpg?im_w=1200',
      'https://a0.muscache.com/im/pictures/167eb876-04a8-4e9c-b2b9-5992f2bcb58c.jpg?im_w=1200',
      'https://a0.muscache.com/im/pictures/708e58ab-d1f2-4304-9d0a-73553a2147c8.jpg?im_w=1200'
    ]}
    }, {});
  }
};
