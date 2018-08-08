<?php
/**
 * Created by PhpStorm.
 * User: Antonio
 * Date: 03-Aug-18
 * Time: 11:04
 */

namespace app\models;

use Yii;
use yii\base\Model;

class GridForm extends Model
{
    public $width;
    public $height;
    public $cells;

    public function rules()
    {
        return [
            ['width', 'required'],
            ['width', 'trim'],
            ['width', 'default', 'value' => 1],
            ['width', 'integer', 'min' => 1],
            ['width', 'integer', 'max' => 100],
            ['width', 'filter', 'filter' => 'intval', 'skipOnEmpty' => true],

            ['height', 'required'],
            ['height', 'trim'],
            ['height', 'default', 'value' => 1],
            ['height', 'integer', 'min' => 1],
            ['height', 'integer', 'max' => 100],
            ['height', 'filter', 'filter' => 'intval', 'skipOnEmpty' => true],

            ['cells', 'required'],
            ['cells', 'trim'],
            ['cells', 'default', 'value' => 1],
            ['cells', 'integer', 'min' => 1],
            ['cells', 'integer', 'max' => 10000],
            ['cells', 'filter', 'filter' => 'intval', 'skipOnEmpty' => true],
        ];
    }

    public function beforeValidate()
    {
        $maxCells = $this->width * $this->height;
        if($this->cells > $maxCells){
            $this->addError('cells', 'Cells must be no greater than '.$maxCells);
            return false;
        }
        return parent::beforeValidate();
    }
}