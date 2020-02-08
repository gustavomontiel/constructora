<?php

namespace App\Http\Controllers;

use App\Documento;
use App\Proveedor;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class DocumentoController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $documentos = Documento::all();

        if (count($documentos) == 0) {
            return response()->json(['error' => 'true', 'message' => 'No existen documentos cargados en el sistema.']);
        }

        return response()->json(['error' => 'false', 'data' => $documentos, 'message' => 'Documentos enviados correctamente.']);
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
            'tipo' => 'required|string|in:REMITO,FACTURA,RESUMEN',
            'numero' => 'required|string|max:50',
            'fecha' => 'required|date',
            'proveedor_id' => 'required|numeric|exists:proveedores,id',
        ]);

        if ($validator->fails()) {
            return response()->json(['error' => 'true', 'data' => $validator->errors(), 'message' => 'Error en la validación de datos.'], 400);
        }

        $documento = Documento::create($input);

        return response()->json(['error' => 'false', 'data' => $documento, 'message' => 'Documento creado correctamente.']);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $documento = Documento::where('id', $id)->with(['proveedor'])->first();

        if (is_null($documento)) {
            return response()->json(['error' => 'true', 'message' => 'Documento no encontrado.']);
        }

        return response()->json(['error' => 'false', 'data' => $documento, 'message' => 'Documento enviado correctamente.']);
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
        $documento = Documento::find($id);

        if (is_null($documento)) {
            return response()->json(['error' => 'true', 'message' => 'Documento no encontrado.']);
        }
        
        $input = $request->all();

        $validator = Validator::make($input, [
            'tipo' => 'required|string|in:REMITO,FACTURA,RESUMEN',
            'numero' => 'required|string|max:50',
            'fecha' => 'required|date',
            'proveedor_id' => 'required|numeric|exists:proveedores,id',
        ]);

        if ($validator->fails()) {
            return response()->json(['error' => 'true', 'data' => $validator->errors(), 'message' => 'Error en la validación de datos.'], 400);
        }

        if (isset($input['tipo'])) $documento->tipo = $input['tipo'];
        if (isset($input['numero'])) $documento->numero = $input['numero'];
        if (isset($input['fecha'])) $documento->fecha = $input['fecha'];
        if (isset($input['proveedor_id'])) $documento->proveedor_id = $input['proveedor_id'];

        $documento->save();

        return response()->json(['error' => 'false', 'data' => $documento, 'message' => 'Documento actualizado correctamente.']);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $documento = Documento::find($id);

        if (is_null($documento)) {
            return response()->json(['error' => 'true', 'message' => 'Documento no encontrado.']);
        }

        $documento->delete();

        return response()->json(['error' => 'false', 'message' => 'Documento eliminado correctamente.']);
    }

    /**
     * Display the resources by Proveedor.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function showByProveedor($idProveedor)
    {
        $proveedor = Proveedor::where('id', $idProveedor)->with(['documentos'])->first();

        if (is_null($proveedor)) {
            return response()->json(['error' => 'true', 'message' => 'Proveedor no encontrado.']);
        }

        return response()->json(['error' => 'false', 'data' => $proveedor->documentos, 'message' => 'Documentos enviados correctamente.']);
    }
}
