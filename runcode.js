let checkIfAllreadyTabOpen = (requestDetails) => {
    let currentUrl = requestDetails.url;
    let openTabs = [];
    let tabId = {};
    let tabsPromise = browser.tabs.query({});
    // console.log(browser.tabs);
    // console.log(openTabs);
    tabsPromise.then(data => {
        data.forEach(tab => {
            openTabs.push(tab.url)
            console.log(tab)
            tabId[tab.url] = tab.id;
        });

        if (openTabs.includes(currentUrl)) {
            console.log("same address allready open");

            // alert("same tab allready open !!");
        }
    }).catch(err => {
        console.log(err);
    });
}

browser.webRequest.onBeforeRequest.addListener(
    checkIfAllreadyTabOpen,
    {urls: ["<all_urls>"]}
);
