<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Custom extends CI_Controller {

    public function login(){
        return $this->json([
            'code' => 200,
            'msg' => '过了',
            'url' => 'login'
        ]);
    }
    
    public function EventsRiskTrend()
    {
        $dateType = $_GET['type'];
        $returnArr = [];
        $sequence = [];
        switch ($dateType) {
            case 1:
                $rand = 29;
                break;
            case 2:
                $rand = 5;
                break;
            case 3:
                $rand = 11;
                break;
        }
        for ($i = $rand; $i >= 0; $i--) {
            switch ($dateType) {
                case 1:
                    $date = date('d', strtotime("-$i day"));
                    break;
                case 2:
                    $date = date('Y-m', strtotime("-$i month"));
                    break;
                case 3:
                    $date = date('Y-m', strtotime("-$i month"));
                    break;
            }
            $sequence[] = [
                'date' => $date,
                'count' => strval(rand(0, 1000))
            ];
        }
        $returnArr['data'] = [
            'sequence' => $sequence
        ];
        return $this->json($returnArr);
    }
    
    public function EventsInfoNews()
    {
        $nameArr =[
            '大帅哥',
            '骚猪',
            'PHP',
            '小红帽',
            '大灰狼',
            '喜羊羊'
        ];
        $logArr = [
            '在洗厕所',
            '在打代码',
            '完成了自杀',
            '开车超速200%',
            '好好学习'
        ];
        for ($i = 0; $i < 10; $i++) {
            $rand = rand(0,5);
            $rows[] = array(
                'username' => $nameArr[rand(0,5)],
                'log' => $logArr[rand(0,4)],
                'occurtime' => date('Y-m-d H:i:s',strtotime("-$rand day"))
            );
        }
        $returnArr['data'] = $rows;
        return $this->json($returnArr);
    }

}
