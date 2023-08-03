function updateIcon(rtlEnabled) {
    const iconPath = rtlEnabled ? 'on' : 'off';
    console.log(iconPath)

    chrome.action.setIcon({
        path: {
            "16": `images/icon-${iconPath}.png`,
            "48": `images/icon-${iconPath}.png`,
            "128": `images/icon-${iconPath}.png`
        }
    });

}

function convertToRTL() {
    const paragraphs = document.querySelectorAll('p');

    const bdiTags = document.querySelectorAll('bdi')

    if (bdiTags.length === 0) {
        paragraphs.forEach(paragraph => {
            paragraph.outerHTML = `<bdi><p>${paragraph.textContent}</p></bdi>`;
        })
    } else {
        document.querySelectorAll('bdi').forEach(bdi => {
            bdi.outerHTML = `<p>${bdi.textContent}</p>`;
        })
    }
}

chrome.action.onClicked.addListener(tab => {
    chrome.storage.local.get(['rtlEnabled'], result => {

        const rtlEnabled = !result.rtlEnabled;

        chrome.storage.local.set({ rtlEnabled });

        chrome.scripting.executeScript({
            target: { tabId: tab.id },
            function: convertToRTL,
            args: [rtlEnabled]
        });

        // chrome.scripting.executeScript({
        //     target: { tabId: tab.id },
        //     function: updateIcon,
        //     args: [rtlEnabled]
        // });


    });


});


