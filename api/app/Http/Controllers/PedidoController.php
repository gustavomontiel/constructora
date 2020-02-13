<?php

namespace App\Http\Controllers;

use App\Pedido;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;

class PedidoController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $pedidos = Pedido::all();

        if (count($pedidos) == 0) {
            return response()->json(['error' => 'true', 'message' => 'No existen pedidos cargados en el sistema.']);
        }

        return response()->json(['error' => 'false', 'data' => $pedidos, 'message' => 'Pedidos enviados correctamente.']);
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
            'obra_id' => 'required|numeric|exists:obras,id',
            'materiales.*.id' => 'numeric|exists:materiales,id',
            'materiales.*.cantidad' => 'numeric',
            'herramientas.*.id' => 'numeric|exists:herramientas,id',
            'herramientas.*.cantidad' => 'numeric',
        ]);

        if ($validator->fails()) {
            return response()->json(['error' => 'true', 'data' => $validator->errors(), 'message' => 'Error en la validación de datos.'], 400);
        }

        $user = Auth::user();

        $input['user_id'] = $user->getAuthIdentifier();

        $pedido = Pedido::create($input);

        // Agregar los materiales al pedido
        $materiales = $input['materiales'];
        foreach ($materiales as $key => $value) {
            $material = (object) $value;
            $pedido->materiales()->attach($material->id, [
                'cantidad' => $material->cantidad,
                'estado' => 'PEDIDO'
            ]);
        }
        
        // Agregar las herramientas al pedido
        $herramientas = $input['herramientas'];
        foreach ($herramientas as $key => $value) {
            $herramienta = (object) $value;
            $pedido->herramientas()->attach($herramienta->id, [
                'cantidad' => $herramienta->cantidad,
                'estado' => 'PEDIDO'
            ]);
        }

        return response()->json(['error' => 'false', 'data' => $pedido, 'message' => 'Pedido creado correctamente.']);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $pedido = Pedido::where('id', $id)->with(['obra', 'solicitante', 'materiales', 'herramientas'])->first();

        if (is_null($pedido)) {
            return response()->json(['error' => 'true', 'message' => 'Pedido no encontrado.']);
        }

        return response()->json(['error' => 'false', 'data' => $pedido, 'message' => 'Pedido enviado correctamente.']);
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
        $pedido = Pedido::find($id);

        if (is_null($pedido)) {
            return response()->json(['error' => 'true', 'message' => 'Pedido no encontrado.']);
        }

        $input = $request->all();

        $validator = Validator::make($input, [
            'obra_id' => 'required|numeric|exists:obras,id',
            'materiales.*.id' => 'numeric|exists:materiales,id',
            'materiales.*.cantidad' => 'numeric',
            'herramientas.*.id' => 'numeric|exists:herramientas,id',
            'herramientas.*.cantidad' => 'numeric',
        ]);

        if ($validator->fails()) {
            return response()->json(['error' => 'true', 'data' => $validator->errors(), 'message' => 'Error en la validación de datos.'], 400);
        }

        $pedido->obra_id = $input['obra_id'];

        $pedido->save();

        // Agregar los materiales al pedido
        $materiales = $input['materiales'];
        $pedido->materiales()->detach();
        foreach ($materiales as $key => $value) {
            $material = (object) $value;
            $pedido->materiales()->attach($material->id, [
                'cantidad' => $material->cantidad,
                'estado' => 'PEDIDO'
            ]);
        }
        
        // Agregar las herramientas al pedido
        $herramientas = $input['herramientas'];
        $pedido->herramientas()->detach();
        foreach ($herramientas as $key => $value) {
            $herramienta = (object) $value;
            $pedido->herramientas()->attach($herramienta->id, [
                'cantidad' => $herramienta->cantidad,
                'estado' => 'PEDIDO'
            ]);
        }

        return response()->json(['error' => 'false', 'data' => $pedido, 'message' => 'Pedido actualizado correctamente.']);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $pedido = Pedido::find($id);

        if (is_null($pedido)) {
            return response()->json(['error' => 'true', 'message' => 'Pedido no encontrado.']);
        }

        $pedido->materiales()->detach();
        $pedido->herramientas()->detach();

        $pedido->delete();

        return response()->json(['error' => 'false', 'message' => 'Pedido eliminado correctamente.']);
    }
}
