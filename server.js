const connect = require('connect');
const serveStatic = require('serve-static');
const puppeteer = require('puppeteer');

const paths = {
  screenshot: 'screenshot.png',
};
const urls = {
  poc: 'http://localhost:8080',
  report: 'https://modeanalytics.com/modeqa/reports/f3fc6ff8b4f2?secret_key=502d29e4088cb4e5aa6314b4',
};

const port = 8080;
const pageTimeout = 5000;
const app = connect().use(serveStatic(__dirname));

const server = app.listen(port, function(){
  console.log('Server running on 8080...');
});

async function run() {
  try {
    // necessary to work with gpu
    // inspiredby: https://github.com/GoogleChrome/puppeteer/issues/1260#issuecomment-348878456
    const browser = await puppeteer.launch({
      headless: false,
      args: [
        '--headless',
        '--hide-scrollbars',
        '--mute-audio'
      ]
    });
    const page = await browser.newPage();

    await page.goto(urls.poc);
    await page.waitFor(pageTimeout);
    await page.screenshot({path: paths.screenshot});
    await browser.close();
  } catch(e) {
    console.error(e);
  } finally {
    server.close(()=> console.log('Server closed!'))
  }
}

/** __main__ **/
run();
