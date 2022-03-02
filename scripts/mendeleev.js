function pickTextColorBasedOnBgColorAdvanced(bgColor, lightColor, darkColor) {
    var color = (bgColor.charAt(0) === '#') ? bgColor.substring(1, 7) : bgColor;
    var r = parseInt(color.substring(0, 2), 16); // hexToR
    var g = parseInt(color.substring(2, 4), 16); // hexToG
    var b = parseInt(color.substring(4, 6), 16); // hexToB
    var uicolors = [r / 255, g / 255, b / 255];
    var c = uicolors.map((col) => {
      if (col <= 0.03928) {
        return col / 12.92;
      }
      return Math.pow((col + 0.055) / 1.055, 2.4);
    });
    var L = (0.2126 * c[0]) + (0.7152 * c[1]) + (0.0722 * c[2]);
    return (L > 0.179) ? darkColor : lightColor;
}

(async () => {
    const canvas = document.querySelector("#mendeleev"),
    ctx = canvas.getContext('2d');

    canvas.width = document.querySelector(".container_").offsetWidth;
    canvas.height = document.querySelector(".container_").offsetHeight;

    const cwidth = canvas.width,
    cheight = canvas.height;
    let PeriodicPath = "https://vadimdzh.github.io/MKTCalculator/assets/PeriodicTableJSON.json";
    const response = await fetch(PeriodicPath);
    table = await response.json();
    const elements = table.elements;

    const camera = new Camera();
    function isCollisioned(rect1, rect2){
        return (rect1.x < rect2.x + rect2.w &&
            rect1.x + rect1.w > rect2.x &&
            rect1.y < rect2.y + rect2.h &&
            rect1.h + rect1.y > rect2.y)
    }
    function drawElement(el){

        

        const x = el.xpos * 128,
        y = el.ypos * 64 + 64;
        if(!isCollisioned({x: x, y: y, w: 128, h: 64}, {x: -camera.x, y: -camera.y, w: window.innerWidth, h: window.innerHeight})) return;
    
        ctx.strokeStyle = 'lightgray';
        // ctx.strokeRect(x, y, 128, 64);
        ctx.fillStyle = "#" + el['cpk-hex'];
        ctx.fillRect(x, y, 128, 64);
        
        ctx.textAlign = 'start';
        ctx.textBaseline = "middle";
        ctx.fillStyle = pickTextColorBasedOnBgColorAdvanced("#" + el['cpk-hex'], 'white', 'black');
       
        ctx.font = "16px Verdana";
        ctx.fillText(el.symbol, x + 20, y + 22);
        
        ctx.font = "10px Verdana";
        ctx.fillText(el.name, x + 20, y + 22 + 16 + 8);

        ctx.textAlign = 'end';
        ctx.font = "12px Verdana";
        ctx.fillText(el.number, x + 110, y + 22);
        ctx.font = "8px Verdana";
        ctx.textAlign = 'end';
        ctx.fillText(Math.round(el.atomic_mass), x + 110, y + 22 + 16 + 8);
    }

    let loop = () => {
        
        if(elements !== undefined){
            ctx.setTransform(1,0,0,1,0,0);
            ctx.clearRect(0, 0, cwidth, cheight);
            camera.translate(ctx);
            
            for(let x = 0; x < 18; x++){
                ctx.font = '18px Verdana';
                ctx.strokeStyle = 'lightgray';
                ctx.strokeRect(128 + 128 * x, 64, 128, 64);
                ctx.textAlign = 'center';
                ctx.textBaseline = 'middle';
                ctx.fillStyle = current_theme == 'light' ? 'black' : 'white';
                ctx.fillText(x + 1, 128 + 128 * x + 64, 64 + 32);
            }
            for(let y = 0; y < 7; y++){
                ctx.font = '18px Verdana';
                ctx.strokeStyle = 'lightgray';
                ctx.strokeRect(64, y * 64 + 128, 64, 64);
                ctx.textAlign = 'center';
                ctx.textBaseline = 'middle';
                ctx.fillStyle = current_theme == 'light' ? 'black' : 'white';
                ctx.fillText(y + 1, 64 + 32, y * 64 + 32 + 128);
            }

            elements.forEach(el => {
                drawElement(el);
            })
        }

            
        requestAnimationFrame(loop);
        
    }

    let startX = 0;
    let startY = 0;
    let cameraPos = {x: 0, y: 0};
    let isMouse = false;


    canvas.addEventListener("mousedown", (e) => {

        startX = e.clientX;
        startY = e.clientY;

        cameraPos.x = camera.x;
        cameraPos.y = camera.y;

        let x = -camera.x + e.clientX,
        y = -camera.y + e.clientY;

        isMouse = true;
        
    })

    canvas.addEventListener("mousemove", (e) => {

        let x = -camera.x + e.clientX,
        y = -camera.y + e.clientY;

        if(isMouse) camera.moveTo({x: cameraPos.x + (e.clientX - startX), y: cameraPos.y + (e.clientY - startY)});
        

        Mouse = {x, y};

    })

    canvas.addEventListener("mouseup", (e) => {
        isMouse = false;

    })

    canvas.addEventListener("touchstart", (e) => {

        startX = e.touches[0].clientX;
        startY = e.touches[0].clientY;

        cameraPos.x = camera.x;
        cameraPos.y = camera.y;

        let x = -camera.x + e.touches[0].clientX,
        y = -camera.y + e.touches[0].clientY;

        isMouse = true;
        
    })

    canvas.addEventListener("touchmove", (e) => {

        let x = -camera.x + e.touches[0].clientX,
        y = -camera.y + e.touches[0].clientY;

        if(isMouse) camera.moveTo({x: cameraPos.x + (e.touches[0].clientX - startX), y: cameraPos.y + (e.touches[0].clientY - startY)});
        

        Mouse = {x, y};

    })

    canvas.addEventListener("touchend", (e) => {
        isMouse = false;

    })

    canvas.addEventListener('mouseleave', () => {
        isMouse = false;
    })

    loop();
})();