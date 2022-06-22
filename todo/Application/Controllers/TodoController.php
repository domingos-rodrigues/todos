<?php

namespace Todos\Application\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Project;
use Database\Factories\TodoFactory;
use http\Env\Response;
use Todos\Application\Requests\TodoRequest;
use Todos\Domain\Models\Todo;
use Illuminate\Http\Request;
use Inertia\Inertia;
use function Symfony\Component\Translation\t;

class TodoController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return string
     */
    public function index(int $id = null)
    {

//        $todos = Todo::all();
//        return $todos->toJson();
        $user_id = auth()->user()->id;

        $todos = Project::where('id', $id)
            ->with('todos')
            ->get();

        return response()->json([
            'userId' => $user_id,
            'todos' => $todos[0]['todos'],
        ]);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create(TodoRequest $request) : array
    {
        //
        return (array)$request;
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param TodoRequest $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function store(TodoRequest $request)
    {
        if( Project::find($request->project_id)->user_id !== auth()->user()->id ){
            return response()->json([
                'message' => "Can't add task. You dont have rights.",
                'status' => 400]
            );
        }
        $todo = Todo::create(
            ['todo_name' => $request->todo_name, 'description' => '', 'project_id' => $request->project_id]
        );

        return $todo->toJson();
    }

    /**
     * Display the specified resource.
     *
     * @param  \Todos\Domain\Models\Todo $todo
     * @return \Illuminate\Http\Response
     */
    public function show(Todo $todo)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \Todos\Domain\Models\Todo $todo
     * @return \Illuminate\Http\Response
     */
    public function edit(Todo $todo)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Todos\Domain\Models\Todo $todo
     * @return \Illuminate\Http\Response
     */
    public function update(TodoRequest $request, Todo $todo)
    {
        //

    }

    /**
     * @param int $id
     * @return string
     */
    public function endTask(int $id)
    {
        $endTask = Todo::find($id);

        if(!$endTask || $endTask->project->user_id !== auth()->user()->id) {
            return response()->json([
                'message' => "Can't do that to the task you provide.",
                'status' => 200,
            ]);
        }

        if ($endTask->conclusion_at){
            return response()->json([
                'message' => "This task has already been concluded.",
                'status' => 200,
            ]);
        }

        $endTask->conclusion_at = now();
        $endTask->save();
        return response()->json([
            'message' => "Task has been concluded at ".now(),
            'status' => 200,
        ]);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \Todos\Domain\Models\Todo $todo
     * @return string
     */
    public function destroy(int $id)
    {
        $softDelete = Todo::find($id);

        if(!$softDelete || $softDelete->project->user_id !== auth()->user()->id) {
            return response()->json([
                'message' => "Can't do that to the task number you provided.",
                'status' => 230,
            ]);
        }

        if ($softDelete->conclusion_at){
            return response()->json([
                'message' => "This task has already been concluded. No action taken.",
                'status' => 231,
            ]);
        }

        Todo::where('id', $id)->delete();
        return response()->json([
            'message' => "Task has been removed from the database",
            'status' => 200,
        ]);
    }
}
