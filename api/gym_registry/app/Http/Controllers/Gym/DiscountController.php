<?php

namespace App\Http\Controllers\Gym;

use Illuminate\Http\Request;
use App\Http\Controllers\Auth\BaseController;
use App\Models\Discount;
use Validator;

class DiscountController extends BaseController
{
    public function indexDiscount(){
        $this->authorize("manage-discount");
        $discounts = Discount::all();
        return $this->sendResponse($discounts);
    }

    public function createDiscount(Request $request){
        $this->authorize("manage-discount");
        $discount = $request->all();
        $validator = Validator::make($discount,[
            'discount_type'=> "required",
            'discount(%)'=> "required",
        ]);
        if($validator->fails()){
            return $this->sendError($validator,"Érvénytelen bemenet");
        }

        $discount = Discount::create($discount);
        return $this->sendResponse($discount,"Kedvezmény hozzáadva");
    }

    public function updateDiscount(Request $request, $id){
        $this->authorize("manage-discount");
        $discount = $request->all();
        $validator = Validator::make($discount,[
            'discount(%)'=> "required",
        ]);

        if($validator->fails()){
            return $this->sendError($validator->errors());
        }

        $discount = Discount::find($id);
        $discount->update($request->all());
        return $this->sendResponse($discount,"Kedvezmény frissítve");
    }

    public function deleteDiscount($id){
        $this->authorize("manage-discount");
        Discount::destroy($id);
        return $this->sendResponse("Kedvezmény törölve");
    }
}
