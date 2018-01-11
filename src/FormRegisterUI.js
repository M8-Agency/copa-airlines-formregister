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
            <input type="hidden" name="_token" value="" />
            <input type="hidden" name="referer" value="" />
            <input type="hidden" name="birthday" value="2000-01-01" />
            <input
              className="FormRegister__email"
              type="email"
              placeholder={ props.copy.email }
              name="email"
              defaultValue = { props.email}
            />
            <input
              className="FormRegister__email_conf"
              type="email"
              placeholder={ props.copy.confirm }
              name="email_confirmation"
              defaultValue = { props.email}
            />
            <input
              className="FormRegister__fname"
              type="text"
              placeholder={ props.copy.nombre }
              name="fname"
            />
            <input
              className="FormRegister__lname"
              type="text"
              placeholder={ props.copy.apellido }
              name="lname"
              id="fieldLastname"
            />
            <div className="FormRegister__fnacimiento">
              <select name="day">
                <option value="-" selected>
                { props.copy.dia }
                </option>
                {getNumbers(1, 31)}
              </select>
              <select name="month">
                <option value="-" selected>
                { props.copy.mes }
                </option>
                {getNumbers(1, 12)}
              </select>
              <select name="year">
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
              name="phone"
            />
            <div className="FormRegister__paisciudad">
              <select name="country" onChange={ (event) => { props.filterCities(event.target.value) }}>
                <option value="" selected>
                { props.copy.pais }
                </option>
                { props.countries.map( (item, index) => {
                  return <option key={index} value={ item.value }>{ item.label['es'] }</option>
                })}
              </select>
              
              <select name="city" id="fieldCity">
                <option value="" selected>
                { props.copy.ciudad }
                </option>
                { props.cities.map( (item, index) => {
                  return <option key={index} value={item.value}>{ item.label }</option>
                })}                
              </select>
              
            </div>
            <div className="FormRegister__acepto">
              <input type="checkbox" name="terms" value="1"/>
              <span>
                { props.copy.terminos }

              </span>
            </div>
            { (props.error) && <p className="FormLogin__message_golden">{ props.error }</p> }
            <input className="FormRegister__submit" type="submit" value={ props.copy.siguiente } />
          </form>
    </div>
  )
}   

export default FormRegisterUI;