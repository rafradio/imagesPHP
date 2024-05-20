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

export {DrawStrokes};