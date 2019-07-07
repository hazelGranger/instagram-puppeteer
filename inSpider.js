import puppeteer from 'puppeteer'

const CHROME = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_2) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/71.0.3578.98 Safari/537.36'
const BANK_NAME = 'BC'

export const crawlIns = async (name) => {
  return new Promise(async function(resolve, reject) {
    try {
        const browser = await puppeteer.launch({headless: true})
        const page = await browser.newPage()
        page.setUserAgent(CHROME)
        page.setViewport({width: 1200, height: 1000})

        await page.goto(`https://www.instagram.com/${name}/`)
        await page.waitForSelector('.-vDIg')
        const title = await page.$eval('.rhpdm', ele => ele.innerText)
        const description = await page.$eval('.-vDIg span', ele => ele.innerText)
        const images = await page.$$eval('.KL4Bh img', img => img.map(ele => ele.src))

        console.log(title, description, images);
        // const users = await page.evaluate((sel) => {
        //   const $els = document.querySelector(sel);
        //   console.log($els.innerText);
        // }, TITLE);
        resolve({
          title,
          description,
          images
        })

        setTimeout(async ()=> {
          await browser.close()
        }, 5000)

    } catch (e) {
      console.log(e)
    }
  })
}
