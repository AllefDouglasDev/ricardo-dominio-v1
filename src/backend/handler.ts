import { BrowserWindow } from 'electron';
import puppeteer from 'puppeteer-core';

import ChooseDirectoryHandler from './handlers/ChooseDirectoryHandler';

export default async function startup(
  window: BrowserWindow,
  pieBrowser: puppeteer.Browser
) {
  new ChooseDirectoryHandler().run(window, pieBrowser);
}
