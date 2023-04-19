<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class AdminSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('users')->insert([
            [
                'name'=>'admin', 
                'email'=>'admin@admin.com', 
                'email_verified_at'=> now(),    
                'password'=> bcrypt('admin'),
                'role' => 1
            ],
            [
                'name'=>'user', 
                'email'=>'user@user.com', 
                'email_verified_at'=> now(),    
                'password'=> bcrypt('user'),
                'role' => 0
            ], 
        ]);
    }
}
