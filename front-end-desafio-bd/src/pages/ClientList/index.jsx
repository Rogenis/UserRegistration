import React, { useEffect, useState } from 'react';
import axios from 'axios';
import swal from  'sweetalert'
import { Link } from 'react-router-dom';

export default function ClientList () {
  var client_HTMLTABLE = ''
  const [useClients, setUseClients] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function componentDidMount(){
      const res = await axios.get('http://localhost:8000/api/clients');
      if(res.data.status === 200){
        setLoading(false);
        setUseClients(res.data.clients);
      }
    }
  
    componentDidMount();
  },[]);

  async function handleDeleteClient(e, id){
    const thidClickedFunda = e.currentTarget;
    thidClickedFunda.innerText = "Deleting";
    const res = await axios.delete(`http://localhost:8000/api/delete-client/${id}`);
    
    if(res.data.status === 200){
      thidClickedFunda.closest("tr").remove()
      swal({
        title: "Deletado!",
        text: "Usuário deletado da base de dados!",
        icon: "success",
        button: "OK!"
      })
    }
  }

  if(loading){
    client_HTMLTABLE = <tr><td colSpan="10"> <h2>Loading...</h2> </td></tr>
  }
  else {
    client_HTMLTABLE = 
    useClients.map((item) => {
      return (
        <tr key={item.id}>
          <td>{item.name}</td>
          <td>{item.birthday}</td>
          <td>{item.phone}</td>
          <td>{item.email}</td>
          <td>{item.cpf}</td>
          <td>{item.address}</td>
          <td>{item.cep}</td>
          <td>{item.district}</td>
          <td>
            <Link to={`edit-client/${item.id}`} className="btn btn-success btn-sm">Editar</Link>
          </td>
          <td>
            <button type="button" onClick={(e) => handleDeleteClient(e, item.id)} className="btn btn-danger btn-sm">Delete</button>
          </td>
        </tr>
      );
    });
  }

  return (
    <div className='container'>
      <div className='row'>
        <div className='col-md-12'>
          <div className='card'>
            <div className='card-header'>
              <h4>Dados dos Clientes
                <Link to={'add-client'} className={'btn btn-primary btn-sm float-end'}>
                  Cadastrar cliente
                </Link>
              </h4>
            </div>
            <div className='card-body'>
              <table className='table table-bordered table-striped'>
                <thead>
                  <tr>
                    <th>Nome</th>
                    <th>Data de Nascimento</th>
                    <th>Número de telefone</th>
                    <th>E-mail</th>
                    <th>CPF</th>
                    <th>Endereço</th>
                    <th>CEP</th>
                    <th>Bairro</th>
                    <th>Editar</th>
                    <th>Deletar</th>
                  </tr>
                </thead>
                <tbody>
                  {client_HTMLTABLE}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}