<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('passes', function (Blueprint $table) {
            $table->id();
            $table->date("start")->nullable();
            $table->date("end")->nullable();
            
            $table->unsignedBigInteger("typeId")->nullable();
            $table->foreign("typeId")->references("id")->on("passtypes")->cascadeOnDelete()->cascadeOnUpdate();

            $table->unsignedBigInteger("discountId")->nullable();
            $table->foreign("discountId")->references("id")->on("discounts")->cascadeOnDelete()->cascadeOnUpdate();
            
            $table->unsignedBigInteger("userId")->nullable();
            $table->foreign("userId")->references("id")->on("users")->cascadeOnDelete()->cascadeOnUpdate();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('passes');
    }
};
