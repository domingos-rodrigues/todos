<?php

namespace Todos\Application\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\User;
use Todos\Domain\Models\Project;

class DashboardController extends Controller
{
    public function index(Request $request){
//        dd($request->id);
        $id = auth()->user()->id;

        $dashboard = User::where('id', $id)
            ->with('projects')
            ->get(['id', 'name', 'email', 'created_at']);

        return response()->json([
            'user' => $dashboard,
        ]);

    }
}
