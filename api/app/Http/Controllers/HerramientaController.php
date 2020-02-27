<?php

namespace App\Http\Controllers;

use App\Herramienta;
use App\Http\Requests\CsvImportRequest;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class HerramientaController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $herramientas = Herramienta::all();

        if (count($herramientas) == 0) {
            return response()->json(['error' => 'true', 'message' => 'No existen herramientas cargadas en el sistema.']);
        }

        return response()->json(['error' => 'false', 'data' => $herramientas, 'message' => 'Herramientas enviadas correctamente.']);
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
            'codigo' => 'required|string|max:50|unique:herramientas,codigo',
            'nombre' => 'required|string|max:100',
            'descripcion' => 'string|max:255',
            'estado' => 'required|string|max:50',
            'observacion' => 'string|max:1000'
        ]);

        if ($validator->fails()) {
            return response()->json(['error' => 'true', 'data' => $validator->errors(), 'message' => 'Error en la validación de datos.'], 400);
        }

        $herramienta = Herramienta::create($input);

        return response()->json(['error' => 'false', 'data' => $herramienta, 'message' => 'Herramienta creada correctamente.']);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $herramienta = Herramienta::where('id', $id)->first();

        if (is_null($herramienta)) {
            return response()->json(['error' => 'true', 'message' => 'Herramienta no encontrada.']);
        }

        return response()->json(['error' => 'false', 'data' => $herramienta, 'message' => 'Herramienta enviada correctamente.']);
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
        $herramienta = Herramienta::where('id', $id)->first();

        if (is_null($herramienta)) {
            return response()->json(['error' => 'true', 'message' => 'Herramienta no encontrada.']);
        }

        $input = $request->all();

        $validator = Validator::make($input, [
            'codigo' => 'required|string|max:50|unique:herramientas,codigo,'.$id,
            'nombre' => 'required|string|max:100',
            'descripcion' => 'string|max:255',
            'estado' => 'required|string|max:50',
            'observacion' => 'string|max:1000'
        ]);

        if ($validator->fails()) {
            return response()->json(['error' => 'true', 'data' => $validator->errors(), 'message' => 'Error en la validación de datos.'], 400);
        }

        if (isset($input['codigo'])) $herramienta->codigo = $input['codigo'];
        if (isset($input['nombre'])) $herramienta->nombre = $input['nombre'];
        if (isset($input['descripcion'])) $herramienta->descripcion = $input['descripcion'];
        if (isset($input['estado'])) $herramienta->estado = $input['estado'];
        if (isset($input['observacion'])) $herramienta->observacion = $input['observacion'];

        $herramienta->save();

        return response()->json(['error' => 'false', 'data' => $herramienta, 'message' => 'Herramienta actualizada correctamente.']);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $herramienta = Herramienta::where('id', $id)->first();

        if (is_null($herramienta)) {
            return response()->json(['error' => 'true', 'message' => 'Herramienta no encontrada.']);
        }

        $herramienta->delete();

        return response()->json(['error' => 'false', 'message' => 'Herramienta eliminada correctamente.']);
    }

    /**
     * Importar herramientas
     *
     * @param  CsvImportRequest  $request
     * @return \Illuminate\Http\Response
     */
    public function importarHerramientas(CsvImportRequest $request)
    {
        $path = $request->file('csv_file')->getRealPath();
        $data = array_map(function ($v) {
            return str_getcsv($v, ";");
        }, file($path));
        $cabecera = $data[0];
        $datos = array_slice($data, 1);
        Herramienta::truncate();
        foreach ($datos as $row) { 
            $herramienta = new Herramienta();
            for ($i=0; $i < count($cabecera); $i++) { 
                $herramienta->{trim($cabecera[$i])} = utf8_encode(trim($row[$i]));
            }
            $herramienta->save();
        }
        return response()->json(['error' => 'false', 'message' => 'Herramientas importadas correctamente.']);
    }
}
