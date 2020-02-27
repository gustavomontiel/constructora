<?php

/** @var Router $router */

use Laravel\Lumen\Routing\Router;

/* Public Routes */

$router->get('/', function () {
    return response()->json(['message' => 'Bienvenido a la API del sistema de gestión de la constructora GeoId']);
});

/* Auth Routes */
$router->group(['prefix' => 'auth', 'as' => 'auth'], function (Router $router) {

    /* Defaults */
    $router->post('/register', [
        'as' => 'register',
        'uses' => 'AuthController@register',
    ]);
    $router->post('/login', [
        'as' => 'login',
        'uses' => 'AuthController@login',
    ]);
    $router->get('/verify/{token}', [
        'as' => 'verify',
        'uses' => 'AuthController@verify'
    ]);

    /* Password Reset */
    $router->post('/password/forgot', [
        'as' => 'password.forgot',
        'uses' => 'AuthController@forgotPassword'
    ]);
    $router->post('/password/recover/{token}', [
        'as' => 'password.recover',
        'uses' => 'AuthController@recoverPassword'
    ]);

    /* Protected User Endpoint */
    $router->get('/user', [
        'uses' => 'AuthController@getUser',
        'as' => 'user',
        'middleware' => 'auth'
    ]);
});

/* Protected Routes */
$router->group(['middleware' => 'auth'], function (Router $router) {

    /* Obras Routes */
    $router->get('/obras', [
        'as' => 'obras.index',
        'uses' => 'ObraController@index'
    ]);

    $router->post('/obras', [
        'as' => 'obras.store',
        'uses' => 'ObraController@store'
    ]);

    $router->get('/obras/{id}', [
        'as' => 'obras.show',
        'uses' => 'ObraController@show'
    ]);

    $router->put('/obras/{id}', [
        'as' => 'obras.update',
        'uses' => 'ObraController@update'
    ]);

    $router->delete('/obras/{id}', [
        'as' => 'obras.destroy',
        'uses' => 'ObraController@destroy'
    ]);

    /* Materiales Routes */
    $router->get('/materiales', [
        'as' => 'materiales.index',
        'uses' => 'MaterialController@index'
    ]);

    $router->post('/materiales', [
        'as' => 'materiales.store',
        'uses' => 'MaterialController@store'
    ]);

    $router->get('/materiales/{id}', [
        'as' => 'materiales.show',
        'uses' => 'MaterialController@show'
    ]);

    $router->put('/materiales/{id}', [
        'as' => 'materiales.update',
        'uses' => 'MaterialController@update'
    ]);

    $router->delete('/materiales/{id}', [
        'as' => 'materiales.destroy',
        'uses' => 'MaterialController@destroy'
    ]);

    $router->post('/importarmateriales', [
        'as' => 'materiales.importarMateriales',
        'uses' => 'MaterialController@importarMateriales'
    ]);

    /* Herramientas Routes */
    $router->get('/herramientas', [
        'as' => 'herramientas.index',
        'uses' => 'HerramientaController@index'
    ]);

    $router->post('/herramientas', [
        'as' => 'herramientas.store',
        'uses' => 'HerramientaController@store'
    ]);

    $router->get('/herramientas/{id}', [
        'as' => 'herramientas.show',
        'uses' => 'HerramientaController@show'
    ]);

    $router->put('/herramientas/{id}', [
        'as' => 'herramientas.update',
        'uses' => 'HerramientaController@update'
    ]);

    $router->delete('/herramientas/{id}', [
        'as' => 'herramientas.destroy',
        'uses' => 'HerramientaController@destroy'
    ]);

    $router->post('/importarherramientas', [
        'as' => 'herramientas.importarHerramientas',
        'uses' => 'HerramientaController@importarHerramientas'
    ]);

    /* Proveedores Routes */
    $router->get('/proveedores', [
        'as' => 'proveedores.index',
        'uses' => 'ProveedorController@index'
    ]);

    $router->post('/proveedores', [
        'as' => 'proveedores.store',
        'uses' => 'ProveedorController@store'
    ]);

    $router->get('/proveedores/{id}', [
        'as' => 'proveedores.show',
        'uses' => 'ProveedorController@show'
    ]);

    $router->put('/proveedores/{id}', [
        'as' => 'proveedores.update',
        'uses' => 'ProveedorController@update'
    ]);

    $router->delete('/proveedores/{id}', [
        'as' => 'proveedores.destroy',
        'uses' => 'ProveedorController@destroy'
    ]);

    /* Documentos Routes */
    $router->get('/documentos', [
        'as' => 'documentos.index',
        'uses' => 'DocumentoController@index'
    ]);

    $router->post('/documentos', [
        'as' => 'documentos.store',
        'uses' => 'DocumentoController@store'
    ]);

    $router->get('/documentos/{id}', [
        'as' => 'documentos.show',
        'uses' => 'DocumentoController@show'
    ]);

    $router->put('/documentos/{id}', [
        'as' => 'documentos.update',
        'uses' => 'DocumentoController@update'
    ]);

    $router->delete('/documentos/{id}', [
        'as' => 'documentos.destroy',
        'uses' => 'DocumentoController@destroy'
    ]);

    $router->get('/documentos/proveedor/{idProveedor}', [
        'as' => 'documentos.showByProveedor',
        'uses' => 'DocumentoController@showByProveedor'
    ]);

    /* Pedidos Routes */
    $router->get('/pedidos', [
        'as' => 'pedidos.index',
        'uses' => 'PedidoController@index'
    ]);

    $router->post('/pedidos', [
        'as' => 'pedidos.store',
        'uses' => 'PedidoController@store'
    ]);

    $router->get('/pedidos/{id}', [
        'as' => 'pedidos.show',
        'uses' => 'PedidoController@show'
    ]);

    $router->put('/pedidos/{id}', [
        'as' => 'pedidos.update',
        'uses' => 'PedidoController@update'
    ]);

    $router->delete('/pedidos/{id}', [
        'as' => 'pedidos.destroy',
        'uses' => 'PedidoController@destroy'
    ]);

    /* Admin Routes */
    $router->group(['middleware' => 'role:administrador'], function (Router $router) {

        $router->get('/admin', function () {
            return response()->json(['message' => 'Tu nivel de autorización es de administrador.']);
        });

        /* Users Routes */
        $router->get('/users', [
            'as' => 'users.index',
            'uses' => 'UserController@index'
        ]);

        $router->get('/users/{id}', [
            'as' => 'users.show',
            'uses' => 'UserController@show'
        ]);

        $router->post('/users', [
            'as' => 'users.store',
            'uses' => 'UserController@store'
        ]);

        $router->put('/users/{id}', [
            'as' => 'users.update',
            'uses' => 'UserController@update'
        ]);

        $router->delete('/users/{id}', [
            'as' => 'users.destroy',
            'uses' => 'UserController@destroy'
        ]);

        $router->put('/actualizar-password/{id}', [
            'as' => 'users.passwordById',
            'uses' => 'UserController@actualizarPasswordById'
        ]);
    });
});
