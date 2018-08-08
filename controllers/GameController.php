<?php

namespace app\controllers;

use Yii;
use yii\web\Controller;
use app\models\GridForm;

class GameController extends \yii\web\Controller
{
    public function actionIndex()
    {
        $model = new GridForm();

        if ($model->load(Yii::$app->request->post()) && $model->validate()) {
            // valid data received in $model

            // do something meaningful here about $model ...

            return $this->render('grid', ['model' => $model]);
        } else {
            // either the page is initially displayed or there is some validation error
            return $this->render('index', ['model' => $model]);
        }
    }

}
