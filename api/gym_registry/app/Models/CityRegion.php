<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CityRegion extends Model
{
    use HasFactory;
    
    protected $fillable = [
        'city',
        'regionId',
    ];

    public $timestamps = false;

    public function users(){
        return $this->belongsToMany(User::class);
    }

    public function regions(){
        return $this->belongsTo(Region::class);
    }
}
