import { BrowserWindow, dialog } from 'electron';
import pie from 'puppeteer-in-electron';
import fs from 'fs';
import path from 'path';
import puppeteer from 'puppeteer-core';
import axios from 'axios';
import { renderEjs } from '../utils/ejsUtil';

export default class ChooseDirectoryController {
  constructor(
    private window: BrowserWindow,
    private pieBrowser: puppeteer.Browser
  ) {}

  openChooseDirectory = async () => {
    const result = await dialog.showOpenDialog(this.window, {
      properties: ['openDirectory'],
    });

    return result.filePaths;
  };

  generateReportPDF = async (data: any) => {
    try {
      const { registrationData, crc, startDate, endDate, saveLocation } = data;

      const window_to_PDF = new BrowserWindow({ show: false });
      const page = await pie.getPage(this.pieBrowser, window_to_PDF);
      const pdfSettings = {
        landscape: false,
        marginsType: 0,
        printBackground: false,
        printSelectionOnly: false,
        pageSize: 'A4',
      };

      const companiesResponse = await axios.get(
        'http://localhost:3001/report/companies',
        {
          params: {
            registrationData,
            crc,
            startDate,
            endDate,
          },
        }
      );
      const companies = companiesResponse.data;

      const pdfErrors = [];

      for (let i = 0; i < companies.length; i++) {
        const office = { ...data, ...companies[i] };
        try {
          const pageContent = await renderEjs(
            'responsabilityLetter',
            'ResponsabilityLetter.ejs',
            { office }
          );
          await page.setContent(pageContent);
          const resultPDF = await window_to_PDF.webContents.printToPDF(
            pdfSettings
          );
          fs.writeFileSync(
            path.join(saveLocation, `${office.razaoCliente}-${i}.pdf`),
            resultPDF
          );
        } catch (error) {
          pdfErrors.push({ office, error });
        }
      }
    } catch (error) {}
  };
}
