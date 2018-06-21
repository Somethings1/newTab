chrome.storage.sync.get(result => {
    let conf = result.config;

    const name = conf.name;

    const modify = x => x < 10 ? "0" + x : x;

    const render = (h, m, s, a = "") => {
        clock.innerHTML = `${h}:${m}:${s} ${a}`;
    }

    const getTime = () => {
        let date = new Date(),
            hours = modify(date.getHours()),
            mins = modify(date.getMinutes()),
            secs = modify(date.getSeconds()),
            ampm = "A.M";

        conf.format == 12 && hours > 12 && (hours -= 12) && (ampm = "P.M")

        conf.format == 12 ? render(hours, mins, secs, ampm) : render(hours, mins, secs);
    }

    const buildFromConfig = () => {

        //Color and size of the greeting text and the clock
        welcome.style.color = conf.greeting.color;
        welcome.style.fontSize = conf.greeting.size;
        clock.style.color = conf.clock.color;
        clock.style.fontSize = conf.clock.size;

        //Type of background
        if(conf.backgroundType == "image") {
            video.style.display = "none";
            background.style.background = `url(${conf.imageURL})`;
            background.style.zIndex = "0";
        }

        //Position of greeting text
        switch([conf.clock.horizontalAlign, conf.clock.verticalAlign].join(' ')) {
            case "left top": {
                clock.style.position = "fixed";
                clock.style.top = "10px";
                clock.style.left = "10px";                
                break;
            }
            case "center top": {
                clock.style.position = "fixed";
                clock.style.top = "10px";
                clock.style.left = "50%";   
                clock.style.transform = "translateX(-50%)";
                break;
            }
            case "right top": {
                clock.style.position = "fixed";
                clock.style.top = "10px";
                clock.style.right = "10px";  
                break;
            }
            case "left center": {
                clock.style.position = "fixed";
                clock.style.top = "50%";
                clock.style.left = "10px";   
                clock.style.transform = "translateY(-50%)";
                break;
            }
            case "right center": {
                clock.style.position = "fixed";
                clock.style.top = "50%";
                clock.style.right = "10px";   
                clock.style.transform = "translateY(-50%)";
                break;
            }
            case "left bottom": {
                clock.style.position = "fixed";
                clock.style.left = "10px";
                clock.style.bottom = "10px";   
                break;
            }
            case "center bottom": {
                clock.style.position = "fixed";;
                clock.style.left = "50%";  
                clock.style.bottom = "10px"; 
                clock.style.transform = "translateX(-50%)";
                break;
            }
            case "right bottom": {
                clock.style.position = "fixed";
                clock.style.right = "10px";
                clock.style.bottom = "10px"; 
                break;
            }
        }
    }

    const generate = () => {
        let date = new Date(),
        hours = modify(date.getHours()),
        welcomeText = conf.greeting.text,
        set = "Good morning";

        hours >= 12 && (set = "Good afternoon");
        hours >= 18 && (set = " Good evening");

        welcomeText = welcomeText.replace(/\-name\-/g, name).replace(/-hello-/g, set);

        welcome.innerHTML = welcomeText;
    }

    buildFromConfig();
    generate();
    setInterval(() => getTime(), 500);
    setTimeout(() => welcome.style.display = "none", 10500);
});