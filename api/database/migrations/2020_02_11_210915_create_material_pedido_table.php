<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateMaterialPedidoTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('material_pedido', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->unsignedBigInteger('material_id');
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
        Schema::dropIfExists('material_pedido');
    }
}
