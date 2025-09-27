// Form validation object to track validity of each field
const formValidation = {
    firstName: false,
    lastName: false,
    phone: false,
    email: false,
    password: false,
    confirmPassword: false
};

// Get all form elements
const form = document.getElementById('validationForm');
const submitBtn = document.getElementById('submitBtn');
const submissionMessage = document.getElementById('submissionMessage');

// First Name Validation (Max 3 characters)
const firstNameInput = document.getElementById('firstName');
firstNameInput.addEventListener('input', function() {
    const value = this.value.trim();
    const errorMsg = this.parentElement.querySelector('.error-message');
    const successMsg = this.parentElement.querySelector('.success-message');
    const icon = this.parentElement.querySelector('.input-icon');

    if (value.length > 0 && value.length <= 3) {
        this.classList.remove('invalid');
        this.classList.add('valid');
        errorMsg.classList.remove('show');
        successMsg.classList.add('show');
        icon.classList.remove('invalid');
        icon.classList.add('valid');
        icon.textContent = '✓';
        formValidation.firstName = true;
    } else if (value.length > 3) {
        this.classList.remove('valid');
        this.classList.add('invalid');
        errorMsg.classList.add('show');
        successMsg.classList.remove('show');
        icon.classList.remove('valid');
        icon.classList.add('invalid');
        icon.textContent = '✗';
        formValidation.firstName = false;
    } else {
        this.classList.remove('valid', 'invalid');
        errorMsg.classList.remove('show');
        successMsg.classList.remove('show');
        icon.classList.remove('valid', 'invalid');
        formValidation.firstName = false;
    }
    checkFormValidity();
});
// Last Name Validation (Max 10 characters)
const lastNameInput = document.getElementById('lastName');
lastNameInput.addEventListener('input', function() {
    const value = this.value.trim();
    const errorMsg = this.parentElement.querySelector('.error-message');
    const successMsg = this.parentElement.querySelector('.success-message');
    const icon = this.parentElement.querySelector('.input-icon');

    if (value.length > 0 && value.length <= 10) {
        this.classList.remove('invalid');
        this.classList.add('valid');
        errorMsg.classList.remove('show');
        successMsg.classList.add('show');
        icon.classList.remove('invalid');
        icon.classList.add('valid');
        icon.textContent = '✓';
        formValidation.lastName = true;
    } else if (value.length > 10) {
        this.classList.remove('valid');
        this.classList.add('invalid');
        errorMsg.classList.add('show');
        successMsg.classList.remove('show');
        icon.classList.remove('valid');
        icon.classList.add('invalid');
        icon.textContent = '✗';
        formValidation.lastName = false;
    } else {
        this.classList.remove('valid', 'invalid');
        errorMsg.classList.remove('show');
        successMsg.classList.remove('show');
        icon.classList.remove('valid', 'invalid');
        formValidation.lastName = false;
    }
    checkFormValidity();
});

// Phone Number Validation
const phoneInput = document.getElementById('phone');
phoneInput.addEventListener('input', function() {
    const value = this.value.trim();
    const phoneRegex = /^(\d{3}-\d{3}-\d{4}|\d{10})$/;
    const errorMsg = this.parentElement.querySelector('.error-message');
    const successMsg = this.parentElement.querySelector('.success-message');
    const icon = this.parentElement.querySelector('.input-icon');

    if (phoneRegex.test(value)) {
        this.classList.remove('invalid');
        this.classList.add('valid');
        errorMsg.classList.remove('show');
        successMsg.classList.add('show');
        icon.classList.remove('invalid');
        icon.classList.add('valid');
        icon.textContent = '✓';
        formValidation.phone = true;
    } else if (value.length > 0) {
        this.classList.remove('valid');
        this.classList.add('invalid');
        errorMsg.classList.add('show');
        successMsg.classList.remove('show');
        icon.classList.remove('valid');
        icon.classList.add('invalid');
        icon.textContent = '✗';
        formValidation.phone = false;
    } else {
        this.classList.remove('valid', 'invalid');
        errorMsg.classList.remove('show');
        successMsg.classList.remove('show');
        icon.classList.remove('valid', 'invalid');
        formValidation.phone = false;
    }
    checkFormValidity();
});

// Email Validation
const emailInput = document.getElementById('email');
emailInput.addEventListener('input', function() {
    const value = this.value.trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const errorMsg = this.parentElement.querySelector('.error-message');
    const successMsg = this.parentElement.querySelector('.success-message');
    const icon = this.parentElement.querySelector('.input-icon');

    if (emailRegex.test(value)) {
        this.classList.remove('invalid');
        this.classList.add('valid');
        errorMsg.classList.remove('show');
        successMsg.classList.add('show');
        icon.classList.remove('invalid');
        icon.classList.add('valid');
        icon.textContent = '✓';
        formValidation.email = true;
    } else if (value.length > 0) {
        this.classList.remove('valid');
        this.classList.add('invalid');
        errorMsg.classList.add('show');
        successMsg.classList.remove('show');
        icon.classList.remove('valid');
        icon.classList.add('invalid');
        icon.textContent = '✗';
        formValidation.email = false;
    } else {
        this.classList.remove('valid', 'invalid');
        errorMsg.classList.remove('show');
        successMsg.classList.remove('show');
        icon.classList.remove('valid', 'invalid');
        formValidation.email = false;
    }
    checkFormValidity();
});

