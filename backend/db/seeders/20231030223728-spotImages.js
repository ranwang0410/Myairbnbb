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
      "spotId": 1,
      "url": "https://a0.muscache.com/im/pictures/9454fc8a-6e24-46ba-9de4-1d144ef47c79.jpg?im_w=480",
      "preview": false
    },
    {
      "spotId": 1,
      "url": "https://a0.muscache.com/im/pictures/209c45da-8e90-4030-9039-251109eee7d3.jpg?im_w=480",
      "preview": false
  },
  {
    "spotId": 1,
    "url": "https://a0.muscache.com/im/pictures/71e9bf25-07c9-4746-9480-cc28530408cf.jpg?im_w=480",
    "preview": false
},
{
  "spotId": 1,
  "url": "https://a0.muscache.com/im/pictures/a44ab983-9a15-40ed-ae31-dbd4d4f4cde6.jpg?im_w=480",
  "preview": false
},
    {
      "spotId": 2,
      "url": "https://a0.muscache.com/im/pictures/miso/Hosting-38187802/original/f464b390-e363-41a4-889d-f28759f9e234.jpeg?im_w=1200",
      "preview": true
    },
    {
      "spotId": 2,
      "url": "https://a0.muscache.com/im/pictures/miso/Hosting-38187802/original/5a344fbd-4cea-4bbd-82b8-f6f5992f32a3.jpeg?im_w=480",
      "preview": false
    },
    {
      "spotId": 2,
      "url": "https://a0.muscache.com/im/pictures/miso/Hosting-38187802/original/092aa96e-d30c-4e60-8127-038030977f4d.jpeg?im_w=480",
      "preview": false
    },
    {
      "spotId": 2,
      "url": "https://a0.muscache.com/im/pictures/miso/Hosting-38187802/original/34c4d3b1-bd44-44d4-9f9b-9352160b49df.jpeg?im_w=480",
      "preview": false
    },
    {
      "spotId": 2,
      "url": "https://a0.muscache.com/im/pictures/miso/Hosting-38187802/original/7343ce37-bf38-4b88-8363-bf2768b73ea9.jpeg?im_w=480",
      "preview": false
    },
    {
      "spotId": 3,
      "url": "https://a0.muscache.com/im/pictures/127308fe-a721-4c9c-8f46-4cd1e9d2c1b6.jpg?im_w=1200",
      "preview": true
    },
    {
      "spotId": 3,
      "url": "https://a0.muscache.com/im/pictures/88f46169-5bec-48ec-92ca-d9069e6f28c5.jpg?im_w=480",
      "preview": false
    },
    {
      "spotId": 3,
      "url": "https://a0.muscache.com/im/pictures/331c5328-5a35-4ebd-9f7c-f7e166ab14fa.jpg?im_w=480",
      "preview": false
    },
    {
      "spotId": 3,
      "url": "https://a0.muscache.com/im/pictures/1ae9c6bd-82e1-4a10-8514-2610c7c997f2.jpg?im_w=480",
      "preview": false
    },
    {
      "spotId": 3,
      "url": "https://a0.muscache.com/im/pictures/95480bd9-d438-450f-8920-b5010da341b2.jpg?im_w=480",
      "preview": false
    },
    {
      "spotId": 4,
      "url": "https://a0.muscache.com/im/pictures/167eb876-04a8-4e9c-b2b9-5992f2bcb58c.jpg?im_w=1200",
      "preview": true
  },
  {
    "spotId": 4,
    "url": "https://a0.muscache.com/im/pictures/987f9e54-95d2-48c6-b648-c2f500ebde28.jpg?im_w=480",
    "preview": false
},
{
  "spotId": 4,
  "url": "https://a0.muscache.com/im/pictures/4a505462-3e7a-4bc6-9144-178cf064220d.jpg?im_w=480",
  "preview": false
},
{
  "spotId": 4,
  "url": "https://a0.muscache.com/im/pictures/cc9edc0d-02b4-4e43-890c-36a9f4faf5df.jpg?im_w=480",
  "preview": false
},
{
  "spotId": 4,
  "url": "https://a0.muscache.com/im/pictures/faa50a7f-e91b-4b2b-9bdb-fd19d0a816c6.jpg?im_w=480",
  "preview": false
},
  {
    "spotId": 5,
    "url": "https://a0.muscache.com/im/pictures/708e58ab-d1f2-4304-9d0a-73553a2147c8.jpg?im_w=1200",
    "preview": true
  },
  {
    "spotId": 5,
    "url": "https://a0.muscache.com/im/pictures/47f937de-ebc6-49d8-9b82-3f566c8d8054.jpg?im_w=480",
    "preview": false
  },
  {
    "spotId": 5,
    "url": "https://a0.muscache.com/im/pictures/51baa451-f3a2-44c1-bf8b-abab979e5583.jpg?im_w=480",
    "preview": false
  },
  {
    "spotId": 5,
    "url": "https://a0.muscache.com/im/pictures/329fa61e-d3d9-49b4-a20f-eefeea2c2f17.jpg?im_w=480",
    "preview": false
  },
  {
    "spotId": 5,
    "url": "https://a0.muscache.com/im/pictures/c8ae4b9f-b4d7-448b-bcfd-14123ba23557.jpg?im_w=480",
    "preview": false
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
      'https://a0.muscache.com/im/pictures/9454fc8a-6e24-46ba-9de4-1d144ef47c79.jpg?im_w=480',
      'https://a0.muscache.com/im/pictures/209c45da-8e90-4030-9039-251109eee7d3.jpg?im_w=480',
      'https://a0.muscache.com/im/pictures/71e9bf25-07c9-4746-9480-cc28530408cf.jpg?im_w=480',
      'https://a0.muscache.com/im/pictures/a44ab983-9a15-40ed-ae31-dbd4d4f4cde6.jpg?im_w=480',

      'https://a0.muscache.com/im/pictures/miso/Hosting-38187802/original/f464b390-e363-41a4-889d-f28759f9e234.jpeg?im_w=1200',
      'https://a0.muscache.com/im/pictures/miso/Hosting-38187802/original/5a344fbd-4cea-4bbd-82b8-f6f5992f32a3.jpeg?im_w=480',
      'https://a0.muscache.com/im/pictures/miso/Hosting-38187802/original/092aa96e-d30c-4e60-8127-038030977f4d.jpeg?im_w=480',
      'https://a0.muscache.com/im/pictures/miso/Hosting-38187802/original/34c4d3b1-bd44-44d4-9f9b-9352160b49df.jpeg?im_w=480',
      'https://a0.muscache.com/im/pictures/miso/Hosting-38187802/original/7343ce37-bf38-4b88-8363-bf2768b73ea9.jpeg?im_w=480',

      'https://a0.muscache.com/im/pictures/127308fe-a721-4c9c-8f46-4cd1e9d2c1b6.jpg?im_w=1200',
      'https://a0.muscache.com/im/pictures/88f46169-5bec-48ec-92ca-d9069e6f28c5.jpg?im_w=480',
      'https://a0.muscache.com/im/pictures/331c5328-5a35-4ebd-9f7c-f7e166ab14fa.jpg?im_w=480',
      'https://a0.muscache.com/im/pictures/1ae9c6bd-82e1-4a10-8514-2610c7c997f2.jpg?im_w=480',
      'https://a0.muscache.com/im/pictures/95480bd9-d438-450f-8920-b5010da341b2.jpg?im_w=480',



      'https://a0.muscache.com/im/pictures/167eb876-04a8-4e9c-b2b9-5992f2bcb58c.jpg?im_w=1200',
      'https://a0.muscache.com/im/pictures/987f9e54-95d2-48c6-b648-c2f500ebde28.jpg?im_w=480',
      'https://a0.muscache.com/im/pictures/4a505462-3e7a-4bc6-9144-178cf064220d.jpg?im_w=480',
      'https://a0.muscache.com/im/pictures/cc9edc0d-02b4-4e43-890c-36a9f4faf5df.jpg?im_w=480',
      'https://a0.muscache.com/im/pictures/faa50a7f-e91b-4b2b-9bdb-fd19d0a816c6.jpg?im_w=480',


      'https://a0.muscache.com/im/pictures/708e58ab-d1f2-4304-9d0a-73553a2147c8.jpg?im_w=1200',
      'https://a0.muscache.com/im/pictures/47f937de-ebc6-49d8-9b82-3f566c8d8054.jpg?im_w=480',
      'https://a0.muscache.com/im/pictures/51baa451-f3a2-44c1-bf8b-abab979e5583.jpg?im_w=480',
      'https://a0.muscache.com/im/pictures/329fa61e-d3d9-49b4-a20f-eefeea2c2f17.jpg?im_w=480',
      'https://a0.muscache.com/im/pictures/c8ae4b9f-b4d7-448b-bcfd-14123ba23557.jpg?im_w=480'
    ]}
    }, {});
  }
};
