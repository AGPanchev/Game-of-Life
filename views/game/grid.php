<h1>Game Of Life</h1>

<?=$this->render('_form.php', [
    'model' => $model,
]);
?>

<div class="col-md-12">
    <div class="grid-header-holder">
        <div class="grid-generation-info">Current Generation: <span id="generation"></span></div>
        <input type="button" value="Next Generation" id="btnNext" class="btn btn-primary">
    </div>

    <div class="col-md-12 grid-holder">
        <canvas id="gameboard"></canvas>
    </div>

</div>



<?php

$gridForm = Yii::$app->request->post()['GridForm'];
$width = $gridForm['width'];
$height = $gridForm['height'];
$cells = $gridForm['cells'];

$js = <<< JS
    $(document).ready(function () {
        setParams($width, $height, $cells);
        seedGeneration();
        
        $("#btnNext").click(function(){
            nextGeneration();
    //		checkStatus();
            copyGrids();
            drawGeneration();
        });
    });
JS;
$this->registerJs($js, \yii\web\View::POS_READY, 'cells-generation');
?>