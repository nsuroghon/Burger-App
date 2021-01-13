const express = require('express');
const burger = require('../models/burger.js')

const router = express.Router();

router.get('/', (req, res) => {
    burger.selectAll((data) => {
      const hbsObject = {
        burgers: data,
      };
      console.log(hbsObject);
      res.render('index', hbsObject);
    });
  });

  router.post('/api/burgers', (req, res) => {
    cat.create(['name', 'sleepy'], [req.body.name, req.body.sleepy], (result) => {
      // Send back the ID of the new quote
      res.json({ id: result.insertId });
    });
  });