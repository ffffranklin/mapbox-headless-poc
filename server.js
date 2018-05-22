const connect = require('connect');
const serveStatic = require('serve-static');
const puppeteer = require('puppeteer');
const log = require('debug')('mapbox-headless-poc');

const paths = {
  imageExport: 'screenshot.png',
  pdfExport: 'screenshot.pdf',
};
const urls = {
  pageWithMap: 'http://localhost:8080',
  reportWithMap: 'https://modeanalytics.com/modeqa/reports/f3fc6ff8b4f2?secret_key=502d29e4088cb4e5aa6314b4',
  gpuProfile: 'chrome://gpu',
};

const port = 8080;
const pageLoadTimeout = 10000;
const captureDelay = 5000;
const app = connect().use(serveStatic(__dirname));

const server = app.listen(port, function(){
  log('Server running on 8080...');
});

async function capture(targetUrl, imageExportPath, pdfExportPath) {
  try {
    // necessary to work with gpu
    // inspiredby: https://github.com/GoogleChrome/puppeteer/issues/1260#issuecomment-348878456
    const opts = {
      // prevents puppeteer from setting headless flags
      headless: false,
      // so we can set them here without --disable-gpu
      args: [
        '--headless',
        '--hide-scrollbars',
        '--mute-audio'
      ]
    };

    const browser = await puppeteer.launch(opts);
    const page = await browser.newPage();

    log('Navigating to "%s"', targetUrl);
    await page.goto(targetUrl, {
      timeout: pageLoadTimeout,
      waitUntil: 'networkidle2',
    });

    log('Waiting for page to render');
    await page.waitFor(captureDelay);

    await page.emulateMedia('screen');

    log('Capturing pdf screenshot to "%s"', pdfExportPath);
    await page.pdf({
      path: pdfExportPath,
      printBackground: true,
      format: 'letter',
    });

    log('Capturing image screenshot to "%s"', imageExportPath);
    await page.screenshot({
      path: imageExportPath ,
    });

    log('Closing page process');
    await page.close();

    log('Closing browser process');
    await browser.close();
  } catch(e) {
    log(e);
  } finally {
    log('Closing server');
    server.close(()=> log('Server closed!'))
  }
}

/** __main__ **/
capture(urls.pageWithMap, paths.imageExport, paths.pdfExport)
  .then(()=> log('Done'))
  .catch((e)=> log(e));
