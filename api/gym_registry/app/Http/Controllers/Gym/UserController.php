<?php

namespace App\Http\Controllers\Gym;

use Illuminate\Http\Request;
use App\Http\Controllers\Auth\BaseController;
use Validator;
use App\Models\User;
use App\Http\Resources\User as UserResource;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Auth;

class UserController extends BaseController
{
    public function index(){
        $users = User::all();

        return $this->sendResponse(UserResource::collection($users), "OK");
    }

    public function addAdmin(Request $request){
        $this->authorize("create-user");
        
        $user = User::forceCreate([
            'name'=> $request->input("name"), 
            'email'=> $request->input("email"), 
            'password'=> bcrypt($request->input("password")),
            'role'=> 1
        ]);

        return $this->sendResponse($user,"Felhasználó hozzáadva");
    }

    public function show($id){
        $user = User::find($id);

        if(is_null($user)){
            return $this->sendError("Felhasználó nem létezik");
        }
        return $this->sendResponse(new UserResource($user),"Felhasználó betöltve");
    }

    public function update(Request $request,$id){
        $user = Auth::user();

        $input = $request->all();
        $validator = Validator::make($input,[
            "name" => "required",
            "phone" => "required",
            "birth" => "required",
            "address" => "required"
        ]);

        if($validator->fails()){
            return $this->sendError($validator->errors());
        }

        if(Auth::check()){
            $input = User::find($id);
        }

        $input->update($request->all());

        return $this->sendResponse(new UserResource($user),"Profil frissítve");
    }

    public function destroy(User $user, $id){
        $this->authorize("delete-users");
        $user = User::find($id);
        if(is_null($user)){
            return $this->sendError("Felhasználó nem létezik");
        }

        $user->destroy($id);
        
        return $this->sendResponse("Felhasználó törölve");
    
    }
}
