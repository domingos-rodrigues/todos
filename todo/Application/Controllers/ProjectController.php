<?php

namespace Todos\Application\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Todos\Application\Requests\ProjectRequest;
use Todos\Application\Requests\TodoRequest;
use Todos\Domain\Models\Project;

/**
 *
 * @group Project Management
 */
class ProjectController extends Controller
{
    /**
     * Display a listing of the Projects.
     *
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function index(Request $request)
    {
        $user_id = auth()->user()->id;
        $projects = Project::where('user_id', $user_id)
            ->with('todos')
            ->get(['id', 'name', 'email', 'created_at']);

        return response()->json([
            'userId' => $user_id,
            'projects' => $projects,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @param ProjectRequest $request
     * @return array
     */
    public function create(ProjectRequest $request) : array
    {
        $project = Project::create($request->validated());

        return $project;
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param ProjectRequest $request
     * @param int $user_id
     * @return \Illuminate\Http\JsonResponse
     */
    public function store(ProjectRequest $request, int $user_id)
    {
        if(
            !( (int)$user_id === auth()->user()->id )
        ){
            return response()->json([
                'message' => 'The data given was not valid. Must submit the same user_id that you are using.',
                'Submitted user_id' => $user_id,
            ], status: 422);
        }

        $project = Project::firstOrCreate(
            ['project_name'=> $request->projectName, 'user_id'=> auth()->user()->id]);

        return $project->toJson();
    }

    /**
     * Display the specified resource.
     *
     * @param  \Todos\Domain\Models\Project $project
     * @return \Illuminate\Http\Response
     */
    public function show(Project $project)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \Todos\Domain\Models\Project $project
     * @return \Illuminate\Http\Response
     */
    public function edit(Project $project)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param ProjectRequest $request
     * @param \Todos\Domain\Models\Project $project
     * @return \Illuminate\Http\Response
     */
    public function update(ProjectRequest $request, Project $project)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \Todos\Domain\Models\Project $project
     * @return \Illuminate\Http\Response
     */
    public function destroy(Project $project)
    {
        //
    }
}
