const webdriver = require('selenium-webdriver');
const {By} = require('selenium-webdriver');

const driver = new webdriver
    .Builder()
    .withCapabilities(webdriver.Capabilities.firefox())
    .build();

describe('Test Navigation', () => {
    beforeAll((done) => {
        driver.navigate().to('http://localhost:3000')
            .then(() => done());
    });

    afterAll(() => setTimeout(() => driver.quit(), 300));

    it('control title', async () => {
        expect(await driver.getTitle()).toMatch(/^Doodle Jump by Maya & Severin.*/);
    });

    it('navigate to HowToPlay then Highscore, then Play', async () => {
        await driver.findElement(By.xpath('//*[text()=\'How to Play\']')).click();
        await driver.findElement((By.xpath('//*[text()=\'Home\']'))).click();

        await driver.findElement((By.xpath('//*[text()=\'Highscore\']'))).click();
        await driver.findElement((By.xpath('//*[text()=\'Home\']'))).click();

        await driver.findElement((By.xpath('//*[text()=\'Play\']'))).click();
        // Test will fail if it cannot navigate to Play
    });
});
