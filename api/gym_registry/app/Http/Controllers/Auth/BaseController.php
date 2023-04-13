<?php

namespace App\Http\Controllers\Auth;

use Illuminate\Http\Request;

class BaseController extends Controller
{
    public function sendResponse($result){
        $response = $result;

        return response()->json($response,200);
    }

    public function sendError($error, $errorMessage=[],$code=404){
        $response =[
            "success" => false,
            "message" => $error
        ];

        if (!empty($errorMessage)){
            $response["data"] = $errorMessage;
        }

        return response()->json($response,$code);
    }
}
