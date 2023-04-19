<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class PasstypeSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('passtypes')->insert([
            [
                "type" => "Napi",
                "price" => "1000",
                "days" => "1"
            ],
            [
                "type" => "Heti",
                "price" => "5000",
                "days" => "7"
            ],
            [
                "type" => "Fél havi",
                "price" => "8000",
                "days" => "15"
            ],
            [
                "type" => "Havi",
                "price" => "12000",
                "days" => "30"
            ],
            [
                "type" => "Negyed éves",
                "price" => "20000",
                "days" => "92"
            ],
            [
                "type" => "Fél éves",
                "price" => "30000",
                "days" => "182"
            ],
            [
                "type" => "Éves",
                "price" => "50000",
                "days" => "365"
            ],
        
        ]);
    }
}
