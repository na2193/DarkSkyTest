class BasePage {
    open(path) {
        browser.url(path);
        browser.maximizeWindow();
    }
}

export default BasePage;