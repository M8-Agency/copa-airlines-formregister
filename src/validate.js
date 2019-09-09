import Validator from "validatorjs";

export default function(formData, copy) {
  const data = {
    email: formData.email.value.toLowerCase(),
    emailConfirmation: formData.emailConfirmation.value.toLowerCase(),
    firstname: formData.firstname.value,
    lastname: formData.lastname.value,
    birthday: new Date(
      formData.year.value,
      formData.month.value - 1,
      formData.day.value
    ),
    phone: formData.phone.value,
    country: formData.country.value,
    city: formData.city.value,
    uid: formData.uid.value,
    terms: formData.terms.checked,
    news: formData.news.checked
  };

  const rules = {
    email: "required|email",
    emailConfirmation: "required|email",
    firstname: "required|alpha",
    lastname: "required|alpha",
    birthday: "date",
    phone: "required|numeric",
    country: "required",
    city: "required",
    terms: "accepted"
  };

  const attributes = {
    uid: copy.attribute.uid,
    email: copy.attribute.email,
    emailConfirmation: copy.attribute.emailConfirmation,
    firstname: copy.attribute.firstname,
    lastname: copy.attribute.lastname,
    birthday: copy.attribute.birthday,
    phone: copy.attribute.phone,
    country: copy.attribute.country,
    city: copy.attribute.city,
    terms: copy.attribute.terms
  };

  const errors = {
    required: copy.error.required,
    email: copy.error.email,
    accepted: copy.error.accepted,
    date: copy.error.date,
    alpha: copy.error.alpha,
    numeric: copy.error.numeric
  };

  var validation = new Validator(data, rules, errors);
  validation.setAttributeNames(attributes);

  let responseObject = {
    valid: false,
    message: "",
    data
  };

  if (data.email === data.emailConfirmation) {
    validation.passes(() => {
      //Nuevo formato para guardar fecha
      data.birthday = data.birthday.toISOString().split("T")[0];

      responseObject = {
        valid: true,
        message: "",
        data
      };
    });

    validation.fails(() => {
      const errors = validation.errors.all();
      const keyName = Object.keys(errors)[0];

      responseObject = {
        valid: false,
        message: errors[keyName][0],
        data
      };
    });
  } else {
    responseObject = {
      valid: false,
      message: "El email de confirmación no coincide",
      data
    };
  }

  return responseObject;
}
