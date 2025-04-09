function setStatus(field, message, status) {
    const successIcon = field.parentElement.querySelector('.icon-success')
    const errorIcon = field.parentElement.querySelector('.icon-error')
    const errorMessage = field.parentElement.querySelector('.error-message')
  
    if (status === "success") {
      if (errorIcon) { errorIcon.classList.add('hidden') }
      if (errorMessage) { errorMessage.innerText = "" }
      successIcon.classList.remove('hidden')
      field.classList.remove('input-error')
    }
  
    if (status === "error") {
      if (successIcon) { successIcon.classList.add('hidden') }
      errorMessage.innerText = message
      errorIcon.classList.remove('hidden')
      field.classList.add('input-error')
    }
  }
  
  function validateFields(field, form) {
    // Check presence of values
    if (field.value.trim() === "") {
      setStatus(field, `${field.previousElementSibling.innerText} cannot be blank`, "error")
    } else {
      setStatus(field, null, "success")
    }
  
    // Check for a valid email address
    if (field.type === "email") {
      const re = /\S+@\S+\.\S+/
      if (re.test(field.value)) {
        setStatus(field, null, "success")
      } else {
        setStatus(field, "Please enter valid email address", "error")
      }
    }
  
    // Password confirmation edge case
    if (field.id === "password_confirmation") {
      const passwordField = form.querySelector('#password')
  
      if (field.value.trim() == "") {
        setStatus(field, "Password confirmation required", "error")
      } else if (field.value != passwordField.value) {
        setStatus(field, "Password does not match", "error")
      } else {
        setStatus(field, null, "success")
      }
    }
  }
  
  function validateOnEntry(fields, form) {
    fields.forEach(fieldId => {
      const input = document.querySelector(`#${fieldId}`)
      
      input.addEventListener('input', event => {
        validateFields(input, form)
      })
    })
  }
  
  function validateOnSubmit(form, fields) {
    form.addEventListener('submit', e => {
      e.preventDefault()
  
      fields.forEach(fieldId => {
        const input = document.querySelector(`#${fieldId}`)
        validateFields(input, form)
      })
    })
  }
  
  function initializeValidator(form, fields) {
    validateOnEntry(fields, form)
    validateOnSubmit(form, fields)
  }
  
  const form = document.querySelector('.form')
  const fields = ["username", "email", "password", "password_confirmation"]
  
  initializeValidator(form, fields)
  