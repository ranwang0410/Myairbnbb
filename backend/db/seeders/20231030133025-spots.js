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
        city:'Burlingame',
        state:'California',
        country:'United States',
        lat:37.57,
        lng:-122.34,
        name:'Cozy, Spacious Villa with Private Pool & Bay View!',
        description:'Set back from an already quite, wide residential street, the closed in the courtyard like creates an added layer of privacy that permeates the entire property. ',
        price:838
      },
      {
        ownerId:2,
        address:'street2',
        city:'Soquel',
        state:'California',
        country:'United States',
        lat:36.98,
        lng:-121.95,
        name:'5,700 sq. Luxury Villa, Oceanview, Infinity Pool',
        description:"Rustic Mediterranean style villa with modern influences. Meticulous attention to detail is apparent throughout this home, making it an exceptional choice for your holiday. The villa offers extraordinary indoor/outdoor spaces including a theater, chefs kitchen, incredible master bath, infinity pool/hot tub and sweeping views of Monterey Bay. Every detail has been thought of, from the furnishings and accessories to the materials selection.",
        price:1495

      },
      {
        ownerId:3,
        address:'street3',
        city:'Aptos',
        state:'California',
        country:'United States',
        lat:36.97,
        lng:-121.89,
        name:'Work Remote @Modern Beach Retreat-Free EV Charging',
        description:'This open and airy modern home is a 5 minute walk to Rio del Mar beach. Enjoy the clean design, large deck and indoor outdoor living. Numerous outdoor activities at your doorstep including golf, world class surf breaks, and renowned biking and hiking trails in the forest of Nisene Marks. Equipped with high speed internet, a projector and Sonos sound system. Our place comfortably hosts five and is good for couples, business travelers, solo, and families.',
        price:344
      },
      {
        ownerId:4,
        address:'street4',
        city:'Oxnard',
        state:'California',
        country:'United States',
        lat:34.19,
        lng:-119.17,
        name:'Ocean Front Modern Luxurious Beach Home-GAME ROOM',
        description:"Breathtaking Spectacular Ocean Front Views from our Brand New Modern Home centrally located in Oxnard. Bright and airy as well as newly furnished with luxurious furnishings and beddings. This is the perfect home for families and friend reunions. Our home is six bedrooms and five bathrooms. Kitchen has stainless steel appliances. Our home feels as if you're sitting on the sand from our sofa as you watch the waves and tranquility of the beach surrounding you making it the ultimate beach getaway",
        price:914
      },
      {
        ownerId:5,
        address:'street5',
        city:'Bodega Bay',
        state:'California',
        country:'United States',
        lat:38.33,
        lng:-123.04,
        name:'Ocean Front Paradise w Hot Tub&Fire Pit',
        description:"Welcome to Cliff House! Nestled on the stunning Northern CA coast, this home has unparalleled ocean views. Enjoy a 10 minute walk to Duncan's Cove or Wright's Beach. From the impressive waves and tide pools in the winter months to the warm ocean breezes in the summer sun, it's always a great time to visit.- Luxe bedding, fully equipped European size kitchen, hot tub & fire pit- Come to escape or do it all! Wine Country (45mins) Northwood Golf Course (20mins) Kayaking in Jenner (10mins)",
        price:650
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
