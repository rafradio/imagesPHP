class DrawStrokes {
    constructor(block, className) { 
        this.createElement(block, className);
        this.box = document.getElementById(block);
    }

    createElement(block, className) {
        let newDiv = document.createElement('div');
        newDiv.setAttribute("class", className);
        newDiv.setAttribute("id", block);
        document.getElementById('test_box').appendChild(newDiv);
    }

    getCursorPosition(e) {
        e = e || window.event;
        if (e) {
            if (e.pageX || e.pageX == 0) return [e.pageX,e.pageY];
            var dE = document.documentElement || {};
            var dB = document.body || {};
            if ((e.clientX || e.clientX == 0) && ((dB.scrollLeft || dB.scrollLeft == 0) || (dE.clientLeft || dE.clientLeft == 0))) 
                return [e.clientX + (dE.scrollLeft || dB.scrollLeft || 0) - (dE.clientLeft || 0),e.clientY + (dE.scrollTop || dB.scrollTop || 0) - (dE.clientTop || 0)];
        }
        return null;
    }

    mousedown(e) {
        let mxy = this.getCursorPosition(e);
        this.box.orig_x = mxy[0];
        this.box.orig_y = mxy[1];
        this.box.style.left = mxy[0]+"px";
        this.box.style.top = mxy[1]+"px";
        this.box.style.display = "block";
        this.box.style.zIndex = "8";
        document.onmousemove = this.mousemove.bind(this);
        document.onmouseup = this.mouseup.bind(this);
    }

    mousemove(e) {
        let mxy = this.getCursorPosition(e);
        if(mxy[0]-this.box.orig_x < 0) {
            this.box.style.left = mxy[0]+"px";
        }
    
        if(mxy[1]-this.box.orig_y<0) {
          this.box.style.top = mxy[1]+"px";
        }
    
        this.box.style.width = Math.abs(mxy[0]-this.box.orig_x)+"px";
        this.box.style.height = Math.abs(mxy[1]-this.box.orig_y)+"px";
    }

    mouseup(e) {}

    removeListners() {
        document.body.style.cursor = "auto";
        document.onmousemove = function() {};
        document.onmousedown = function() {};
        document.onmouseup = function() {};
    }

    findAvarageRGB(canvas, x, y, width, height) {}
}

class CropPicture extends DrawStrokes {
    constructor(block, className) {
        super(block, className);
        
    }

    mouseup(e) {
        console.log("from mouseup ", this.box.style.width, this.box.style.height);
        this.drawOnCanvas(this.box.style.width, this.box.style.height, this.box.orig_x, this.box.orig_y);
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
        
        imageObj.src = document.getElementsByTagName("img")[0].src;
        console.log("picture analyse: ", imageObj.width, imageObj.height, imageOnScreen.width, imageOnScreen.height, imageOnScreen.style.left, imageOnScreen.style.top);
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

class SelectUrgent extends DrawStrokes {
    constructor(block, className) {
        super(block, className);
        let canvas = document.getElementById('myCanvas');
        let rgb = this.findAvarageRGB(canvas, 0, 0, canvas.width, canvas.height);
        this.box.style.border = `2px dashed rgb(${rgb.r},${rgb.g},${rgb.b})`;
    }

    // getCursorPosition(e) {
    // }

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


document.getElementById('crop').onclick = () => {
    document.getElementById("test_box").style.display = "block";
    document.body.style.cursor = "nw-resize";
    let obj = new CropPicture("sel_box", "sel_box");
    document.onmousedown = obj.mousedown.bind(obj);
}

function createID(i) {
    let namID = "rnd_box_" + i;
    let block = document.getElementById(namID);
    if (block != null) {namID = createID(i+1)}
    return namID;
}

document.getElementById('arrow').onclick = () => {
    document.body.style.cursor = "crosshair";
    let id = createID(1);
    let obj = new SelectUrgent(id, "rnd_box");
    document.onmousedown = obj.mousedown.bind(obj);
}

document.getElementById('reset').onclick = () => {
    canvas = document.getElementById("myCanvas");
    canvas.classList.add("no-vis");
    // sel_box.remove();
    let sel_box = document.getElementById("sel_box");
    sel_box.remove();
    let rnd_box = document.querySelectorAll(".rnd_box");
    rnd_box.forEach(el => {
        el.remove();
    });
    document.getElementById("test_box").style.display = "none";
}

document.getElementById('save').onclick = () => {
    let canvas = document.getElementById('myCanvas');

    
    canvas.toBlob(function(blob) {

        let link = document.createElement('a');
        link.download = 'example.png';
        link.href = URL.createObjectURL(blob);
        link.click();
        URL.revokeObjectURL(link.href);
      }, 'image/png');
}


