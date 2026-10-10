$(document).ready(function() {
    
    // ==========================================
    // MODEL: Handles data and business logic
    // ==========================================
    const LoginModel = {
        validateEmail: function(email) {
            if (!email) return { valid: false, error: 'Please fill in all fields.' };
            if (!email.endsWith('@gmail.com')) return { valid: false, error: 'Email must end with @gmail.com.' };
            return { valid: true };
        },
        validatePassword: function(password) {
            if (!password) return { valid: false, error: 'Please fill in all fields.' };
            return { valid: true };
        },
        performLogin: function(email, password) {
            // Simulate an API call returning a promise
            return new Promise((resolve) => {
                setTimeout(() => {
                    resolve({ success: true, message: 'Login successful! Redirecting...' });
                }, 1500);
            });
        }
    };

    // ==========================================
    // VIEW: Handles all DOM interactions
    // ==========================================
    const LoginView = {
        // DOM Elements
        $form: $('#loginForm'),
        $email: $('#emailInput'),
        $password: $('#passwordInput'),
        $alert: $('#alertMessage'),
        $btn: $('#loginBtn'),
        $spinner: $('#loginSpinner'),

        // Getters
        getEmail: function() { return this.$email.val(); },
        getPassword: function() { return this.$password.val(); },
        
        // UI Updaters
        showAlert: function(message, type) {
            this.$alert.text(message)
                  .removeClass('d-none alert-success alert-danger')
                  .addClass('alert-' + type);
        },
        hideAlert: function() {
            this.$alert.addClass('d-none').removeClass('alert-success alert-danger');
        },
        setLoadingState: function(isLoading) {
            this.$btn.prop('disabled', isLoading);
            if (isLoading) {
                this.$spinner.removeClass('d-none');
            } else {
                this.$spinner.addClass('d-none');
            }
        },
        focusEmail: function() {
            this.$email.focus();
        },
        showRedirectMessage: function(message) {
            setTimeout(() => {
                this.$alert.text(message);
            }, 1000);
        }
    };

    // ==========================================
    // CONTROLLER: Connects Model and View
    // ==========================================
    const LoginController = {
        init: function() {
            // Bind form submission event to the controller's handler
            LoginView.$form.on('submit', this.handleLogin.bind(this));
        },
        
        handleLogin: function(e) {
            e.preventDefault();
            LoginView.hideAlert();
            
            const email = LoginView.getEmail();
            const password = LoginView.getPassword();
            
            // 1. Ask Model to validate
            const emailValidation = LoginModel.validateEmail(email);
            if (!emailValidation.valid) {
                LoginView.showAlert(emailValidation.error, 'danger');
                if (emailValidation.error.includes('@gmail.com')) {
                    LoginView.focusEmail();
                }
                return;
            }
            
            const passValidation = LoginModel.validatePassword(password);
            if (!passValidation.valid) {
                LoginView.showAlert(passValidation.error, 'danger');
                return;
            }
            
            // 2. Ask View to update loading state
            LoginView.setLoadingState(true);
            
            // 3. Ask Model to perform login
            LoginModel.performLogin(email, password).then((response) => {
                // 4. Update View based on Model's response
                LoginView.setLoadingState(false);
                if (response.success) {
                    LoginView.showAlert(response.message, 'success');
                    LoginView.showRedirectMessage('Redirected to dashboard.');
                }
            });
        }
    };

    // Initialize the application
    LoginController.init();
});
