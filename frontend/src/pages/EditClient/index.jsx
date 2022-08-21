import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import swal from  'sweetalert'
import axios from 'axios'
import FormLabel from '../../components/FormLabel'
import { Card, CardBody, CardHeader, Container, DoubleContainer } from './styles'

export default function EditClient() {
  const { id } = useParams();
  const [useAddress, setUseAddress] = useState('');
  const [useDistrict, setUseDistrict] = useState('');
  const [customer, setCustomer] = useState({});
  const [isErrorCep, setIsErrorCep] = useState('');
  const [isError, setIsError] = useState([]);
  const [isErrorBirthday, setErrorBirthday] = useState('');

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setCustomer(values => ({...values, [name]: value}))
    setCustomer(values => ({...values, 'address': useAddress}))
    setCustomer(values => ({...values, 'district': useDistrict}))
  }

  const validateAge = (e) => {
    const age = e.target.value;
    const anoAtual = new Date().getFullYear();
    const anoInformado = age.split('/')[2];
    const idade = Number(anoAtual - anoInformado);
  
    if(idade > 18){
      return true;
    }else{
      return false;
    }
  }

  const checkAge = (age) =>{
    if(validateAge(age) === true){
      setErrorBirthday('')
    }else {
      setErrorBirthday("Idade deve ser maior do que 18 anos!")
    }
  }

  const validateCepAmazonas = (cep) =>{
    console.log(cep)
    const cepFormat = parseInt(cep.replace(/\D/g, ''), 10);
    if((cepFormat > 69000000 && cepFormat < 69299999) || (cepFormat > 69400000 && cepFormat < 69899999)){
      return true
    }else {
      return false;
    }
  }

  const checkCep = (e) => {
    const cep = e.target.value.replace(/\D/g, '');
    fetch(`https://viacep.com.br/ws/${cep}/json`)
      .then(res => res.json()).then(data => {
        setIsErrorCep('')
        if(data.erro === "true"){
          setIsErrorCep('Informe um cep válido!')
          setUseAddress('')
          setUseDistrict('')
        }
        if(validateCepAmazonas(data.cep) === false){
          setIsErrorCep('Cep deve ser somente do Amazonas!')
          setUseAddress('')
          setUseDistrict('')
        } else {
          setIsErrorCep('')
          setUseAddress(data.logradouro + ' ' + data.complemento + " - " + data.localidade + '/' + data.uf);
          setUseDistrict(data.bairro);
        }
      })
  }

  useEffect(() => {
    async function componentDidMount(){
      const res = await axios.get(`http://localhost:8000/api/edit-client/${id}`);
      if(res.data.status === 200){
        setCustomer(res.data.client)
      } 
      else if(res.data.status === 404){
        swal({
          title: "Atenção!!",
          text: "Não foi encontrado um usuário com esse ID.",
          icon: "warning",
          button: "OK!"
        });
      }
    }

    componentDidMount();
  },[id]);


  const handleUpdateClient = async (e) => {
    e.preventDefault();
    // document.getElementById('updatebtn').disabled = true;
    // document.getElementById('updatebtn').innerText = "Atualizando"
    const res = await axios.put(`http://localhost:8000/api/update-client/${id}`, customer);

    if(res.data.status === 200) {
      swal({
        title: "Atualizado!",
        text: "Dados do cliente atualizado com sucesso!",
        icon: "success",
        button: "OK!"
      })
      document.getElementById('updatebtn').disabled = false;
      document.getElementById('updatebtn').innerText = "Cliente Atualizado"
    } 
    else if(res.data.status === 404){
      swal({
        title: "Atenção!!",
        text: "Não foi encontrado um usuário com esse ID.",
        icon: "warning",
        button: "OK!"
      });
    }
    else {
      setIsError(res.data.validate_err)
    }
  }

  return (
    <Container>
      <div className='col-md-6'>
        <Card>
          <CardHeader>
            <h4>Editar Cadastro
              <Link to={'/'} className={'btn btn-primary btn-sm float-end'}>
                Voltar
              </Link>
            </h4>
          </CardHeader>
          <CardBody>
            <form onSubmit={handleUpdateClient} method="put">
              <DoubleContainer>
                <FormLabel title={"Nome Completo"} name="name" onChange={handleChange} value={customer.name || ''} error={isError.name} />
                <FormLabel title={"Data de Nascimento"} name="birthday" onChange={handleChange} value={customer.birthday || ''} error={isErrorBirthday} onBlur={checkAge}/>
              </DoubleContainer>
              <DoubleContainer>
                <FormLabel title={"Telefone"} name="phone" onChange={handleChange} value={customer.phone || ''} error={isError.phone} />
                <FormLabel title={"CPF"} name="cpf" onChange={handleChange} value={customer.cpf || ''} error={isError.cpf}/>
              </DoubleContainer>
              <DoubleContainer>
                <FormLabel title={"E-mail"} name="email" onChange={handleChange} value={customer.email || ''} error={isError.email} />
                <FormLabel title={"CEP"} name="cep" onChange={handleChange} value={customer.cep || ''} error={isErrorCep} onBlur={checkCep}/>
              </DoubleContainer>
                <FormLabel title={"Endereço"} name="address" onChange={handleChange} value={useAddress || ''} error={isError.address} />
              <DoubleContainer>
                <FormLabel title={"Bairro"} name="district" onChange={handleChange} value={useDistrict || ''} error={isError.district} />
                <FormLabel title={"Nº"} name="number" onChange={handleChange} value={customer.number || ''} error={isError.number} />
              </DoubleContainer>
              <div className="form-group mb-3">
                <button type="submit" id='updatebtn' className="btn btn-primary">
                  Atualizar Cadastro
                </button>
              </div>
            </form>
          </CardBody>
        </Card>
      </div>
    </Container>
  );
}