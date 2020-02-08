<?php

namespace App\Http\Controllers;

use App\Material;
use Illuminate\Http\Request;
use Validator;

class MaterialController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $materiales = Material::all();

        if (count($materiales) == 0) {
            return response()->json(['error' => 'true', 'message' => 'No existen materiales cargados en el sistema.']);
        }

        return response()->json(['error' => 'false', 'data' => $materiales, 'message' => 'Materiales enviados correctamente.']);
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
            'codigo' => 'required|string|max:50|unique:materiales,codigo',
            'descripcion' => 'required|string|max:255',
            'unidad' => 'string|max:10',
            'rubro' => 'string|max:100',
            'grupo' => 'string|max:100',
        ]);

        if ($validator->fails()) {
            return response()->json(['error' => 'true', 'data' => $validator->errors(), 'message' => 'Error en la validación de datos.'], 400);
        }

        $material = Material::create($input);

        return response()->json(['error' => 'false', 'data' => $material, 'message' => 'Material creado correctamente.']);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $material = Material::where('id', $id)->first();

        if (is_null($material)) {
            return response()->json(['error' => 'true', 'message' => 'Material no encontrado.']);
        }

        return response()->json(['error' => 'false', 'data' => $material, 'message' => 'Material enviado correctamente.']);
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
        $material = Material::find($id);

        if (is_null($material)) {
            return response()->json(['error' => 'true', 'message' => 'Material no encontrado.']);
        }
        
        $input = $request->all();

        $validator = Validator::make($input, [
            'codigo' => 'string|max:50|unique:materiales,codigo,'.$id,
            'descripcion' => 'string|max:255',
            'unidad' => 'string|max:10',
            'rubro' => 'string|max:100',
            'grupo' => 'string|max:100',
        ]);

        if ($validator->fails()) {
            return response()->json(['error' => 'true', 'data' => $validator->errors(), 'message' => 'Error en la validación de datos.'], 400);
        }

        if (isset($input['codigo'])) $material->codigo = $input['codigo'];
        if (isset($input['descripcion'])) $material->descripcion = $input['descripcion'];
        if (isset($input['unidad'])) $material->unidad = $input['unidad'];
        if (isset($input['rubro'])) $material->rubro = $input['rubro'];
        if (isset($input['grupo'])) $material->grupo = $input['grupo'];

        $material->save();

        return response()->json(['error' => 'false', 'data' => $material, 'message' => 'Material actualizado correctamente.']);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $material = Material::find($id);

        if (is_null($material)) {
            return response()->json(['error' => 'true', 'message' => 'Material no encontrado.']);
        }

        $material->delete();

        return response()->json(['error' => 'false', 'message' => 'Material eliminado correctamente.']);
    }
}
