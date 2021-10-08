
var request = require('request');
const myArgs = process.argv.slice(2)[0];
const puppeteer = require('puppeteer')
main()
async function main() {
  const response = await ClickStart()
  find = response.findIndex((a) => a == myArgs)
  console.log(response == -1 ? `can't find` : response[find + 1])
}
async function ClickStart() {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();
  await page.goto('https://codequiz.azurewebsites.net/');
  await page.click('input[value=Accept]');
  await page.waitForTimeout(1000)
  const bodyHandle = await page.$('table tbody');
  const array = await page.evaluate((body) => {
    var contents = body.querySelectorAll('tr td');
    var ids = []
    contents.forEach((x) => {
      ids.push(x.innerHTML.trim())
    })
    return ids
  }, bodyHandle);
  await bodyHandle.dispose();
  return array
}
