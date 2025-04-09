// document.addEventListener('DOMContentLoaded', () => {
//     const form = document.getElementById('checkoutForm');
//     const successMessage = document.getElementById('successMessage');
  
//     form.addEventListener('submit', function (e) {
//       e.preventDefault(); // prevent submission until we validate
//       let isValid = true;
  
//       // Clear previous error styles/messages
//       const fields = form.querySelectorAll('input, textarea');
//       fields.forEach(field => {
//         field.classList.remove('invalid');
//         const error = field.nextElementSibling;
//         if (error && error.classList.contains('error-message')) {
//           error.textContent = '';
//           error.style.display = 'none';
//         }
//       });
  
//       // Full Name validation
//       const fullName = form.fullName;
//       if (!/^[A-Za-z\s]+$/.test(fullName.value.trim())) {
//         showError(fullName, 'Full Name should contain only letters.');
//         isValid = false;
//       }
  
//       // Email validation (HTML5 handles most, we enhance)
//       const email = form.email;
//       if (!email.validity.valid) {
//         showError(email, 'Please enter a valid email address.');
//         isValid = false;
//       }
  
//       // Phone Number validation
//       const phone = form.phone;
//       if (!/^\d{10,15}$/.test(phone.value.trim())) {
//         showError(phone, 'Phone number must be 10 to 15 digits.');
//         isValid = false;
//       }
  
//       // Address
//       const address = form.address;
//       if (address.value.trim() === '') {
//         showError(address, 'Address is required.');
//         isValid = false;
//       }
  
//       // Credit Card Number
//       const card = form.cardNumber;
//       if (!/^\d{16}$/.test(card.value.trim())) {
//         showError(card, 'Credit card number must be exactly 16 digits.');
//         isValid = false;
//       }
  
//       // Expiry Date - must be in future
//       const expiry = form.expiry;
//       const now = new Date();
//       const [expYear, expMonth] = expiry.value.split('-').map(Number);
//       const expDate = new Date(expYear, expMonth - 1);
//       if (!expiry.value || expDate < new Date(now.getFullYear(), now.getMonth())) {
//         showError(expiry, 'Expiry date must be in the future.');
//         isValid = false;
//       }
  
//       // CVV
//       const cvv = form.cvv;
//       if (!/^\d{3}$/.test(cvv.value.trim())) {
//         showError(cvv, 'CVV must be exactly 3 digits.');
//         isValid = false;
//       }
  
//       // Final submission
//       if (isValid) {
//         form.reset();
//         successMessage.style.display = 'block';
//         setTimeout(() => {
//           successMessage.style.display = 'none';
//         }, 4000);
//       }
//     });
  
//     function showError(input, message) {
//       const error = input.nextElementSibling;
//       input.classList.add('invalid');
//       if (error && error.classList.contains('error-message')) {
//         error.textContent = message;
//         error.style.display = 'block';
//       }
//     }
//   });
  

document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('checkoutForm');
    const fullNameInput = document.getElementById('fullName');
    const emailInput = document.getElementById('email');
    const phoneInput = document.getElementById('phone');
    const addressInput = document.getElementById('address');
    const cardNumberInput = document.getElementById('cardNumber');
    const expiryDateInput = document.getElementById('expiryDate');
    const cvvInput = document.getElementById('cvv');
    const errorMessages = document.querySelectorAll('.error-message');
    const successMessageDiv = document.getElementById('successMessage');

    // Function to display error message
    function displayError(inputElement, message) {
        const errorDivId = inputElement.id + 'Error';
        const errorDiv = document.getElementById(errorDivId);
        if (errorDiv) {
            errorDiv.textContent = message;
        }
        inputElement.classList.add('is-invalid');
    }

    // Function to clear error message
    function clearError(inputElement) {
        const errorDivId = inputElement.id + 'Error';
        const errorDiv = document.getElementById(errorDivId);
        if (errorDiv) {
            errorDiv.textContent = '';
        }
        inputElement.classList.remove('is-invalid');
    }

    // Custom validation for Full Name (only alphabets)
    fullNameInput.addEventListener('input', function() {
        if (!/^[A-Za-z\s]+$/.test(this.value)) {
            displayError(this, 'Only alphabets and spaces are allowed.');
        } else {
            clearError(this);
        }
    });

    // Custom validation for Email (basic email format check) - HTML5 handles most of this
    emailInput.addEventListener('input', function() {
        if (this.validity.typeMismatch) {
            displayError(this, 'Please enter a valid email address.');
        } else {
            clearError(this);
        }
    });

    // Custom validation for Phone Number (only digits, min/max length) - HTML5 handles most of this
    phoneInput.addEventListener('input', function() {
        if (this.validity.patternMismatch) {
            displayError(this, 'Only digits are allowed.');
        } else if (this.validity.tooShort) {
            displayError(this, `Phone number must be at least ${this.minLength} digits.`);
        } else if (this.validity.tooLong) {
            displayError(this, `Phone number must be at most ${this.maxLength} digits.`);
        } else {
            clearError(this);
        }
    });

    // Custom validation for Address (required) - HTML5 handles this
    addressInput.addEventListener('input', function() {
        if (this.validity.valueMissing) {
            displayError(this, 'Address is required.');
        } else {
            clearError(this);
        }
    });

    // Custom validation for Credit Card Number (16 digits, only numbers) - HTML5 handles most of this
    cardNumberInput.addEventListener('input', function() {
        if (this.validity.patternMismatch) {
            displayError(this, 'Must be a 16-digit number.');
        } else {
            clearError(this);
        }
    });

    // Custom validation for Expiry Date (must be a valid future date)
    expiryDateInput.addEventListener('input', function() {
        const selectedDate = new Date(this.value);
        const currentDate = new Date();
        currentDate.setHours(0, 0, 0, 0); // Compare only the date part

        if (this.validity.valueMissing) {
            displayError(this, 'Expiry date is required.');
        } else if (selectedDate <= currentDate) {
            displayError(this, 'Expiry date must be in the future.');
        } else {
            clearError(this);
        }
    });

    // Custom validation for CVV (exactly 3 digits) - HTML5 handles most of this
    cvvInput.addEventListener('input', function() {
        if (this.validity.patternMismatch) {
            displayError(this, 'Must be a 3-digit number.');
        } else {
            clearError(this);
        }
    });

    // Prevent form submission if any validation fails
    form.addEventListener('submit', function(event) {
        let isValid = true;

        // Trigger all input validations to show errors if any
        const inputs = this.querySelectorAll('input, textarea');
        inputs.forEach(input => {
            input.dispatchEvent(new Event('input')); // Trigger the input event listener
            if (!input.validity.valid) {
                isValid = false;
            }
        });

        if (!isValid) {
            event.preventDefault(); // Prevent form submission
            alert('Please correct the errors in the form.');
        } else {
            // Simulate successful submission
            event.preventDefault();
            successMessageDiv.style.display = 'block';
            form.reset();
            // Clear any remaining error messages after reset
            errorMessages.forEach(error => error.textContent = '');
            inputs.forEach(input => input.classList.remove('is-invalid'));
            setTimeout(() => {
                successMessageDiv.style.display = 'none';
            }, 3000);
        }
    });
});