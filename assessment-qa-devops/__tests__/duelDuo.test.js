const { Builder, Browser, By, until } = require("selenium-webdriver");

let driver;

beforeEach(async () => {
  driver = await new Builder().forBrowser(Browser.EDGE).build();
});

afterEach(async () => {
  await driver.quit();
});

describe("Duel Duo tests", () => {
  test("page loads with title", async () => {
    await driver.get("http://localhost:8000");
    await driver.wait(until.titleIs("Duel Duo"), 1000);

    const title = await driver.getTitle();
    expect(title).toBe("Duel Duo");
  });
  test("clicking Draw button displays the div with id = choices", async () => {
    await driver.get("http://localhost:8000");
    const drawButton = await driver.findElement(By.id("draw"));
    await drawButton.click();

    const choicesDiv = await driver.findElement(By.id("choices"));
    expect(await choicesDiv.isDisplayed()).toBe(true);
  });
  test("clicking 'Add to Duo' button displays the div with id = player-duo", async () => {
    await driver.get("http://localhost:8000");
    await driver.findElement(By.id("draw")).click();

    const addToDuoButton = await driver.findElement(By.className("bot-btn"));
    await addToDuoButton.click();

    const playerDuoDiv = await driver.findElement(By.id("player-duo"));
    expect(await playerDuoDiv.isDisplayed()).toBe(true);
  });
  test("when a bot is 'Removed from Duo', it goes back to 'choices'", async () => {
    await driver.get("http://localhost:8000");
    await driver.findElement(By.id("draw")).click();

    const addToDuoButton = await driver.findElement(By.className("bot-btn"));
    await addToDuoButton.click();
    await driver.sleep(2000);

    const removeButton = await driver.findElement(By.id("player-duo"));
    const childBot = await removeButton.findElement(By.className("bot-btn"));
    await childBot.click();
    await driver.sleep(2000);

    const playerDuoDiv = await driver.findElement(By.id("player-duo"));
    expect(await playerDuoDiv.isDisplayed()).toBe(false);
  });
});
