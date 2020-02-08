<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Direccion extends Model
{
    /**
     * The table associated with the model.
     *
     * @var string
     */
    protected $table = 'direcciones';

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'tipo',
        'calle',
        'numero',
        'piso',
        'departamento',
        'localidad',
        'provincia',
        'pais',
    ];

    /**
     * The attributes excluded from the model's JSON form.
     *
     * @var array
     */
    protected $hidden = [
        'id',
        'addressable_type',
        'addressable_id',
        'created_at',
        'updated_at'
    ];

    /**
     * Get the owning addressable model.
     */
    public function addressable()
    {
        return $this->morphTo();
    }
}
