import {DrawStrokes} from "./drawStrokes.js";

class SelectUrgent extends DrawStrokes {
    constructor(block, className) {
        super(block, className);
//        let canvas = document.getElementById('myCanvas');
//        let rgb = this.findAvarageRGB(canvas, 0, 0, canvas.width, canvas.height);
//        this.box.style.border = `2px dashed rgb(${rgb.r},${rgb.g},${rgb.b})`;
    }

    mouseup(e) {
        // this.drawOnCanvas(this.box.style.width, this.box.style.height, this.box.orig_x, this.box.orig_y);
        this.drawOnCanvas();
        this.box.style.display = "none";
        this.box.style.width = "0";
        this.box.style.height = "0";
        this.removeListners();
        
    }

    drawOnCanvas() {
        const canvas = document.getElementById('myCanvas');
        const img = document.getElementsByTagName("img")[0];
        const ctx = canvas.getContext("2d", { willReadFrequently: true });
        ctx.beginPath();
        ctx.lineWidth = "5";
        ctx.setLineDash([5, 3]);
        let rgb = this.findAvarageRGB(canvas,  canvas.width - (window.innerWidth - this.box.orig_x), this.box.orig_y,  this.box.style.width.replace("px", ""), this.box.style.height.replace("px", ""));
        if (document.getElementById('color-check').checked) {
            let color = document.getElementById("color").value;
            rgb.r = parseInt(color.substr(1,2), 16);
            rgb.g = parseInt(color.substr(3,2), 16);
            rgb.b = parseInt(color.substr(5,2), 16);
        }
        ctx.strokeStyle = `rgb(${rgb.r},${rgb.g},${rgb.b})`;
//        let koefY = img.height/canvas.height;
//        let koefX = img.width/canvas.width;

        let roundCorners = parseFloat(Math.sqrt(Math.pow(this.box.style.width.replace("px", ""),2) + Math.pow(this.box.style.height.replace("px", ""),2))/2);
        ctx.roundRect(canvas.width - (window.innerWidth - this.box.orig_x), this.box.orig_y,  this.box.style.width.replace("px", ""), this.box.style.height.replace("px", ""), [roundCorners]);
        // let centerX = canvas.width - (window.innerWidth - this.box.orig_x) + this.box.style.width.replace("px", "")/2;
        // let centerY = this.box.orig_y + this.box.style.height.replace("px", "")/2;
        // ctx.ellipse(centerX, centerY, roundCorners, roundCorners, 0, 0, Math.PI*2);
        ctx.stroke();
        
    }

    findAvarageRGB(canvas, x, y, width, height) {
        console.log("analyse x y: ", x, y, width, height);
        let rgb = {r:0,g:0,b:0};
        let blockSize = 5;
        let context = canvas.getContext('2d', { willReadFrequently: true });
        let i = -4;
        let count = 0;
        let data = context.getImageData(x, y, width, height);
        length = data.data.length;

        while ( (i += blockSize * 4) < length ) {
            ++count;
            rgb.r += data.data[i];
            rgb.g += data.data[i+1];
            rgb.b += data.data[i+2];
        }

        rgb.r = (255 - (~~(rgb.r/count)));
        rgb.g = (255 - (~~(rgb.g/count)));
        rgb.b = (255 - (~~(rgb.b/count)));

        let brightness = (299*rgb.r + 587*rgb.g + 114*rgb.b) / 1000;

        rgb.r += Math.floor( brightness / 100 * 255 );
        rgb.g += Math.floor( brightness / 100 * 255 );
        rgb.b += Math.floor( brightness / 100 * 255 );
 
        
        return rgb;

    }
}

export {SelectUrgent};