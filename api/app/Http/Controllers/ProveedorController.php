<?php

namespace App\Http\Controllers;

use App\Proveedor;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class ProveedorController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $proveedores = Proveedor::all();

        if (count($proveedores) == 0) {
            return response()->json(['error' => 'true', 'message' => 'No existen proveedores cargados en el sistema.']);
        }

        return response()->json(['error' => 'false', 'data' => $proveedores, 'message' => 'Proveedores enviados correctamente.']);
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
            'cuit' => 'required|numeric|unique:proveedores,cuit',
            'nombre' => 'required|string|max:255',
            'telefono' => 'string|max:255',
            'cuenta_corriente' => 'boolean',
        ]);

        if ($validator->fails()) {
            return response()->json(['error' => 'true', 'data' => $validator->errors(), 'message' => 'Error en la validación de datos.'], 400);
        }

        $proveedor = Proveedor::create($input);

        if (isset($input['direccion'])) $proveedor->direccion()->create($input['direccion']);

        return response()->json(['error' => 'false', 'data' => $proveedor, 'message' => 'Proveedor creado correctamente.']);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $proveedor = Proveedor::where('id', $id)->with(['direccion'])->first();

        if (is_null($proveedor)) {
            return response()->json(['error' => 'true', 'message' => 'Proveedor no encontrado.']);
        }

        return response()->json(['error' => 'false', 'data' => $proveedor, 'message' => 'Proveedor enviado correctamente.']);
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
        $proveedor = Proveedor::find($id);

        if (is_null($proveedor)) {
            return response()->json(['error' => 'true', 'message' => 'Proveedor no encontrado.']);
        }

        $input = $request->all();

        $validator = Validator::make($input, [
            'cuit' => 'numeric|unique:proveedores,cuit,' . $id,
            'nombre' => 'string|max:255',
            'telefono' => 'string|max:255',
            'cuenta_corriente' => 'boolean',
        ]);

        if ($validator->fails()) {
            return response()->json(['error' => 'true', 'data' => $validator->errors(), 'message' => 'Error en la validación de datos.'], 400);
        }

        if (isset($input['cuit'])) $proveedor->cuit = $input['cuit'];
        if (isset($input['nombre'])) $proveedor->nombre = $input['nombre'];
        if (isset($input['telefono'])) $proveedor->telefono = $input['telefono'];
        if (isset($input['cuenta_corriente'])) $proveedor->cuenta_corriente = $input['cuenta_corriente'];
        if (isset($input['direccion'])) $proveedor->direccion->update($input['direccion']);

        $proveedor->save();

        return response()->json(['error' => 'false', 'data' => $proveedor, 'message' => 'Proveedor actualizado correctamente.']);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $proveedor = Proveedor::find($id);

        if (is_null($proveedor)) {
            return response()->json(['error' => 'true', 'message' => 'Proveedor no encontrado.']);
        }

        if (isset($proveedor->direccion)) $proveedor->direccion->delete();

        $proveedor->delete();

        return response()->json(['error' => 'false', 'message' => 'Proveedor eliminado correctamente.']);
    }
}
