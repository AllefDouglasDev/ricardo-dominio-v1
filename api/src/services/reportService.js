const { dominioApi } = require('../utils/axios');

module.exports = {
  async getCompanies({ registrationData, crc, startDate, endDate }) {
    try {
      let lastUpdateDate = new Date();
      if (registrationData === 'inicial') {
        lastUpdateDate = startDate;
      } else if (registrationData === 'final') {
        lastUpdateDate = endDate;
      }

      const result = await dominioApi.get(
        `responsabilityLetter?lastUpdateDate=${lastUpdateDate.toISOString()}&crcType=${crc}`
      );

      return result.data;
    } catch (error) {
      return [];
    }
  },
};
