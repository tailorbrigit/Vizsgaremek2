<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Auth\BaseController as BaseController;
use Illuminate\Support\Facades\Auth;
use Validator;
use App\Models\User;
use Illuminate\Http\Request;


class AuthController extends BaseController
{
    public function register(Request $request){
        $validator = Validator::make($request->all(),[
            "name" => "required",
            "email" => "required",
            "password" => "required",
            "confirm_password" => "required|same:password"
        ]);

        if($validator->fails()){
            return sendError("Error validation", $validator->errors());
        }

        $input = $request->all();
        $input["password"] = bcrypt($input["password"]);
        $user = User::create($input);
        $success["name"] = $user->name;

        return $this->sendResponse($success, "Sikeres regisztráció");
    }

    public function signIn(Request $request){
        if(Auth::attempt(["email"=>$request->email,"password"=>$request->password])){
            $authUser = Auth::user();
            $success["id"] = $authUser->id;
            $success["name"] = $authUser->name;
            $success["email"] = $authUser->email;
            $success["role"] = $authUser->role;

            if($authUser->role == 1){
                $success["token"] = $authUser->createToken("MyAuthApp",['admin'])->plainTextToken;
            }else{
                $success["token"] = $authUser->createToken("MyAuthApp",['user'])->plainTextToken;
            }

            return $this->sendResponse($success, "Sikeres bejelentkezés");
        }else{
            return $this->sendError("Unauthorized.".["error"=> "Hibás adatok"]);
        }
    }

    public function signOut(Request $request){
        auth("sanctum")->user()->currentAccessToken()->delete();

        return response()->json("Sikeres kijelentkezés");
    }
}
