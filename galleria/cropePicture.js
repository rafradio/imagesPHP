import {DrawStrokes} from "./drawStrokes.js";

class CropPicture extends DrawStrokes {
    constructor(block, className) {
        super(block, className);
        
    }

    mouseup(e) {
        [this.box.last_x, this.box.last_y] = this.getCursorPosition(e);
        let firstCanvasX = this.box.orig_x > this.box.last_x ? this.box.last_x: this.box.orig_x;
        let firstCanvasY = this.box.orig_y > this.box.last_y ? this.box.last_y: this.box.orig_y;
        console.log("from mouseup ", this.box.style.width, this.box.style.height);
        this.drawOnCanvas(this.box.style.width, this.box.style.height, firstCanvasX, firstCanvasY);
        this.box.style.display = "none";
        this.box.style.width = "0";
        this.box.style.height = "0";
        this.removeListners();
    }

    drawOnCanvas(picWidth, picHeight, picX, picY) {
        let self = this;
        let canvas = document.getElementById('myCanvas');
        // box.classList.add("canvas-no-vis");
        canvas.classList.remove("no-vis");
        canvas.classList.add("canvas_vis");
        let context = canvas.getContext('2d', { willReadFrequently: true });
    
        let imageObj = new Image();
    
        // imageObj.src = document.getElementById('picture').src;
        let imageOnScreen = document.getElementsByTagName("img")[0];
        
        imageObj.src = imageOnScreen.currentSrc;
        console.log("picture analyse: ", imageObj.width, imageObj.height, imageOnScreen.width, imageOnScreen.height, imageOnScreen.style.left, imageOnScreen.style.top);
        
        console.log("picture rotate: ", document.getElementsByTagName("img")[0].style.transform.match(/rotate\((\d+)(.+)\)/)[1]);
        let koefCorrect = imageObj.width / imageOnScreen.width;
        imageObj.onload = function() {
            console.log("from onload");
            canvas.style.width = picWidth;
            canvas.style.height = picHeight;
            
            console.log(picWidth, canvas.height);
            const desiredWidth = parseFloat(picWidth.replaceAll("px",""));
            const desiredHeight = parseFloat(picHeight.replaceAll("px",""));
            canvas.width = desiredWidth;
            canvas.height = desiredHeight;
            context.imageSmoothingEnabled = true;
            let realX = (picX - imageOnScreen.style.left.replaceAll("px","")) * koefCorrect;
            let realY = (picY - imageOnScreen.style.top.replaceAll("px","")) * koefCorrect;
            console.log("picture analyse 2: ", imageOnScreen.style.left, imageOnScreen.style.top, koefCorrect);
            context.drawImage(imageObj, realX, realY, desiredWidth*koefCorrect, desiredHeight*koefCorrect, 0, 0, desiredWidth, desiredHeight);
//            context.drawImage(imageObj, picX*2, picY*2, desiredWidth*2, desiredHeight*2, 0, 0, desiredWidth, desiredHeight);
            // console.log(self.findAvarageRGB(canvas));
        }
    }

    findAvarageRGB(canvas, x, y, width, height) {
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

export {CropPicture};