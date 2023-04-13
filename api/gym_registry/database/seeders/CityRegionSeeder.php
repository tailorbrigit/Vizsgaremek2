<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\CityRegion;
use App\Models\Region;
use File;

class CityRegionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {   
        $json = File::get('database/data/cityregion.json');
        $cityregions = json_decode($json);
        
        foreach ($cityregions as $cityregion){
            CityRegion::create([
                "city" => $cityregion->city,
                "regionId" => $cityregion->regionId
            ]);
        }
    }
} 