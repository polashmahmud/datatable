<?php

namespace App\Http\Controllers;

use App\Http\Resources\UserResource;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Spatie\QueryBuilder\QueryBuilder;

class UserIndexController extends Controller
{
    /**
     * Handle the incoming request.
     */
    public function __invoke(Request $request)
    {
        $users = UserResource::collection(
            QueryBuilder::for(User::class)
                ->paginate()
        );

        return Inertia::render("users/Index", [
            "users" => $users
        ]);
    }
}
