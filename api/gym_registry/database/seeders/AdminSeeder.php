<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\User;

class AdminSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        User::create([
        'name'=>'admin', 
        'email'=>'admin@admin.com', 
        'email_verified_at'=> now(),    
        'password'=> bcrypt('admin'),
        'role' => 1
        ]);
    }
}
