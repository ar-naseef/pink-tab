let openTabs = [];
let tabId = {};

let refreshOpenTabsInfo = () => {

    openTabs = [];
    tabId = {};
    
    browser.tabs.query({}).then(data => {
        data.forEach(tab => {
            openTabs.push(tab.url)
            // console.log(tab)
            tabId[tab.url] = tab.id;
        });
    }).catch(err => {
        console.log(err);
    });

}

let checkIfAllreadyTabOpen = (thisTabId, changeInfo, tabInfo) => {
    let currentUrl = tabInfo.url;

    browser.tabs.query({}).then(tabs => {
        openTabs = [];
        tabId = {};
        tabs.forEach(tab => {
            openTabs.push(tab.url)
            // console.log(tab)

            // @TODO change tabId object to have key as ID and url as value, othervise duplicaes will be overritten
            // then continue debugging
            tabId[tab.url] = tab.id;
        });
        // console.log("currentTabDetails")
        console.log(currentUrl, thisTabId);
        console.log(openTabs, tabId);

        if (openTabs.includes(currentUrl) && tabId[currentUrl] != thisTabId) {
            console.log(openTabs, tabId);
            console.log("same address allready open in tab ID: " + currentUrl);

            browser.tabs.remove(tabId[currentUrl]).then(data => {
                console.log("duplicate tabs closed...");
                console.log(openTabs, tabId);
                
                browser.tabs.query({}).then(data => {
                    openTabs = [];
                    tabId = {};
                    data.forEach(tab => {
                        openTabs.push(tab.url)
                        // console.log(tab)
                        tabId[tab.url] = tab.id;
                    });
                }).catch(err => {
                    console.log(err);
                });

            }).catch(err => {
                console.log("some error: " + err);
            });
        }
            
    }).catch(err => {
        console.log(err);
    });
}

// browser.webRequest.onBeforeRequest.addListener(
//     checkIfAllreadyTabOpen,
//     {urls: ["<all_urls>"]}
// );

// browser.tabs.onRemoved.addListener(
//     refreshOpenTabsInfo
// );

let dothis = (tabId, chnginfo, tabinfo) => {
    console.log("tab updated..." + tabId);
    console.log(tabinfo.url);
}

browser.tabs.onUpdated.addListener(checkIfAllreadyTabOpen);