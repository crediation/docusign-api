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

const docusignGet = (req, res, next, endpoint) => {
  axios.get(endpoint)
  .then(response => {
    res.status(response.status).send({
      data: response.data
    })
  })
  .catch(error => {
    res.status(error.response.status).send({
      data: error.response.data
    });
  });
}

/* GET - Get a list of account's Envelopes */
router.get('/templates', function (req, res, next) {
  const endpoint = `accounts/${accountId}/templates`;
  docusignGet(req, res, next, endpoint);
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

/* GET - Get a list of Envelopes' documents */
router.get('/envelopes/:envelopeId/documents', function(req, res, next) {
  const endpoint = `accounts/${accountId}/envelopes/${req.params.envelopeId}/documents`;
  docusignGet(req, res, next, endpoint);
});

/* GET - Get a list of Envelopes' recipients */
router.get('/envelopes/:envelopeId/recipients', function(req, res, next) {
  const endpoint = `accounts/${accountId}/envelopes/${req.params.envelopeId}/recipients`;
  docusignGet(req, res, next, endpoint);
});

module.exports = router;
