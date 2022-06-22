<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;

use App\Models\User;
use Illuminate\Http\Request;
use App\Http\Requests\Auth\RegisterRequest;
use App\Http\Requests\Auth\LoginRequest;
use voku\helper\ASCII;

/**
 *
 * @group Auth Management
 */
class AuthController extends Controller
{
    /**
     * RegisterComponent one user.
     *
     * This endpoint lets you create a user.
     * @authenticated
     *
     * @param RegisterRequest $request
     * @return string
     */
    public function register(RegisterRequest $request): string
    {
        $user = User::create($request->validated());
        $authToken = $user->createToken('auth-token')->plainTextToken;
        $code = 200;
        return json_encode([
            'status' => $code,
            'data' => [
                'payload' => $user
            ],
            'access_token' => $authToken
        ]);
    }

    /**
     * LoginComponent user.
     *
     * This endpoint lets you login a user.
     * @authenticated
     *
     * @param LoginRequest $request
     * @return string
     */
    public function login(LoginRequest $request): string
    {
//        dd($request);
//        if (!auth()->attempt($request->validated())){
//            return response()->json([
//                'message' => 'The data given was not valid',
//                'errors' => [
//                    'password' => 'Invalid credentials',
//                    'email' => $request,
//                ],
//            ], status: 422);
//        }

        $user = User::where('email', $request->email)->firstOrFail();
        $authToken = $user->createToken('auth-token')->plainTextToken;

        return response()->json([
            'data' => [
            'access_token' => $authToken,
            'token_type' => 'Bearer'
            ],
            'user' => [
                'userId' => $user->id,
                'userName' => $user->name,
                'userEmail' => $user->email,
            ]
        ], status: 200);
    }

    /**
     *
     * @param Request $request
     * @return string
     */
    public function logout(Request $request): string
    {
//        auth()->guard('api')->logout();
        auth()->user()->token()->revoke();
        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return response()->json(null, 200);
    }
    /**
     * Display a listing of the resource.
     *
     * Gets a list of users.
     * @queryParam ppp int ppp per nlnn
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }
}
