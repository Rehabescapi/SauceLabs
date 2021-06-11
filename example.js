const webdriver = require("selenium-webdriver"),
  By = webdriver.By,
  until = webdriver.until;

const driver = new webdriver.Builder().forBrowser("firefox").build();

driver.get("http://www.google.com");

driver.findElement(By.name("q")).sendKeys("webdriver");

driver.sleep(1000).then(function () {
  driver.findElement(By.name("q")).sendKeys(webdriver.Key.RETURN);
});

driver.sleep(2000).then(function () {
  driver.findElement(By.name("btnK")).click();
  driver.getTitle().then(function (title) {
    if (title === "webdriver - Google Search") {
      console.log("Test passed");
    } else {
      console.log("Test failed");
    }
    driver.quit();
  });
});