// Password Validation
const passwordInput = document.getElementById('password');
passwordInput.addEventListener('input', function() {
    const value = this.value;
    const icon = this.parentElement.querySelector('.input-icon');

    // Requirements
    const hasLength = value.length >= 8;
    const hasUppercase = /[A-Z]/.test(value);
    const hasLowercase = /[a-z]/.test(value);
    const hasDigit = /\d/.test(value);
    const hasSpecial = /[!@#$%^&*(),.?":{}|<>]/.test(value);

    // Update requirement indicators
    document.getElementById('length').classList.toggle('met', hasLength);
    document.getElementById('uppercase').classList.toggle('met', hasUppercase);
    document.getElementById('lowercase').classList.toggle('met', hasLowercase);
    document.getElementById('digit').classList.toggle('met', hasDigit);
    document.getElementById('special').classList.toggle('met', hasSpecial);

    // Check if all requirements are met
    if (hasLength && hasUppercase && hasLowercase && hasDigit && hasSpecial) {
        this.classList.remove('invalid');
        this.classList.add('valid');
        icon.classList.remove('invalid');
        icon.classList.add('valid');
        icon.textContent = '✓';
        formValidation.password = true;
    } else if (value.length > 0) {
        this.classList.remove('valid');
        this.classList.add('invalid');
        icon.classList.remove('valid');
        icon.classList.add('invalid');
        icon.textContent = '✗';
        formValidation.password = false;
    } else {
        this.classList.remove('valid', 'invalid');
        icon.classList.remove('valid', 'invalid');
        formValidation.password = false;
        // Reset requirement indicators
        document.querySelectorAll('.requirement').forEach(req => req.classList.remove('met'));
    }

    // Also check confirm password if it has a value
    if (confirmPasswordInput.value) {
        validateConfirmPassword();
    }

    checkFormValidity();
});

// Confirm Password Validation
const confirmPasswordInput = document.getElementById('confirmPassword');
confirmPasswordInput.addEventListener('input', validateConfirmPassword);

function validateConfirmPassword() {
    const value = confirmPasswordInput.value;
    const passwordValue = passwordInput.value;
    const errorMsg = confirmPasswordInput.parentElement.querySelector('.error-message');
    const successMsg = confirmPasswordInput.parentElement.querySelector('.success-message');
    const icon = confirmPasswordInput.parentElement.querySelector('.input-icon');

    if (value && value === passwordValue) {
        confirmPasswordInput.classList.remove('invalid');
        confirmPasswordInput.classList.add('valid');
        errorMsg.classList.remove('show');
        successMsg.classList.add('show');
        icon.classList.remove('invalid');
        icon.classList.add('valid');
        icon.textContent = '✓';
        formValidation.confirmPassword = true;
    } else if (value) {
        confirmPasswordInput.classList.remove('valid');
        confirmPasswordInput.classList.add('invalid');
        errorMsg.classList.add('show');
        successMsg.classList.remove('show');
        icon.classList.remove('valid');
        icon.classList.add('invalid');
        icon.textContent = '✗';
        formValidation.confirmPassword = false;
    } else {
        confirmPasswordInput.classList.remove('valid', 'invalid');
        errorMsg.classList.remove('show');
        successMsg.classList.remove('show');
        icon.classList.remove('valid', 'invalid');
        formValidation.confirmPassword = false;
    }
    checkFormValidity();
}

// Check overall form validity
function checkFormValidity() {
    const isValid = Object.values(formValidation).every(value => value === true);
    submitBtn.disabled = !isValid;
}

// Form submission
form.addEventListener('submit', function(e) {
    e.preventDefault();

    const isValid = Object.values(formValidation).every(value => value === true);

    if (isValid) {
        submissionMessage.className = 'submission-message success';
        submissionMessage.textContent = '🎉 Form submitted successfully! Your account has been created.';

        setTimeout(() => {
            form.reset();
            document.querySelectorAll('input').forEach(input => {
                input.classList.remove('valid', 'invalid');
            });
            document.querySelectorAll('.error-message, .success-message').forEach(msg => {
                msg.classList.remove('show');
            });
            document.querySelectorAll('.input-icon').forEach(icon => {
                icon.classList.remove('valid', 'invalid');
            });
            document.querySelectorAll('.requirement').forEach(req => {
                req.classList.remove('met');
            });
            Object.keys(formValidation).forEach(key => {
                formValidation[key] = false;
            });
            submitBtn.disabled = true;
            submissionMessage.className = 'submission-message';
        }, 3000);
    } else {
        submissionMessage.className = 'submission-message error';
        submissionMessage.textContent = '❌ Please correct all errors before submitting.';

        setTimeout(() => {
            submissionMessage.className = 'submission-message';
        }, 3000);
    }
});
