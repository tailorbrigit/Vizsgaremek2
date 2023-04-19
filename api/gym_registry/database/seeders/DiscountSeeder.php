<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class DiscountSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('discounts')->insert([
            [
                "discount_type" => "Normál",
                "percent" => "0"
            ],
            [
                "discount_type" => "Diák",
                "percent" => "50"
            ],
            [
                "discount_type" => "Fogyatékkal élő",
                "percent" => "90"
            ],
        ]);
    }
}
