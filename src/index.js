import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Validator from 'validatorjs'
import FormRegisterUI from './FormRegisterUI'
import axios from 'axios'
import Destinations_es from "./data/copa-airlines-participating_es"

class FormRegister extends Component{
    
    constructor(props){
        super(props)
        this.data = {}

        this.state = {
            countries : [{
                    'label':{
                    'es':'Estados Unidos',
                    },
                    'value':'US'
                },{
                    'label':{
                    'es':'Panama',
                    },
                    'value':'PA'
                },{
                    'label':{
                        'es':'Mexico',
                    },
                    'value':'MX'
                },{
                    'label':{
                        'es':'Colombia',
                    },
                    'value':'CO'
            }],
            cities : [],
            error : false
        }
    }

    handleFilterCities = (countryCode) => {
        const cities = Destinations_es.filter(function(city) {
            return city.countryCode === countryCode;
        });   
        console.log('cities', cities)
        this.setState({
            cities : cities
        })
    }
    
    handleValidateForm = (event) => {
        event.preventDefault()
        
        const formData = new FormData(event.target);
        
        const data = {
            email : formData.get('email'),
            email_confirmation : formData.get('email_confirmation'),
            fname : formData.get('fname'),
            lname : formData.get('lname'),
            birthday : new Date(formData.get('year'), (formData.get('month') - 1), formData.get('day')),
            phone : formData.get('phone'),
            country : formData.get('country'),
            city : formData.get('city'),
            terms : formData.get('terms'),
            referer : formData.get('referer'),
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
        this.props.registerSuccess(response.data)
    }

    registerError = (error) => {
        //Envio al error con los datos que se enviaron al endpoint
        this.props.registerError(error, this.data)
    }    

    render = () => {
        return (
            <FormRegisterUI 
                countries={ this.state.countries } 
                cities={ this.state.cities } 
                validateForm = { this.handleValidateForm }  
                filterCities = { this.handleFilterCities }
                copy={ this.props.copy['es']}
                email = { this.props.email }
                error = { this.state.error }
            /> 
        )
    }
}

const copy = {
    es : {
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
        'siguiente' : 'NEXT',
    },
    pt : {
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
        'siguiente' : 'NEXT',
    }
}

FormRegister.propTypes = {
    copy : PropTypes.object,
    email : PropTypes.string,
    endPoint : PropTypes.string.isRequired,
    registerSuccess : PropTypes.func.isRequired,
    registerError : PropTypes.func.isRequired,    
};

FormRegister.defaultProps = {
    copy
};

export default FormRegister;