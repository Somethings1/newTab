const defaultConf = {
    name: "Admin",
    format: 24,
    greeting: {
        text: "-hello-, -name-",
        color: "white",
        size: 64
    },
    clock: {
        color: "white",
        size: 32,
        verticalAlign: "center",
        horizontalAlign: "center"
    },
    backgroundType: "video",
    imageURL: "images/default.jpg"
}

let conf = defaultConf;

chrome.storage.sync.set({ config: conf });
chrome.storage.sync.set({ defaultConfig: defaultConf });
