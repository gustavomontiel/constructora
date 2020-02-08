<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Obra extends Model
{
    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'nombre',
        'descripcion',
    ];

    /**
     * Obtener la dirección de la obra
     */
    public function direccion()
    {
        return $this->morphOne('App\Direccion', 'addressable');
    }
}
