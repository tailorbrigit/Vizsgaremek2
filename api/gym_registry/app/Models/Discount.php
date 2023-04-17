<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Discount extends Model
{
    use HasFactory;
    
    protected $fillable = [
        'discount_type',
        'percent'
    ];

    public $timestamps = false;
}
