const express = require('express');
const router = express.Router();
const axios = require('axios');

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

axios.defaults.headers.common['Authorization'] = process.env.BEARER_TOKEN;
axios.defaults.baseURL = process.env.BASE_URL;

const accountId = process.env.ACCOUNT;

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'the Tasks API' });
});

router.get('/templates', function (req, res, next) {
  axios.get(`https://demo.docusign.net/restapi/v2/accounts/${accountId}/templates`)
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
})
module.exports = router;
