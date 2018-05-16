const connect = require('connect');
const serveStatic = require('serve-static');
const puppeteer = require('puppeteer');

const paths = {
  imageExport: 'screenshot.png',
  pdfExport: 'screenshot.pdf',
};
const urls = {
  poc: 'http://localhost:8080',
  report: 'https://modeanalytics.com/modeqa/reports/f3fc6ff8b4f2?secret_key=502d29e4088cb4e5aa6314b4',
};

const port = 8080;
const pageLoadTimeout = 10000;
const captureDelay = 5000;
const app = connect().use(serveStatic(__dirname));

const server = app.listen(port, function(){
  console.log('Server running on 8080...');
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

    console.log('Navigating to "%s"', targetUrl);
    await page.goto(targetUrl, {
      timeout: pageLoadTimeout,
      waitUntil: 'networkidle2',
    });

    console.log('Waiting for page to render');
    await page.waitFor(captureDelay);

    console.log('Capturing image screenshot to "%s"', imageExportPath);
    await page.screenshot({
      path: imageExportPath ,
    });

    console.log('Capturing pdf screenshot to "%s"', pdfExportPath);
    await page.pdf({
      path: pdfExportPath,
      format: 'letter',
    });

    console.log('Closing page process');
    await page.close();

    console.log('Closing browser process');
    await browser.close();
  } catch(e) {
    console.error(e);
  } finally {
    console.log('Closing server');
    server.close(()=> console.log('Server closed!'))
  }
}

/** __main__ **/
capture(urls.poc, paths.imageExport, paths.pdfExport)
  .then(()=> console.log('Done'))
  .catch((e)=> console.error(e));
