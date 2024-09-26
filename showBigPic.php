<!DOCTYPE html lang="ru">
<head>
    <meta charset="UTF-8">
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Pictures</title>
    <link href="galleria/img_tool/style_edit.css" rel="stylesheet" type="text/css">
    <link rel="stylesheet" href="galleria/img_tool/jquery.iviewer.css" />
    <script type="text/javascript" src="galleria/img_tool/jquery.js" ></script>
    <script type="text/javascript" src="galleria/img_tool/jqueryui.js" ></script>
    <script type="text/javascript" src="galleria/img_tool/jquery.mousewheel.min.js" ></script>
    <script type="text/javascript" src="galleria/img_tool/jquery.iviewer.js" ></script>
    <style>
        
    </style>
</head>
<body>
    <div id="test_box">
        <canvas id="myCanvas" class="class-Canvas"></canvas>
    </div>
    <div id="myModal" class="myModal">
            <div id="viewer1" class="my-viewer"></div>
    </div>
    <div class="buttons-wrapper">
        <button type="button" id="crop">Вырезать</button>
        <button type="button" id="arrow">Обводка</button>
        <button type="button" id="reset">Reset</button>
        <button type="button" id="save">Save</button>
        <input type="checkbox" id="color-check" name="color-check" value="color-check">
        <input type="color" id="color" name="color" value="#000000">
    </div>
    <?php
       
    ?>
    <script>
        let modal = document.querySelectorAll(".myModal");
        modal[0].classList.add('modal_vis');
        let params = new URL(document.location).searchParams;
        let picSrc = params.get("p"); 
        let mainFunc = (pic) => {
                    let myPic = pic;
                    let myFunc = function pcFunc($) {
                        viewer = $("#viewer1").iviewer({
                            src: myPic,
                            angle: "0"
                        });
                    }
                    jQuery(myFunc);
        }
        mainFunc(picSrc);
    </script>
    <script src="galleria/main2.js" type="module"></script>
</body>
</html>

