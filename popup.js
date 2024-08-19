document.addEventListener('DOMContentLoaded', () => {
    const toggle = document.getElementById('toggle-highlight');
    const statusText = document.getElementById('status');

    chrome.storage.sync.get(['highlightEnabled'], (data) => {
        const isEnabled = data.highlightEnabled || false;
        toggle.checked = isEnabled;
        updateStatus(isEnabled);
    });

    toggle.addEventListener('change', () => {
        const isEnabled = toggle.checked;
        chrome.storage.sync.set({ highlightEnabled: isEnabled });
        updateStatus(isEnabled);

        chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
            chrome.scripting.executeScript({
                target: { tabId: tabs[0].id },
                function: setHighlighting,
                args: [isEnabled],
            });
        });
    });

    function updateStatus(isEnabled) {
        statusText.textContent = `Status: ${isEnabled ? 'On' : 'Off'}`;
    }
});

function setHighlighting(isEnabled) {
    const clickableElements = document.querySelectorAll('a, button, [role="button"], [onclick], input[type="button"], input[type="submit"]');
    clickableElements.forEach(element => {
        if (isEnabled) {
            element.style.outline = '4px solid rgba(255, 0, 0, 1)';
            element.style.backgroundColor = 'rgba(255, 0, 0, 0.3)';
            element.style.color = 'white';
            element.style.fontWeight = 'bold';
            element.style.boxShadow = '0 0 10px rgba(255, 0, 0, 0.8)';
            element.style.transition = 'outline 0.3s ease, background-color 0.3s ease';
        } else {
            element.style.outline = '';
            element.style.backgroundColor = '';
            element.style.color = '';
            element.style.fontWeight = '';
            element.style.boxShadow = '';
        }
    });
}
