import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Validator from 'validatorjs'
import FormRegisterUI from './FormRegisterUI'
import axios from 'axios'

class FormRegister extends Component{
    
    constructor(props){
        super(props)
        this.data = {}
        this.state = {
            cities : [],
            error : false
        }
    }

    handleFilterCities = (selectedIndex) => {
        this.setState({
            cities : this.props.countries[selectedIndex-1].cities
        })
    }
    
    setInputEmail = (element) => {
        this.inputEmail = element
    }

    handleValidateForm = (event) => {
        event.preventDefault()
        
        const data = {
            email : this.inputEmail.value,
            email_confirmation : this.refs.inputEmailConfirmation.value,
            fname : this.refs.inputFname.value,
            lname : this.refs.inputLname.value,
            birthday : new Date(
                this.refs.selectYear.value, 
                (this.refs.selectMonth.value - 1), 
                this.refs.selectDay.value
            ),
            phone : this.refs.inputPhone.value,
            country : this.refs.selectCountry.value,
            city : this.refs.selectCity.value,
            terms : this.refs.checkTerms.checked,
            referer : this.props.refererId,
            refererSource : this.props.refererSource
        };

        const rules = {
            email : 'required|email',
            email_confirmation : 'required|email',
            fname : 'required|alpha',
            lname : 'required|alpha',
            birthday : 'date',
            phone : 'required|numeric',
            country : 'required',
            city : 'required',
            terms : 'accepted'
        }

        const attributes = {
            email : 'email',
            email_confirmation : 'confirmación de e-mail',
            fname : 'Nombre',
            lname : 'Apellido',
            birthday : 'fecha de nacimiento',
            phone : 'Teléfono',
            country : 'País',
            city : 'Ciudad',
            terms : 'Términos'
        }     

        const errors = {
            required: 'El campo de :attribute es requerido ',
            email: 'El campo de e-mail es requerido',
            accepted : 'Aceptar los términos y condiciones es un requerimiento',
            date : 'Debe entrar una fecha de nacimiento válida',
            alpha : 'Debes ingresar un :attribute válido (sin acento, espacios y sin caracteres especiales)',
            numeric : 'Debes ingresar un número de :attribute válido (sólo números y sin espacios)',
        }        
      
        var validation = new Validator(data, rules, errors);
        validation.setAttributeNames(attributes);    

        if(data.email === data.email_confirmation){
            validation.passes(() => {
                this.data = data
                this.register(data)
            });
            
            validation.fails(() => {
                const errors = validation.errors.all();
                const keyName = Object.keys(errors)[0];
    
                this.setState({
                    error : errors[keyName][0]
                })
            });        
        }else{
            this.setState({
                error : 'El email de confirmación no coincide'
            })             
        }
    }

    register = (data) => {
        this.props.working(true)
        const formData = new FormData();

        for(let field in data){
            switch(field){
                case 'birthday':
                    formData.append(field, data[field].toISOString().split('T')[0]);
                break
                default:
                    formData.append(field, data[field]);
            }
        }

        return axios.post(this.props.endPoint, formData)
        .then(this.registerSuccess)
        .catch(this.registerError);
    }

    registerSuccess = (response) => {
        this.props.working(false)
        if(response.data.status === 'ok'){
            this.props.registerSuccess(response.data)
        }else{
            this.setState({
                error : response.data.description
            })
        }

    }

    registerError = (error) => {
        //Envio al error con los datos que se enviaron al endpoint
        this.props.working(false)
        this.props.registerError(error, this.data)
    }    

    render = () => {
        return (
            <FormRegisterUI 
                countries={ this.props.countries } 
                cities={ this.state.cities } 
                validateForm = { this.handleValidateForm }  
                filterCities = { this.handleFilterCities }
                copy={ this.props.copy}
                email = { this.props.email }
                refererId = { this.props.refererId }
                refererSource = { this.props.refererSource }
                error = { this.state.error }
            /> 
        )
    }
}

const copy = {
    'un_solo_paso' : 'You’re only one step away!',
    'completa' : 'Enter your personal information to participate.',
    'email' : 'Email',
    'confirm' : 'Confirm Email',
    'nombre' : 'Name',
    'apellido' : 'Last Name',
    'dia' : 'Day',
    'mes' : 'Month',
    'ano' : 'Year',
    'birthtext' : '(Date of Birth)',
    'telefono' : 'Phone Number',
    'pais' : 'Country',
    'ciudad' : 'City',
    'terminos' : 'I confirm I am 18 years old or older.\nI have read and accepted the Terms & Conditions.',
    'siguiente' : 'NEXT'
}

const countries = [
    {'label':'Argentina','value':'AR','cities' : [
        {'label' : 'Buenos Aires', value : 'EZE'},
        {'label' : 'Córdoba', value : 'COR'},
        {'label' : 'Rosario', value : 'ROS'},
        {'label' : 'Mendoza', value : 'MDZ'},
    ]},
    {'label':'Brasil','value':'BR','cities' : [
        {'label' : 'Manaus', value : 'MAO'},
        {'label' : 'Porto Alegre', value : 'POA'},
        {'label' : 'Recife', value : 'REC'},
        {'label' : 'Río de Janeiro', value : 'GIG'},
        {'label' : 'Sao Paulo', value : 'GRU'},
        {'label' : 'Belo Horizonte', value : 'CNF'},
        {'label' : 'Brasilia', value : 'BSB'},
    ]},
    {'label':'Colombia','value':'CO','cities' : [
        {'label' : 'Barranquilla', value : 'BAQ'},
        {'label' : 'Bogotá', value : 'BOG'},
        {'label' : 'Bucaramanga', value : 'BGA'},
        {'label' : 'Cali', value : 'CLO'},
        {'label' : 'Cartagena', value : 'CTG'},
        {'label' : 'Medellín', value : 'MDE'},
        {'label' : 'Pereira', value : 'PEI'},
        {'label' : 'San Andrés Isla', value : 'ADZ'},
    ]},
    {'label':'Panamá','value':'PA','cities' : [
        {'label' : 'David', value : 'DAV'},
        {'label' : 'Panamá', value : 'PTY'},
    ]}                
]

FormRegister.propTypes = {
    copy : PropTypes.object,
    countries : PropTypes.array,
    email : PropTypes.string,
    endPoint : PropTypes.string.isRequired,
    registerSuccess : PropTypes.func.isRequired,
    registerError : PropTypes.func.isRequired,
    refererId : PropTypes.string,
    refererSource : PropTypes.string,
    working : PropTypes.func.isRequired,
};

FormRegister.defaultProps = {
    copy,
    countries,
    working : false
};

export default FormRegister;