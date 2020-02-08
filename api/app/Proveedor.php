<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Proveedor extends Model
{
    /**
     * The table associated with the model.
     *
     * @var string
     */
    protected $table = 'proveedores';

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'cuit',
        'nombre',
        'telefono',
        'cuenta_corriente',
    ];

    /**
     * Obtener la dirección del proveedor
     */
    public function direccion()
    {
        return $this->morphOne('App\Direccion', 'addressable');
    }

    /**
     * Obtener los documentos del proveedor
     */
    public function documentos()
    {
        return $this->hasMany('App\Documento');
    }
}
