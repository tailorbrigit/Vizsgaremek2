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
        Schema::create('users', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string("phone")->nullable();
            $table->date("birth")->nullable();
            $table->string("address")->nullable();
            $table->string('email')->unique();
            $table->timestamp('email_verified_at')->nullable();
            $table->string('password');
            
            $table->boolean("role")->default(0);
            
            $table->unsignedBigInteger("passId")->nullable();
            $table->foreign("passId")->references("id")->on("passes")->cascadeOnDelete()->cascadeOnUpdate();

            $table->unsignedBigInteger("city_regionId")->nullable();
            $table->foreign("city_regionId")->references("id")->on("city_regions")->cascadeOnDelete()->cascadeOnUpdate();
            
            $table->rememberToken();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('users');
    }
};
