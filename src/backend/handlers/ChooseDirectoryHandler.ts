import { BrowserWindow } from 'electron';
import puppeteer from 'puppeteer-core';

import Handler from './Handler';
import ChooseDirectoryController from '../controllers/ChooseDirectoryController';

export default class ChooseDirectoryHandler extends Handler {
  constructor() {
    super('chooseDirectory');
  }

  run = (window: BrowserWindow, pieBrowser: puppeteer.Browser) => {
    const chooseDirectoryController = new ChooseDirectoryController(
      window,
      pieBrowser
    );

    this.on('open', chooseDirectoryController.openChooseDirectory);
    this.on('report', chooseDirectoryController.generateReportPDF);
  };
}
