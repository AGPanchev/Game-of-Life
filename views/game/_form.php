<?php
use yii\helpers\Html;
use yii\widgets\ActiveForm;
?>

<div class="col-md-12">
    <?php $form = ActiveForm::begin(); ?>

        <div class="col-md-3">
            <?= $form->field($model, 'width')->label('Grid Width')->textInput(['type' => 'number']); ?>
        </div>
        <div class="col-md-3">
            <?= $form->field($model, 'height')->label('Grid Height')->textInput(['type' => 'number']); ?>
        </div>
        <div class="col-md-3">
            <?= $form->field($model, 'cells')->label('Number of live cells')->textInput(['type' => 'number']); ?>
        </div>

        <div class="col-md-3 generate-grid-holder">
            <div class="form-group generate-grid-button">
                <?= Html::submitButton('Generate Grid', ['class' => 'btn btn-primary']) ?>
            </div>
        </div>

    <?php ActiveForm::end(); ?>
</div>
