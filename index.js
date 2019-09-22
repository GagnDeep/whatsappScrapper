const puppeteer = require('puppeteer')
const login = require('./whatsapp_login');


async function introDelay(ms) {
    let promise = new Promise((res, rej) => setTimeout(() => res(), ms));
    await promise
}


async function startStalking(mobile) {

    let arr = [];

    let page = await login();

    if (page) {
        let isFound = await openPersonPage(mobile, page)

        if (isFound) {
            for (let i = 0; i < 100; i++) {
                await sendMessage("gagan is great", page)
                await openPersonPage('7889135688', page)
                await sendMessage("gagan is great", page)
                await openPersonPage('8968044978', page)
            }
        }
    }
}


async function sendMessage(message, page) {
    await page.keyboard.type(message)
    await page.keyboard.press('Enter');
}


async function openPersonPage(mobile, page) {
    try {
        //clicking on search bar
        await page.click('input[type=text]')

        // searhing for that mobile number
        await page.keyboard.type(mobile)
        const isLoaded = await isSearched(page);

        if (!isLoaded) return false;

        await page.keyboard.press('Enter')

        // check if person exists
        try {
            if (await page.$('div._3dwyT')) {
                throw new Error("Person not found")
            } else {
                return true
            }
        }
        catch (err) {
            console.log(err);
            return false
        }


    } catch (err) {
        console.log("Failed on clicking on search", err)
        return false;
    }
}

async function isSearched(page, tries = 0) {
    if (tries > 30) return false;

    let isLoaded = page.$('span[data-icon=x-alt]')

    if (isLoaded) return true;

    await introDelay(500);
    await isSearched(page, tries + 1)
}

startStalking("8968044978")
