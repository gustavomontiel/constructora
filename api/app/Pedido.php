<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Pedido extends Model
{
    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'numero',
        'obra_id',
        'user_id',
    ];

    /**
     * The attributes excluded from the model's JSON form.
     *
     * @var array
     */
    protected $hidden = [
        'obra_id',
        'user_id'
    ];

    /**
     * Obra a la que pertenece el pedido
     */
    public function obra()
    {
        return $this->belongsTo(Obra::class);
    }

    /**
     * Usuario que hizo el pedido
     */
    public function solicitante()
    {
        return $this->belongsTo(User::class, 'user_id');
    }

    /**
     * Materiales pedidos
     */
    public function materiales()
    {
        return $this->belongsToMany('App\Material')->withPivot('cantidad', 'estado', 'documento_id')->withTimestamps();
    }

    /**
     * Herramientas pedidas
     */
    public function herramientas()
    {
        return $this->belongsToMany('App\Herramienta')->withPivot('cantidad', 'estado', 'documento_id')->withTimestamps();
    }
}
