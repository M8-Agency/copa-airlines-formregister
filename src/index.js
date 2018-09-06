import React, { Component } from 'react';
import PropTypes from 'prop-types';

import FormRegisterUI from './FormRegisterUI'
import axios from 'axios'
import validate from './validate'
import countriesList from './data/countries'
import copy from './locale/es'

class FormRegister extends Component{
    
    constructor(props){
        super(props)
        this.formData = {}
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
    /**
     * INPUT HANDLERS
     */
    handlerEmail = (element) => {
        this.formData['email'] = element;
    }
    handlerEmailConfirmation = (element) => {
        this.formData['emailConfirmation'] = element;
    }
    handlerFirstname = (element) => {
        this.formData['firstname'] = element;
    }
    handlerLastname = (element) => {
        this.formData['lastname'] = element;
    }
    handlerYear = (element) => {
        this.formData['year'] = element;
    }
    handlerMonth = (element) => {
        this.formData['month'] = element;
    }
    handlerDay = (element) => {
        this.formData['day'] = element;
    }
    handlerPhone = (element) => {
        this.formData['phone'] = element;
    }
    handlerCountry = (element) => {
        this.formData['country'] = element;
    }
    handlerCity = (element) => {
        this.formData['city'] = element;
    }
    handlerTerms = (element) => {
        this.formData['terms'] = element;
    }
    handlerNews = (element) => {
        this.formData['news'] = element;
    }
    
    handlers = {
        handlerEmail : this.handlerEmail,
        handlerEmailConfirmation : this.handlerEmailConfirmation,
        handlerFirstname : this.handlerFirstname,
        handlerLastname : this.handlerLastname,
        handlerYear : this.handlerYear,
        handlerMonth : this.handlerMonth,
        handlerDay : this.handlerDay,
        handlerPhone : this.handlerPhone,
        handlerCountry : this.handlerCountry,
        handlerCity : this.handlerCity,
        handlerTerms : this.handlerTerms,
        handlerNews : this.handlerNews,
    }    
    
    handleValidateForm = (event) => {
        event.preventDefault()
        const validateData = validate(this.formData, this.props.copy)

        if(validateData.valid){
            this.props.success(validateData)
        }else{
            this.setState({
                error: validateData.message
            })            
            this.props.error(validateData)
        }
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
                error = { this.state.error }
                handlers = { this.handlers }
                working = { this.props.working }
            /> 
        )
    }
}

FormRegister.propTypes = {
    copy : PropTypes.object,
    countries : PropTypes.array,
    email : PropTypes.string,
    success : PropTypes.func.isRequired,
    error : PropTypes.func.isRequired,
    working : PropTypes.bool,
};

FormRegister.defaultProps = {
    copy,
    countries : countriesList,
    working : false
};

export default FormRegister;