<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Region;
use File;

class RegionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $json = File::get('database/data/region.json');
        $regions = json_decode($json);
        
        foreach ($regions as $region){
            Region::create([
                "region" => $region->region
            ]);
        }
    }
}
