import {CropPicture} from "./cropePicture.js";
import {SelectUrgent} from "./selectUrgent.js";

document.getElementById('crop').onclick = () => {
    document.getElementById("test_box").style.display = "block";
    document.body.style.cursor = "nw-resize";
    let obj = new CropPicture("sel_box", "sel_box");
    document.onmousedown = obj.mousedown.bind(obj);
}

function createID(i) {
    let namID = "rnd_box_" + i;
    let block = document.getElementById(namID);
    if (block != null) {return createID(i+1)}
    return namID;
}

function isCanvasBlank(canvas) {
  return !canvas.getContext('2d', { willReadFrequently: true })
            .getImageData(0, 0, canvas.width, canvas.height).data
            .some(channel => channel !== 0);
}

document.getElementById('arrow').onclick = () => {
    if (!(isCanvasBlank(document.getElementById("myCanvas")))) {
        document.body.style.cursor = "crosshair";
        let id = createID(1);
        let obj = new SelectUrgent(id, "rnd_box");
        document.onmousedown = obj.mousedown.bind(obj);
    } else {
        alert("Сначала необходимо создать область!");
    }
    
}

document.getElementById('reset').onclick = () => {
    if (!(isCanvasBlank(document.getElementById("myCanvas")))) {
        let canvas = document.getElementById("myCanvas");
        canvas.classList.add("no-vis");
        // sel_box.remove();
        let sel_box = document.getElementById("sel_box");
        sel_box.remove();
        let rnd_box = document.querySelectorAll(".rnd_box");
        rnd_box.forEach(el => {
            el.remove();
        });
        document.getElementById("test_box").style.display = "none";
    } else {
        alert("Сначала необходимо создать область!");
    }
    
}

document.getElementById('save').onclick = () => {
    if (!(isCanvasBlank(document.getElementById("myCanvas")))) {
        let canvas = document.getElementById('myCanvas');
        canvas.toBlob(function(blob) {

            let link = document.createElement('a');
            link.download = 'example.png';
            link.href = URL.createObjectURL(blob);
            link.click();
            URL.revokeObjectURL(link.href);
          }, 'image/png');
    } else {
        alert("Сначала необходимо создать область!");
    }
    
}


