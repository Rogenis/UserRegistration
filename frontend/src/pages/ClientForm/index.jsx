import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import swal from  'sweetalert'
import axios from 'axios'
import FormLabel from '../../components/FormLabel'
import { Card, CardBody, CardHeader, Container, DoubleContainer } from './styles'

export default function ClassList() {
  const [customer, setCustomer] = useState({});
  const [useAddress, setUseAddress] = useState('');
  const [useDistrict, setUseDistrict] = useState('');
  const [isError, setIsError] = useState([]);
  const [isErrorCep, setIsErrorCep] = useState('');
  const [isErrorBirthday, setErrorBirthday] = useState('');
  const [isDisabled, seiIsDisabled] = useState(true);

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setCustomer(values => ({...values, [name]: value}))
    setCustomer(values => ({...values, 'address': useAddress}))
    setCustomer(values => ({...values, 'district': useDistrict}))
  }

  function updateCustomer() {
    setCustomer('')
    setUseAddress('')
    setUseDistrict('')
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
      seiIsDisabled(false)
    }else {
      seiIsDisabled(true)
      setErrorBirthday("Idade deve ser maior do que 18 anos!")
    }
  }

  const validateCepAmazonas = (cep) =>{
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
        if(data.erro === "true"){
          setIsErrorCep('Informe um cep válido!')
          seiIsDisabled(true)
          setUseAddress('')
          setUseDistrict('')
        }
        else if(validateCepAmazonas(data.cep) === false){
          setIsErrorCep('Cep deve ser somente do Amazonas!')
          seiIsDisabled(true)
          setUseAddress('')
          setUseDistrict('')
        } else {
          seiIsDisabled(false)
          setIsErrorCep('')
          setUseAddress(data.logradouro + ' ' + data.complemento + " - " + data.localidade + '/' + data.uf);
          setUseDistrict(data.bairro);
        }
      })
  }

  const handleRegister = async (e) => {
    e.preventDefault();
    const res = await axios.post('http://localhost:8000/api/add-client', customer);
    if(res.data.status === 200) {
      swal({
        title: "Sucesso!",
        text: "Cliente Cadastrado com Sucesso!",
        icon: "success",
        button: "OK!"
      })
      updateCustomer()
    } else {
      setIsError(res.data.validate_err)
    }
  }

  return (
    <Container>
      <div className='col-md-6'>
        <Card>
          <CardHeader>
            <h4>Cadastro
              <Link to={'/'} className={'btn btn-primary btn-sm float-end'}>
                Voltar
              </Link>
            </h4>
          </CardHeader>
          <CardBody>
            <form onSubmit={handleRegister} method="post">
              <DoubleContainer>
                <FormLabel title={"Nome Completo"} name="name" onChange={handleChange} value={customer.name || ''} error={isError.name} />
                <FormLabel placeholder={'ex: 00/00/0000'} title={"Data de Nascimento"} name="birthday" onChange={handleChange} value={customer.birthday || ''} error={isErrorBirthday} onBlur={checkAge}/>
              </DoubleContainer>
              <DoubleContainer>
                <FormLabel title={"Telefone"} name="phone" placeholder={"ex: (00) 00000-0000"} onChange={handleChange} value={customer.phone || ''} error={isError.phone} />
                <FormLabel title={"CPF"} name="cpf" onChange={handleChange} value={customer.cpf || ''} error={isError.cpf}/>
              </DoubleContainer>
              <DoubleContainer>
                <FormLabel title={"E-mail"} placeholder={"ex: user@user.com"} name="email" onChange={handleChange} value={customer.email || ''} error={isError.email} />
                <FormLabel title={"CEP"} name="cep" onChange={handleChange} value={customer.cep || ''} error={isErrorCep} onBlur={checkCep}/>
              </DoubleContainer>
                <FormLabel title={"Endereço"} name="address" onChange={handleChange} value={useAddress || ''} error={isError.address} />
              <DoubleContainer>
                <FormLabel title={"Bairro"} name="district" onChange={handleChange}  value={useDistrict || ''} error={isError.district} />
                <FormLabel title={"Nº"} name="number" onChange={handleChange} value={customer.number || ''} error={isError.number} />
              </DoubleContainer>
              <div className="form-group mb-3">
                <button disabled={isDisabled} type="submit" className="btn btn-primary">
                  Cadastrar cliente
                </button>
              </div>
            </form>
          </CardBody>
        </Card>
      </div>
    </Container>
  );
}