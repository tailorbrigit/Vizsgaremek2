<?php

namespace App\Http\Controllers\Gym;

use Illuminate\Http\Request;
use App\Http\Controllers\Auth\BaseController;
use App\Models\Passtype;
use Validator;

class PasstypeController extends BaseController
{
    public function indexPassType(){  
        $passtype = Passtype::all();
        return $this->sendResponse($passtype);
    }

    public function createPassType(Request $request){
        $passtype = $request->all();
        $validator = Validator::make($passtype,[
            "type" => "required",
            "price" => "required"
        ]);

        if($validator->fails()){
            return $this->sendError($validator,"Érvénytelen bemenet");
        }

        $passtype = Passtype::create($passtype);

        return $this->sendResponse($passtype,"Típus hozzáadva");
    }

    public function updatePassType(Request $request,$id){
        $type = $request->all();
        $validator = Validator::make($type,[
            "price" => "required"
        ]);

        if($validator->fails()){
            return $this->sendError($validator->errors());
        }

        $passtype = Passtype::find ($id);
        $passtype->update($request->all());
        return $this->sendResponse($passtype,"Típus sikeresen frissítve");
    }

    public function deletePassType($id){
        Passtype::destroy($id);
        return $this->sendResponse("Típus törölve");
    }
}
