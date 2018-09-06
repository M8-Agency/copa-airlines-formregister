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
    <div className="container FormRegister">
      <div className='row'>
        <form onSubmit={props.validateForm} noValidate>
          <div className="col-sm-6">
            <input
              className="FormRegister__email"
              ref={props.handlers.handlerEmail}
              type="email"
              placeholder={props.copy.email}
              defaultValue={props.email}
            />
          </div>
          <div className="col-sm-6">
            <input
              className="FormRegister__email_conf"
              ref={props.handlers.handlerEmailConfirmation}
              type="email"
              placeholder={props.copy.confirm}
              defaultValue={props.email}
            />
          </div>
          <div className="col-sm-6">
            <input
              className="FormRegister__fname"
              ref={props.handlers.handlerFirstname}
              type="text"
              placeholder={props.copy.nombre}
            />
          </div>
          <div className="col-sm-6">
            <input
              className="FormRegister__lname"
              ref={props.handlers.handlerLastname}
              type="text"
              placeholder={props.copy.apellido}
            />
          </div>
          <div className="col-sm-6">
            <select className="FormRegister__day" ref={props.handlers.handlerDay}>
              <option value="-" selected>
                {props.copy.dia}
              </option>
              {getNumbers(1, 31)}
            </select>
            <select className="FormRegister__month" ref={props.handlers.handlerMonth}>
              <option value="-" selected>
                {props.copy.mes}
              </option>
              {getNumbers(1, 12)}
            </select>
            <select className="FormRegister__year" ref={props.handlers.handlerYear}>
              <option value="-" selected>
                {props.copy.ano}
              </option>
              {getNumbers(2000, 1900)}
            </select>
            <div className="FormRegister__birthtext">
              {props.copy.birthtext}
            </div>
          </div>
          <div className="col-sm-6">
            <input
              className="FormRegister__phone"
              ref={props.handlers.handlerPhone}
              type="text"
              placeholder={props.copy.telefono}
            />
          </div>

          <div className="col-sm-6">
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
          </div>
          <div className="col-sm-6">
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
          <div className="col-sm-12">
            <div className="FormRegister__terms">
              <input type="checkbox" ref={props.handlers.handlerTerms} />
              <p>{props.copy.terminos}</p>
            </div>
            <div className="FormRegister__news">
              <input type="checkbox" ref={props.handlers.handlerNews} />
              <p>{props.copy.news}</p>
            </div>
          </div>
          <div className="col-sm-12">
            {(props.error) && <p className="FormRegister__error">{props.error}</p>}
            <input disabled={ props.working } className="FormRegister__cta" type="submit" value={props.copy.siguiente} />
          </div>
        </form>
      </div>
    </div>
  )
}

export default FormRegisterUI;