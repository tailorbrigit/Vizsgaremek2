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
            $table->date("start");
            $table->date("end");
            
            $table->unsignedBigInteger("typeId");
            $table->foreign("typeId")->references("id")->on("passtypes")->cascadeOnDelete()->cascadeOnUpdate();
            $table->unsignedBigInteger("discountId")->nullable();
            $table->foreign("discountId")->references("id")->on("discounts")->cascadeOnDelete()->cascadeOnUpdate();
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
