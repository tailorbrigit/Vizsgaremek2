<?php

namespace App\Http\Controllers\Gym;

use Illuminate\Http\Request;
use App\Http\Controllers\Auth\BaseController;
use App\Models\Pass;
use App\Models\User;
use Validator;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;


class PassController extends BaseController
{
    public function indexPass(){
        $passes = Pass::all();
        return $this->sendResponse($passes);
    }

    public function showPass($id){
        $pass = Pass::find($id);

        if(is_null($pass)){
            return $this->sendError("Bérlet nem létezik");
        }
        return $this->sendResponse($pass);
    }

    // public function showIdPass(User $user,$id){
    //     $this->authorize("show-pass");
        
    //     if(Auth::check() && Auth::user()->role == true){
    //         $user = User::find($id);
    //     }else{
    //         $user = Auth::user();
    //     }
    //     return $this->sendResponse($user);
    // }

    public function createPass(Request $request){
        $pass = $request->all();
        $validator = Validator::make($pass,[
            'start' => "required",
            'end' => "required",
            'typeId' => "required",
            'discountId' => "required",
            'userId' => "required"
        ]);
        if($validator->fails()){
            return $this->sendError($validator,"Érvénytelen bemenet");
        }

        $pass = Pass::create($pass);
        return $this->sendResponse($pass,"Bérlet hozzáadva");
    }

    public function updatePass(Request $request, $id){
        $pass= Auth::user();

        $pass = $request->all();
        $validator = Validator::make($pass,[
            'start' => "required",
            'end' => "required",
            'typeId' => "required",
            'discountId' => "required",
            'userId' => "required",
        ]);

        if($validator->fails()){
            return $this->sendError($validator->errors());
        }

        $pass = Pass::find($id);
        $pass->update($request->all());
        return $this->sendResponse($pass,"Bérlet frissítve");
    }

    public function deletePass($id){
        Pass::destroy($id);
        return $this->sendResponse("Bérlet törölve");
    }

}
