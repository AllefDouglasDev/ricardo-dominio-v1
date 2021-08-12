/* eslint-disable no-plusplus */
/* eslint-disable no-await-in-loop */
const puppeteer = require('puppeteer');
const path = require('path');

const { renderEjs } = require('../utils/ejsUtil');
const { dominioApi } = require('../utils/axios');
const reportService = require('../services/reportService');

module.exports = {
  async getCompany(request, response) {
    try {
      const { id } = request.params;

      const data = await dominioApi.get(
        `responsabilityLetter/company?id=${id}`
      );

      return response.json(data.data);
    } catch (error) {
      return response.status(500).json(error);
    }
  },

  async getCompanies(request, response) {
    try {
      const { registrationData, crc, startDate, endDate } = request.query;

      const companies = await reportService.getCompanies({
        registrationData,
        crc,
        startDate,
        endDate,
      });

      return response.json(companies);
    } catch (error) {
      return response.status(500).json(error);
    }
  },

  async createReport(request, response) {
    const {
      registrationData,
      crc,
      startDate,
      endDate,
      saveLocation,
    } = request.body;

    const companies = await reportService.getCompanies({
      registrationData,
      crc,
      startDate,
      endDate,
    });

    const pdfErrors = [];

    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    for (let i = 0; i < companies.length; i++) {
      const office = { ...request.body, ...companies[i] };
      try {
        const pageContent = await renderEjs(
          'responsabilityLetter',
          'ResponsabilityLetter.ejs',
          { office }
        );
        await page.setContent(pageContent);
        await page.pdf({
          path: path.join(saveLocation, `${office.razaoCliente}-${i}.pdf`),
          format: 'letter',
        });
      } catch (error) {
        pdfErrors.push({ office, error });
      }
    }

    await browser.close();

    return response.json({ errors: pdfErrors });
  },
};
