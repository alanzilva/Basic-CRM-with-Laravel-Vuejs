<?php

use Illuminate\Http\Request;
use App\Company;
use App\Employee;
/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

/**
 * API Routes for Companies
 */

//show all companies
Route::get('companies', function() {
    return Company::all();
});
//show one company
//Route::middleware('auth:api')->get('/companies/{id}', function($id) {
Route::get('/companies/{id}', function($id) {
    return Company::find($id);
});
//insert a company
Route::post('/companies', 'CompanyController@store');

//update a company
Route::post('/companies/{id}', 'CompanyController@update');

//delete a company
Route::delete('/companies/{id}', 'CompanyController@destroy');

/**
 * API Routes for Employees
 */

//show all employees
Route::get('employees', 'EmployeeController@index');

//show one employee
Route::get('/employees/{id}', 'EmployeeController@show');

//insert a employee
Route::post('/employees', 'EmployeeController@store');

//update a employee
Route::post('/employees/{id}', 'EmployeeController@update');

//delete a employee
Route::delete('/employees/{id}', 'EmployeeController@destroy');
