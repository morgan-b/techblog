const { User } = require('../models');

const userData = 

[
    {
      "username": "Sal123",

      "password": "password12345"
    },
    {
      "username": "Lernantino123",

      "password": "password12345"
    },
    {
      "username": "Amiko123",

      "password": "password12345"
    },
    {
      "username": "Jordan13",

      "password": "password12345"
    },
    {
      "username": "Blake333",

      "password": "password12345"
    }
  ]

  const seedUsers = () => User.bulkCreate(userData);

module.exports = seedUsers;