<?php

namespace App\Http\Controllers;

use App\Http\Resources\UserResource;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;
use Spatie\QueryBuilder\QueryBuilder;

class UserIndexController extends Controller
{
    /**
     * Handle the incoming request.
     */
    public function __invoke(Request $request)
    {
        $perPage = $request->get('per_page', 15); // Default 15 rows per page

        $users = QueryBuilder::for(User::class)
            ->paginate($perPage)
            ->appends($request->query()); // Preserve query parameters

        return Inertia::render("users/Index", [
            "users" => UserResource::collection($users)->response()->getData()
        ]);
    }
}
