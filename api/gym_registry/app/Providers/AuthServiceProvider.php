<?php

namespace App\Providers;

use Illuminate\Support\Facades\Gate;
use Illuminate\Foundation\Support\Providers\AuthServiceProvider as ServiceProvider;
use App\Models\User;
use Illuminate\Support\Facades\Auth;


class AuthServiceProvider extends ServiceProvider
{
    /**
     * The model to policy mappings for the application.
     *
     * @var array<class-string, class-string>
     */
    protected $policies = [
        // 'App\Models\Model' => 'App\Policies\ModelPolicy',
    ];

    /**
     * Register any authentication / authorization services.
     *
     * @return void
     */
    public function boot()
    {
        $this->registerPolicies();

        Gate::define("delete-user",function(User $user){
            if($user->role===1){
                return true;
            }
        });

        Gate::define("create-user",function(User $user){
            if($user->role===1){
                return true;
            }
        });
        

        Gate::define("manage-discount",function(User $user){
            if($user->role===1){
                return true;
            }
        });

        Gate::define("index-discount",function(User $user){
            if($user->role===1){
                return true;
            }
        });

        Gate::define("manage-passtype",function(User $user){
            if($user->role===1){
                return true;
            }
        });

        Gate::define("manage-pass",function(User $user){
            if($user->role===1){
                return true;
            }
        });

        Gate::define("index-passes",function(User $user){
            if($user->role===1){
                return true;
            }
        });

        Gate::define("show-pass",function(User $user){
            if($user->role===1){
                return true;     
            }else{
                $user = Auth::user();
                return $user;
            }
        });

    }
}
