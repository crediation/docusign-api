const express = require('express');
const router = express.Router();
const axios = require('axios');

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

axios.defaults.headers.common['Authorization'] = process.env.BEARER_TOKEN;
axios.defaults.baseURL = process.env.BASE_URL;
axios.defaults.headers.post['Content-Type'] = 'application/json';

const accountIdGuid = process.env.ACCOUNT;

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

/* GET - Get account details */
router.get('/accounts/:accountIdGuid', function (req, res, next) {
  const account_id_guid = req.params.accountIdGuid === "undefined" ? accountIdGuid : req.params.accountIdGuid;
  const endpoint = `accounts/${account_id_guid}`;
  docusignGet(req, res, next, endpoint);
});

/* GET - Get a list of account's Envelopes */
router.get('/templates', function (req, res, next) {
  const endpoint = `accounts/${accountIdGuid}/templates`;
  docusignGet(req, res, next, endpoint);
});

/* POST - Create a new Envelope */
router.post('/envelopes',  function (req, res, next) {
  axios.post(`accounts/${accountIdGuid}/envelopes`, req.body)
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

/* GET - List account's envelopes */
router.get('/envelopes', function (req, res, next){
  const endpoint = `accounts/${accountIdGuid}/envelopes?from_date=${req.query.from_date}`;
  docusignGet(req, res, next, endpoint);
});

/* GET - account's details */
router.get('/envelopes/:envelopeId',  function (req, res, next){
  const endpoint = `accounts/${accountIdGuid}/envelopes/${req.params.envelopeId}`;
  docusignGet(req, res, next, endpoint);
});

/* GET - Get a list of Envelopes' documents */
router.get('/envelopes/:envelopeId/documents', function(req, res, next) {
  const endpoint = `accounts/${accountIdGuid}/envelopes/${req.params.envelopeId}/documents`;
  docusignGet(req, res, next, endpoint);
});

/* GET - Get a list of Envelopes' recipients */
router.get('/envelopes/:envelopeId/recipients', function(req, res, next) {
  const endpoint = `accounts/${accountIdGuid}/envelopes/${req.params.envelopeId}/recipients`;
  docusignGet(req, res, next, endpoint);
});

/* GET - Get a list of Envelope recipient's signature */
router.get('/envelopes/:envelopeId/recipients/:recipientId/signature', function(req, res, next) {
  const endpoint = `accounts/${accountIdGuid}/envelopes/${req.params.envelopeId}/recipients/${req.params.recipientId}/signature`;
  docusignGet(req, res, next, endpoint);
});

/* GET - List custom tabs */
router.get('/tab_definitions', function(req, res, next) {
  const endpoint = `accounts/${accountIdGuid}/tab_definitions`;
  docusignGet(req, res, next, endpoint);
});

module.exports = router;
