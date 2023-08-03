chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.message === 'toggleRTL') {
        const { rtlEnabled } = request;
        convertToRTL(rtlEnabled);
        sendResponse({ success: true });
    }
});
