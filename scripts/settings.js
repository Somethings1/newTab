const _id = e => document.getElementById(e);

const getConfig = () => {//show current option to settings page
    chrome.storage.sync.get(result => {
        let config = result.config;

        //Generation section
        _id("name").value = config.name;
        _id((config.format == 12) ? "h12" : "h24").checked = true;
        _id(config.backgroundType).checked = true;
        _id("imgURL").value = config.imageURL;
        _id("image").checked && (hide.style.display = "block");

        //Greeting section
        _id("grt_text").value = config.greeting.text;
        _id("grt_clr_" + config.greeting.color).checked = true;
        _id("grt_font").value = config.greeting.size;
        _id("grt_anm_" + config.greeting.animation).checked = true;

        //Clock section
        _id("clk_clr_" + config.clock.color).checked = true;
        _id("clk_font").value = config.clock.size;
        _id("clk_valg_" + config.clock.verticalAlign).checked = true;
        _id("clk_halg_" + config.clock.horizontalAlign).checked = true;
    });
}

const setConfig = () => {//Save the new settings
    let conf = {
        name: _id("name").value,
        format: (_id("h12").checked ? 12 : 24),
        greeting: {
            text: _id("grt_text").value,
            color: (_id("grt_clr_white").checked ? "white" : "black"),
            size: _id("grt_font").value,
            animation: _id("grt_anm_top").checked ? "top" : "left"
        },
        clock: {
            color: (_id("clk_clr_white").checked ? "white" : "black"),
            size: _id("clk_font").value,
            verticalAlign: (_id("clk_valg_top").checked ? "top" : _id("clk_valg_center").checked ? "center" : "bottom"),
            horizontalAlign: (_id("clk_halg_left").checked ? "left" : _id("clk_halg_center").checked ? "center" : "right")
        },
        backgroundType: (_id("video").checked ? "video" : "image"),
        imageURL: _id("imgURL").value
    }
    chrome.storage.sync.set({config: conf}, () => alert("Configuration saved successfully!"));
}

const resetConfig = () => {
    chrome.storage.sync.get(result => {
        let conf = result.defaultConfig;
        chrome.storage.sync.set({config: conf});
        getConfig();
        hide.style.display = "none"
    })
}

(() => {

    //Add events
    imageL.addEventListener("change", () => hide.style.display = "block");
    videoL.addEventListener("change", () => hide.style.display = "none");
    save.addEventListener("click", () => setConfig());
    cancel.addEventListener("click", () => window.close());
    reset.addEventListener("click", () => resetConfig());

    getConfig();
})();