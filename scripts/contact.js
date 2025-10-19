
// contact form 1
function validateForm() {
    var name = document.getElementById("name").value;
    var email = document.getElementById("email").value;
    var message = document.getElementById("message1").value;

    if (name == "" || email == "" || message == "") {
        alert("All fields must be filled out");
        return false;
    }

    if (!validateEmail(email)) {
        alert("Invalid email address");
        return false;
    }

    return true;
}

function validateEmail(email) {
    var re = /\S+@\S+\.\S+/;
    return re.test(email);
}

// Enhanced form submission with better feedback
document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('myForm');
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            if (validateForm()) {
                // Show loading state
                const submitBtn = form.querySelector('input[type="submit"]');
                const originalValue = submitBtn.value;
                submitBtn.value = 'Sending...';
                submitBtn.disabled = true;
                
                // Simulate form submission (replace with actual service)
                setTimeout(() => {
                    alert('Thank you for your message! I\'ll get back to you soon.');
                    form.reset();
                    submitBtn.value = originalValue;
                    submitBtn.disabled = false;
                }, 2000);
            }
        });
    }
});
