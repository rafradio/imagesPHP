<!DOCTYPE html lang="ru">
<head>
    <meta charset="UTF-8">
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Pictures</title>
    <link href="galleria/img_tool/style.css" rel="stylesheet" type="text/css">
    <link rel="stylesheet" href="galleria/img_tool/jquery.iviewer.css" />
    <script type="text/javascript" src="galleria/img_tool/jquery.js" ></script>
    <script type="text/javascript" src="galleria/img_tool/jqueryui.js" ></script>
    <script type="text/javascript" src="galleria/img_tool/jquery.mousewheel.min.js" ></script>
    <script type="text/javascript" src="galleria/img_tool/jquery.iviewer.js" ></script>
    <style>
        
    </style>
</head>
<body>
    <div id="myModal" class="myModal">
            <div class="modal-content-vis" id="viewer1"></div>
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
        console.log(picSrc);
    </script>
</body>
</html>

