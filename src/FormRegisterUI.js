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
            <input type="hidden" name="FormRegisterUI__token" value="" />
            <input type="hidden" name="FormRegisterUI__referer" value={ props.refererId } />
            <input type="hidden" name="FormRegisterUI__refererSource" value={ props.refererSource } />
            <input
              className="FormRegister__email"
              type="email"
              placeholder={ props.copy.email }
              name="FormRegisterUI__email"
              defaultValue = { props.email}
            />
            <input
              className="FormRegister__email_conf"
              type="email"
              placeholder={ props.copy.confirm }
              name="FormRegisterUI__email_confirmation"
              defaultValue = { props.email}
            />
            <input
              className="FormRegister__fname"
              type="text"
              placeholder={ props.copy.nombre }
              name="FormRegisterUI__fname"
            />
            <input
              className="FormRegister__lname"
              type="text"
              placeholder={ props.copy.apellido }
              name="FormRegisterUI__lname"
              id="fieldLastname"
            />
            <div className="FormRegister__fnacimiento">
              <select name="FormRegisterUI__day">
                <option value="-" selected>
                { props.copy.dia }
                </option>
                {getNumbers(1, 31)}
              </select>
              <select name="FormRegisterUI__month">
                <option value="-" selected>
                { props.copy.mes }
                </option>
                {getNumbers(1, 12)}
              </select>
              <select name="FormRegisterUI__year">
                <option value="-" selected>
                { props.copy.ano }
                </option>
                {getNumbers(2000, 1900)}
              </select>
              <div className="FormRegister__birthtext">
                { props.copy.birthtext }
              </div>
            </div>
            <input
              className="FormRegister__tel"
              type="text"
              placeholder={ props.copy.telefono }
              name="FormRegisterUI__phone"
            />
            <div className="FormRegister__paisciudad">
              <select name="FormRegisterUI__country" onChange={ (event) => { props.filterCities(event.target.selectedIndex) }}>
                <option value="" selected>
                { props.copy.pais }
                </option>
                { props.countries.map( (item, index) => {
                  return <option key={index} value={ item.value }>{ item.label }</option>
                })}
              </select>
              
              <select name="FormRegisterUI__city" id="fieldCity">
                <option value="" selected>
                { props.copy.ciudad }
                </option>
                { props.cities.map( (item, index) => {
                  return <option key={index} value={item.value}>{ item.label }</option>
                })}                
              </select>
              
            </div>
            <div className="FormRegister__acepto">
              <input type="checkbox" name="FormRegisterUI__terms"/>
              <span>
                { props.copy.terminos }

              </span>
            </div>
            { (props.error) && <p className="FormLogin__message_golden">{ props.error }</p> }
            <input className="Form__cta" type="submit" value={ props.copy.siguiente } />
          </form>
    </div>
  )
}   

export default FormRegisterUI;