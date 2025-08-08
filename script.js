// Form validation and handling
const form = document.getElementById('signupForm');
const submitBtn = document.getElementById('submitBtn');

// Validation patterns
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const phonePattern = /^[\+]?[1-9][\d]{0,15}$/;

// Initialize event listeners when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Real-time validation
    document.getElementById('firstName').addEventListener('input', validateFirstName);
    document.getElementById('lastName').addEventListener('input', validateLastName);
    document.getElementById('email').addEventListener('input', validateEmail);
    document.getElementById('password').addEventListener('input', validatePassword);
    document.getElementById('confirmPassword').addEventListener('input', validateConfirmPassword);
    document.getElementById('phone').addEventListener('input', validatePhone);

    // Form submission
    form.addEventListener('submit', handleFormSubmission);

    // Add interactive effects
    addInteractiveEffects();
});

function validateFirstName() {
    const firstName = document.getElementById('firstName');
    const error = document.getElementById('firstNameError');
    
    if (firstName.value.trim().length < 2) {
        showError(firstName, error, 'First name must be at least 2 characters long');
        return false;
    } else {
        showSuccess(firstName, error);
        return true;
    }
}

function validateLastName() {
    const lastName = document.getElementById('lastName');
    const error = document.getElementById('lastNameError');
    
    if (lastName.value.trim().length < 2) {
        showError(lastName, error, 'Last name must be at least 2 characters long');
        return false;
    } else {
        showSuccess(lastName, error);
        return true;
    }
}

function validateEmail() {
    const email = document.getElementById('email');
    const error = document.getElementById('emailError');
    const success = document.getElementById('emailSuccess');
    
    if (!emailPattern.test(email.value)) {
        showError(email, error, 'Please enter a valid email address');
        success.style.display = 'none';
        return false;
    } else {
        showSuccess(email, error);
        success.textContent = 'Email looks good!';
        success.style.display = 'block';
        return true;
    }
}

function validatePassword() {
    const password = document.getElementById('password');
    const error = document.getElementById('passwordError');
    const strength = document.getElementById('passwordStrength');
    
    const value = password.value;
    let score = 0;
    let feedback = '';

    if (value.length < 8) {
        showError(password, error, 'Password must be at least 8 characters long');
        strength.style.display = 'none';
        return false;
    }

    // Calculate password strength
    if (value.length >= 8) score++;
    if (/[a-z]/.test(value)) score++;
    if (/[A-Z]/.test(value)) score++;
    if (/[0-9]/.test(value)) score++;
    if (/[^A-Za-z0-9]/.test(value)) score++;

    if (score < 3) {
        feedback = 'Weak password';
        strength.className = 'password-strength strength-weak';
    } else if (score < 5) {
        feedback = 'Medium strength password';
        strength.className = 'password-strength strength-medium';
    } else {
        feedback = 'Strong password!';
        strength.className = 'password-strength strength-strong';
    }

    strength.textContent = feedback;
    strength.style.display = 'block';
    showSuccess(password, error);
    
    // Revalidate confirm password if it has content
    if (document.getElementById('confirmPassword').value) {
        validateConfirmPassword();
    }
    
    return true;
}

function validateConfirmPassword() {
    const password = document.getElementById('password');
    const confirmPassword = document.getElementById('confirmPassword');
    const error = document.getElementById('confirmPasswordError');
    
    if (confirmPassword.value !== password.value) {
        showError(confirmPassword, error, 'Passwords do not match');
        return false;
    } else {
        showSuccess(confirmPassword, error);
        return true;
    }
}

function validatePhone() {
    const phone = document.getElementById('phone');
    const error = document.getElementById('phoneError');
    
    if (phone.value && !phonePattern.test(phone.value)) {
        showError(phone, error, 'Please enter a valid phone number');
        return false;
    } else {
        showSuccess(phone, error);
        return true;
    }
}

function showError(input, errorElement, message) {
    input.classList.remove('success');
    input.classList.add('error');
    errorElement.textContent = message;
    errorElement.style.display = 'block';
}

function showSuccess(input, errorElement) {
    input.classList.remove('error');
    input.classList.add('success');
    errorElement.style.display = 'none';
}

function handleFormSubmission(e) {
    e.preventDefault();
    
    // Validate all fields
    const isValid = validateFirstName() && 
                   validateLastName() && 
                   validateEmail() && 
                   validatePassword() && 
                   validateConfirmPassword() && 
                   validatePhone() &&
                   document.getElementById('terms').checked;

    if (!document.getElementById('terms').checked) {
        alert('Please accept the Terms and Conditions to continue.');
        return;
    }

    if (isValid) {
        // Simulate form submission
        submitBtn.textContent = 'Creating Account...';
        submitBtn.disabled = true;

        setTimeout(() => {
            // Show success popup
            const popup = document.getElementById('successPopup');
            popup.style.display = 'block';
            
            // Reset form
            form.reset();
            
            // Remove all styling
            const inputs = form.querySelectorAll('input');
            inputs.forEach(input => {
                input.classList.remove('success', 'error');
            });
            
            // Hide all error/success messages
            const messages = form.querySelectorAll('.error-message, .success-message, .password-strength');
            messages.forEach(msg => msg.style.display = 'none');
            
            // Reset button
            submitBtn.textContent = 'Create Account';
            submitBtn.disabled = false;
            
            // Hide popup after 4 seconds
            setTimeout(() => {
                popup.style.display = 'none';
            }, 4000);
            
        }, 2000);
    }
}

// Additional functions for demo purposes
function showTerms() {
    alert('Terms and Conditions:\n\n1. You must be 18+ years old to create an account.\n2. You agree to provide accurate information.\n3. You are responsible for maintaining account security.\n4. We respect your privacy and will protect your data.\n\n(This is a demo - in a real application, this would link to your actual terms page)');
}

function showLogin() {
    alert('This would redirect to the login page in a real application.');
}

// Add interactive effects to inputs
function addInteractiveEffects() {
    const inputs = document.querySelectorAll('input');
    inputs.forEach(input => {
        input.addEventListener('focus', function() {
            this.style.transform = 'scale(1.02)';
        });
        
        input.addEventListener('blur', function() {
            this.style.transform = 'scale(1)';
        });
    });
}
