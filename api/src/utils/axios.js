const axios = require('axios');

const configServerUtil = require('./configServerUtil');

const { ipDominio } = configServerUtil.getConfigServerData();

const dominioApi = axios.create({
  baseURL: `http://${ipDominio}:8080`,
});

module.exports = { dominioApi };
