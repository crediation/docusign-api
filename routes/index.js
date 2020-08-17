const express = require('express');
const router = express.Router();
const axios = require('axios');

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

axios.defaults.headers.common['Authorization'] = process.env.BEARER_TOKEN;
axios.defaults.baseURL = process.env.BASE_URL;
axios.defaults.headers.post['Content-Type'] = 'application/json';

const accountId = process.env.ACCOUNT;

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'the Docusign APIs' });
});

/* GET - Get a list of account's Envelopes */
router.get('/templates', function (req, res, next) {
  axios.get(`accounts/${accountId}/templates`)
  .then(response => {
    console.log(response.data);
    res.status(response.status).send({
      data: response.data
    })
  })
  .catch(error => {
    console.log(error.response);
    res.status(error.response.status).send({
      data: error.response.data
    });
  });
});

/* POST - Create a new Envelope */
router.post('/envelopes',  function (req, res, next) {
  axios.post(`accounts/${accountId}/envelopes`, req.body)
  .then(response => {
    console.log(response.data);
    res.status(response.status).send({
      data: response.data
    })
  })
  .catch(error => {
    console.log(error.response);
    res.status(error.response.status).send({
      data: error.response.data
    });
  }); 
});

module.exports = router;
