<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateHerramientaPedidoTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('herramienta_pedido', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->unsignedBigInteger('herramienta_id');
            $table->unsignedBigInteger('pedido_id');
            $table->integer('cantidad');
            $table->string('estado', 20);
            $table->unsignedBigInteger('documento_id')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('herramienta_pedido');
    }
}
