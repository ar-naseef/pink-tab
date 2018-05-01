let checkIfAllreadyTabOpen = (requestDetails) => {
    let currentUrl = requestDetails.url;
    // let currentTabId = requestDetails.tabid;
    let openTabs = [];
    let tabId = {};
    let tabsPromise = browser.tabs.query({});
    // console.log(browser.tabs);
    // console.log(openTabs);
    tabsPromise.then(data => {
        data.forEach(tab => {
            openTabs.push(tab.url)
            // console.log(tab)
            tabId[tab.url] = tab.id;
        });
        // console.log("currentTabDetails")
        // console.log(currentUrl, currentTabId);

        let currentTab = browser.tabs.query({currentWindow: true});

        if (openTabs.includes(currentUrl)) {
            console.log(tabId);

            console.log("same address allready open in tab ID: " + tabId[currentUrl]);

            browser.tabs.remove(tabId[currentUrl]).then(data => {
                console.log("duplicate tabs closed...");
            }).catch(err => {
                console.log("some error: " + err);
            });

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
