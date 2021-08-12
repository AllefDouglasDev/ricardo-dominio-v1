const configServerUtil = require('../utils/configServerUtil');

module.exports = {
  getIpDominio(request, response) {
    try {
      const { ipDominio } = configServerUtil.getConfigServerData();

      return response.json({ ipDominio });
    } catch (err) {
      return response.json(err);
    }
  },

  updateIpDominio(request, response) {
    try {
      configServerUtil.setConfigServerData('ipDominio', request.body.ipServer);

      return response.send();
    } catch (err) {
      return response.json(err);
    }
  },
};
