// Contact Service Module - Handles form submissions
export class ContactService {
    constructor() {
        // Configuration for different contact services
        this.services = {
            formspree: {
                endpoint: 'https://formspree.io/f/YOUR_FORM_ID',
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                }
            },
            netlify: {
                endpoint: '/',
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            },
            emailjs: {
                serviceId: 'YOUR_SERVICE_ID',
                templateId: 'YOUR_TEMPLATE_ID',
                userId: 'YOUR_USER_ID'
            }
        };
        
        this.currentService = 'formspree'; // Change this to your preferred service
    }

    async submitForm(formData) {
        try {
            switch (this.currentService) {
                case 'formspree':
                    return await this.submitToFormspree(formData);
                case 'netlify':
                    return await this.submitToNetlify(formData);
                case 'emailjs':
                    return await this.submitToEmailJS(formData);
                default:
                    throw new Error('Invalid contact service configured');
            }
        } catch (error) {
            console.error('Contact form submission error:', error);
            throw new Error('Failed to send message. Please try again later.');
        }
    }

    async submitToFormspree(formData) {
        const response = await fetch(this.services.formspree.endpoint, {
            method: this.services.formspree.method,
            headers: this.services.formspree.headers,
            body: JSON.stringify({
                name: formData.name,
                email: formData.email,
                subject: formData.subject,
                message: formData.message,
                _replyto: formData.email,
                _subject: `Portfolio Contact: ${formData.subject}`
            })
        });

        if (!response.ok) {
            throw new Error('Form submission failed');
        }

        return {
            success: true,
            message: 'Message sent successfully! I\'ll get back to you soon.'
        };
    }

    async submitToNetlify(formData) {
        const netlifyFormData = new FormData();
        netlifyFormData.append('form-name', 'contact');
        netlifyFormData.append('name', formData.name);
        netlifyFormData.append('email', formData.email);
        netlifyFormData.append('subject', formData.subject);
        netlifyFormData.append('message', formData.message);

        const response = await fetch(this.services.netlify.endpoint, {
            method: this.services.netlify.method,
            headers: this.services.netlify.headers,
            body: netlifyFormData
        });

        if (!response.ok) {
            throw new Error('Form submission failed');
        }

        return {
            success: true,
            message: 'Message sent successfully! I\'ll get back to you soon.'
        };
    }

    async submitToEmailJS(formData) {
        // Load EmailJS library if not already loaded
        if (typeof emailjs === 'undefined') {
            await this.loadEmailJSLibrary();
        }

        const templateParams = {
            from_name: formData.name,
            from_email: formData.email,
            subject: formData.subject,
            message: formData.message,
            to_name: 'Nikhil'
        };

        try {
            await emailjs.send(
                this.services.emailjs.serviceId,
                this.services.emailjs.templateId,
                templateParams,
                this.services.emailjs.userId
            );

            return {
                success: true,
                message: 'Message sent successfully! I\'ll get back to you soon.'
            };
        } catch (error) {
            throw new Error('Email service error');
        }
    }

    async loadEmailJSLibrary() {
        return new Promise((resolve, reject) => {
            const script = document.createElement('script');
            script.src = 'https://cdn.jsdelivr.net/npm/@emailjs/browser@3/dist/email.min.js';
            script.onload = () => {
                emailjs.init(this.services.emailjs.userId);
                resolve();
            };
            script.onerror = reject;
            document.head.appendChild(script);
        });
    }

    // Method to configure the service
    configureService(serviceName, config) {
        if (this.services[serviceName]) {
            this.services[serviceName] = { ...this.services[serviceName], ...config };
        }
    }

    // Method to set the current service
    setService(serviceName) {
        if (this.services[serviceName]) {
            this.currentService = serviceName;
        } else {
            console.warn(`Service ${serviceName} not found`);
        }
    }
}

// Alternative: Simple email service using mailto
export class SimpleContactService {
    constructor() {
        this.email = 'nikhil@example.com'; // Replace with your email
    }

    async submitForm(formData) {
        const subject = encodeURIComponent(`Portfolio Contact: ${formData.subject}`);
        const body = encodeURIComponent(
            `Name: ${formData.name}\n` +
            `Email: ${formData.email}\n` +
            `Subject: ${formData.subject}\n\n` +
            `Message:\n${formData.message}`
        );
        
        const mailtoLink = `mailto:${this.email}?subject=${subject}&body=${body}`;
        
        // Open default email client
        window.location.href = mailtoLink;
        
        return {
            success: true,
            message: 'Email client opened. Please send the email to complete the process.'
        };
    }
}
