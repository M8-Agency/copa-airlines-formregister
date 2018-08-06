import React from 'react';

const getNumbers = (init, end) => {
  let options = [];

  for (
    let i = init;
    (init <= end) ? i <= end : i >= end;
    (init <= end) ? i++ : i--
  ) {
    options.push(
      <option key={i} value={i}>
        {i < 10 ? `0${i}` : i}
      </option>
    );
  }

  return options;
}

const FormRegisterUI = (props) => {

  return (
    <div className='FormRegister'>
      <form onSubmit={props.validateForm} noValidate>
        <input
          className="FormRegister__email"
          ref={props.handlers.handlerEmail}
          type="email"
          placeholder={props.copy.email}
          defaultValue={props.email}
        />
        <input
          className="FormRegister__email_conf"
          ref={props.handlers.handlerEmailConfirmation}
          type="email"
          placeholder={props.copy.confirm}
          defaultValue={props.email}
        />
        <input
          className="FormRegister__fname"
          ref={props.handlers.handlerFirstname}
          type="text"
          placeholder={props.copy.nombre}
        />
        <input
          className="FormRegister__lname"
          ref={props.handlers.handlerLastname}
          type="text"
          placeholder={props.copy.apellido}
        />
        <div className="FormRegister__fnacimiento">
          <select name="FormRegisterUI__day" ref={props.handlers.handlerDay}>
            <option value="-" selected>
              {props.copy.dia}
            </option>
            {getNumbers(1, 31)}
          </select>
          <select name="FormRegisterUI__month" ref={props.handlers.handlerMonth}>
            <option value="-" selected>
              {props.copy.mes}
            </option>
            {getNumbers(1, 12)}
          </select>
          <select name="FormRegisterUI__year" ref={props.handlers.handlerYear}>
            <option value="-" selected>
              {props.copy.ano}
            </option>
            {getNumbers(2000, 1900)}
          </select>
          <div className="FormRegister__birthtext">
            {props.copy.birthtext}
          </div>
        </div>
        <input
          className="FormRegister__phone"
          ref={props.handlers.handlerPhone}
          type="text"
          placeholder={props.copy.telefono}
        />
        <div>
          <select
            className="FormRegister__country"          
            onChange={(event) => { props.filterCities(event.target.selectedIndex) }}
            ref={props.handlers.handlerCountry}
          >
            <option value="" selected>
              {props.copy.pais}
            </option>
            {props.countries.map((item, index) => {
              return <option key={index} value={item.value}>{item.label}</option>
            })}
          </select>

          <select
            className="FormRegister__city"          
            ref={props.handlers.handlerCity}
          >
            <option value="" selected>
              {props.copy.ciudad}
            </option>
            {props.cities.map((item, index) => {
              return <option key={index} value={item.value}>{item.label}</option>
            })}
          </select>

        </div>
        <div className="FormRegister__terms">
          <input type="checkbox" name="FormRegisterUI__terms" ref={props.handlers.handlerTerms} />
          <span>
            {props.copy.terminos}
          </span>
        </div>
        <div className="FormRegister__news">        
          <input type="checkbox" name="FormRegisterUI__terms" ref={props.handlers.handlerNews} />
          <span>
          {props.copy.news}
          </span>
        </div>
        {(props.error) && <p className="FormLogin__message_golden">{props.error}</p>}
        <input className="Form__cta" type="submit" value={props.copy.siguiente} />
      </form>
    </div>
  )
}

export default FormRegisterUI;