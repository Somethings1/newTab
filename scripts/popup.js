const link = document.getElementById("link");
link.addEventListener("click", function() {
    chrome.tabs.create({url: "settings.html"});
})