<?php

namespace App\Http\Controllers\API;

use Illuminate\Support\Facades\Validator;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Client;

class ClientController extends Controller{

    public function index(){
        $clients = Client::all();
        return response()->json([
            'status' => 200,
            'clients' => $clients
        ]);
    }

    public function store(Request $request){
        $validator = Validator::make($request->all(),[
            'name'=>'required|max:150',
            'birthday'=>'required|max:10',
            'phone'=>'required|max:15|min:8',
            'cpf'=>'required|max:15|min:8',
            'email'=>'required|max:50|min:5|email',
            'address'=>'required|max:150',
            'cep'=>'required|max:10|min:8',
        ]);

        if($validator->fails()){
            return response()->json([
                'validate_err' => $validator->messages(),
            ]);
        } else {
            $client = new Client;
            $client->name = $request->input('name');
            $client->birthday = $request->input('birthday');
            $client->phone = $request->input('phone');
            $client->cpf = $request->input('cpf');
            $client->email = $request->input('email');
            $client->cep = $request->input('cep');
            $client->address = $request->input('address');
            $client->district = $request->input('district');
            $client->number = $request->input('number');
            $client->save();

            return response()->json([
                'status' => 200,
                'message' => 'Client Added Successfully',
            ]);
        }
    }

    public function edit($id){
        $client = Client::find($id);
        
        if($client){
            return response()->json([
                'status' => 200,
                'client' => $client,
            ]);
        }else {
            return response()->json([
                'status' => 404,
                'message' => 'Não foi encontrado um cliente com esse ID.',
            ]);
        }
    }

    public function update(Request $request, $id){
        $validator = Validator::make($request->all(),[
            'name'=>'required|max:150',
            'birthday'=>'required|max:10',
            'phone'=>'required|max:15|min:8',
            'cpf'=>'required|max:15|min:8',
            'email'=>'required|max:50|min:5|email',
            'address'=>'required|max:150',
            'cep'=>'required|max:10|min:8',
        ]);

        if($validator->fails()){
            return response()->json([
                'validate_err' => $validator->messages(),
            ]);
        } else {
            $client = Client::find($id);
            if($client){
                $client->name = $request->input('name');
                $client->birthday = $request->input('birthday');
                $client->phone = $request->input('phone');
                $client->cpf = $request->input('cpf');
                $client->email = $request->input('email');
                $client->cep = $request->input('cep');
                $client->address = $request->input('address');
                $client->district = $request->input('district');
                $client->number = $request->input('number');
                $client->update();
    
                return response()->json([
                    'status' => 200,
                    'message' => 'Client Updated Successfully',
                ]);
            }else {
                return response()->json([
                    'status' => 404,
                    'message' => 'Não foi encontrado um cliente com esse ID.',
                ]);
            }
        }
    }

    public function destroy($id){
        $client = Client::find($id);
        $client->delete();
        return response()->json([
            'status' => 200,
            'message' => 'Client Deleted Successfully',
        ]);
    }
}
