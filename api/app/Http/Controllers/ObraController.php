<?php

namespace App\Http\Controllers;

use App\Obra;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class ObraController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $obras = Obra::all();

        if (count($obras) == 0) {
            return response()->json(['error' => 'true', 'message' => 'No existen obras cargadas en el sistema.']);
        }

        return response()->json(['error' => 'false', 'data' => $obras, 'message' => 'Obras enviadas correctamente.']);
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
            'nombre' => 'required|string|max:100|unique:obras,nombre',
            'descripcion' => 'string|max:1000',
        ]);

        if ($validator->fails()) {
            return response()->json(['error' => 'true', 'data' => $validator->errors(), 'message' => 'Error en la validación de datos.'], 400);
        }

        // $direccion = new Direccion($input['direccion']);
        // unset($input['direccion']);

        $obra = Obra::create($input);

        if (isset($input['direccion'])) $obra->direccion()->create($input['direccion']);

        return response()->json(['error' => 'false', 'data' => $obra, 'message' => 'Obra creada correctamente.']);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $obra = Obra::where('id', $id)->with(['direccion'])->first();

        if (is_null($obra)) {
            return response()->json(['error' => 'true', 'message' => 'Obra no encontrada.']);
        }

        return response()->json(['error' => 'false', 'data' => $obra, 'message' => 'Obra enviada correctamente.']);
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
        $obra = Obra::find($id);

        if (is_null($obra)) {
            return response()->json(['error' => 'true', 'message' => 'Obra no encontrada.']);
        }
        
        $input = $request->all();

        $validator = Validator::make($input, [
            'nombre' => 'string|max:100|unique:obras,nombre,'.$id,
            'descripcion' => 'string|max:1000',
        ]);

        if ($validator->fails()) {
            return response()->json(['error' => 'true', 'data' => $validator->errors(), 'message' => 'Error en la validación de datos.'], 400);
        }

        if (isset($input['nombre'])) $obra->nombre = $input['nombre'];
        if (isset($input['descripcion'])) $obra->descripcion = $input['descripcion'];
        if (isset($input['direccion'])) $obra->direccion->update($input['direccion']);

        $obra->save();

        return response()->json(['error' => 'false', 'data' => $obra, 'message' => 'Obra actualizada correctamente.']);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $obra = Obra::find($id);

        if (is_null($obra)) {
            return response()->json(['error' => 'true', 'message' => 'Obra no encontrada.']);
        }

        if (isset($obra->direccion)) $obra->direccion->delete();

        $obra->delete();

        return response()->json(['error' => 'false', 'message' => 'Obra eliminada correctamente.']);
    }
}
