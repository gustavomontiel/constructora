<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Validator;
use App\User;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $users = User::all();
        return response()->json(['error' => 'false', 'data' => $users, 'message' => 'Usuarios enviados correctamente.']);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $input = $request->all();
        
        $validator = Validator::make($input, [
            'email' => 'required|email|unique:users,email',
            'password' => 'required',
            'name' => 'string',
            'username' => 'required|unique:users,username'
        ]);

        if ($validator->fails()) {
            return response()->json(['error' => 'true', 'data' => $validator->errors(), 'message' => 'Error en la validación de datos.'], 400);
        }

        $input['password'] = Hash::make($input['password']);
        $input['verified'] = 1;
        $user = User::create($input);

        return response()->json(['error' => 'false', 'data' => $user, 'message' => 'Usuario creado correctamente.']);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $user = User::where('id', $id)->first();

        if (is_null($user)) {
            return response()->json(['error' => 'true', 'message' => 'Usuario no encontrado.']);
        }

        return response()->json(['error' => 'false', 'data' => $user, 'message' => 'Usuario enviado correctamente.']);
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
        $input = $request->all();
        $user = User::find($id);

        if (is_null($user)) {
            return response()->json(['error' => 'true', 'message' => 'Usuario no encontrado.'], 404);
        }

        $validator = Validator::make($input, [
            'email' => 'required|email|unique:users,email,' . $user->id,
            'name' => 'string',
            'username' => 'required|unique:users,username,' . $user->id
        ]);

        if ($validator->fails()) {
            return response()->json(['error' => 'true', 'data' => $validator->errors(), 'message' => 'Error en la validación de datos.'], 400);
        }

        $user->email = $input['email'];
        $user->name = $input['name'];
        $user->username = $input['username'];

        $user->save();

        return response()->json(['error' => 'false', 'data' => $user, 'message' => 'Usuario actualizado correctamente.']);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $user = User::find($id);

        if (is_null($user)) {
            return response()->json(['error' => 'true', 'message' => 'Usuario no encontrado.'], 404);
        }

        $user->delete();

        return response()->json(['error' => 'false', 'message' => 'Usuario eliminado correctamente.']);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function actualizarPasswordById(Request $request, $id)
    {
        $input = $request->all();
        $user = User::find($id);

        if (is_null($user)) {
            return response()->json(['error' => 'true', 'message' => 'Usuario no encontrado.'], 404);
        }

        $validator = Validator::make($input, [
            'password_nuevo' => 'required',
        ]);

        if ($validator->fails()) {
            return response()->json(['error' => 'true', 'data' => $validator->errors(), 'message' => 'Error en la validación de datos.'], 400);
        }

        $user->password = Hash::make($input['password_nuevo']);
        $user->save();

        return response()->json(['error' => 'false', 'message' => 'Contraseña actualizada correctamente.']);
    }
}
