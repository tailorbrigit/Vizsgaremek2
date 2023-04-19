<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Database\Seeders\CityRegionSeeder;
use Database\Seeders\RegionSeeder;
use Database\Seeders\AdminSeeder;
use Database\Seeders\PasstypeSeeder;
use Database\Seeders\DiscountSeeder;
use App\Models\CityRegion;
use App\Models\Region;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {

        Schema::disableForeignKeyConstraints();
            DB::table("regions")->truncate();
            DB::table("city_regions")->truncate();
            DB::table("users")->truncate();
            DB::table("passtypes")->truncate();
            DB::table("discounts")->truncate();
        Schema::enableForeignKeyConstraints();

        $this->call([
            RegionSeeder::class,
            CityRegionSeeder::class,
            AdminSeeder::class,
            PasstypeSeeder::class,
            DiscountSeeder::class
        ]);

    }
}
