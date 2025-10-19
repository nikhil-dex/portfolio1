# 🚀 Deployment Guide

This guide covers various deployment options for your modern portfolio website.

## 📋 Prerequisites

- Node.js (v14 or higher)
- Git repository
- Domain name (optional)

## 🌐 Deployment Options

### 1. Netlify (Recommended)

**Free tier includes:**
- Custom domain
- HTTPS
- Form handling
- CDN
- Continuous deployment

#### Steps:

1. **Connect your repository**
   ```bash
   # Push your code to GitHub/GitLab
   git add .
   git commit -m "Modern portfolio ready for deployment"
   git push origin main
   ```

2. **Deploy to Netlify**
   - Go to [netlify.com](https://netlify.com)
   - Click "New site from Git"
   - Connect your repository
   - Build settings:
     - Build command: `npm run build`
     - Publish directory: `.`
   - Click "Deploy site"

3. **Configure custom domain** (optional)
   - Go to Site settings → Domain management
   - Add your custom domain
   - Update DNS records as instructed

### 2. Vercel

**Free tier includes:**
- Custom domain
- HTTPS
- Global CDN
- Serverless functions

#### Steps:

1. **Install Vercel CLI**
   ```bash
   npm i -g vercel
   ```

2. **Deploy**
   ```bash
   vercel
   ```

3. **Follow the prompts**
   - Link to existing project or create new
   - Configure build settings
   - Deploy

### 3. GitHub Pages

**Free with GitHub account**

#### Steps:

1. **Enable GitHub Pages**
   - Go to repository Settings
   - Scroll to "Pages" section
   - Source: Deploy from a branch
   - Branch: `main`
   - Folder: `/ (root)`

2. **Add GitHub Actions** (optional)
   Create `.github/workflows/deploy.yml`:
   ```yaml
   name: Deploy to GitHub Pages
   
   on:
     push:
       branches: [ main ]
   
   jobs:
     deploy:
       runs-on: ubuntu-latest
       steps:
         - uses: actions/checkout@v2
         - name: Setup Node.js
           uses: actions/setup-node@v2
           with:
             node-version: '18'
         - name: Install dependencies
           run: npm install
         - name: Build
           run: npm run build
         - name: Deploy
           uses: peaceiris/actions-gh-pages@v3
           with:
             github_token: ${{ secrets.GITHUB_TOKEN }}
             publish_dir: ./
   ```

### 4. Firebase Hosting

**Free tier includes:**
- Custom domain
- HTTPS
- Global CDN

#### Steps:

1. **Install Firebase CLI**
   ```bash
   npm install -g firebase-tools
   ```

2. **Initialize Firebase**
   ```bash
   firebase login
   firebase init hosting
   ```

3. **Configure firebase.json**
   ```json
   {
     "hosting": {
       "public": ".",
       "ignore": [
         "firebase.json",
         "**/.*",
         "**/node_modules/**"
       ],
       "rewrites": [
         {
           "source": "**",
           "destination": "/index.html"
         }
       ]
     }
   }
   ```

4. **Deploy**
   ```bash
   firebase deploy
   ```

## 🔧 Environment Configuration

### Contact Form Setup

#### Option 1: Formspree (Recommended)

1. **Sign up at [formspree.io](https://formspree.io)**
2. **Create a new form**
3. **Update contact service configuration**
   ```javascript
   // In js/modules/contact-service.js
   this.services.formspree.endpoint = 'https://formspree.io/f/YOUR_FORM_ID';
   ```

#### Option 2: Netlify Forms

1. **Add netlify attribute to form**
   ```html
   <form name="contact" method="POST" data-netlify="true">
   ```

2. **Update contact service**
   ```javascript
   this.contactService.setService('netlify');
   ```

#### Option 3: EmailJS

1. **Sign up at [emailjs.com](https://emailjs.com)**
2. **Create email service and template**
3. **Update configuration**
   ```javascript
   this.services.emailjs = {
     serviceId: 'YOUR_SERVICE_ID',
     templateId: 'YOUR_TEMPLATE_ID',
     userId: 'YOUR_USER_ID'
   };
   ```

### Analytics Setup

#### Google Analytics 4

1. **Create GA4 property**
2. **Add tracking code to HTML**
   ```html
   <!-- Google tag (gtag.js) -->
   <script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
   <script>
     window.dataLayer = window.dataLayer || [];
     function gtag(){dataLayer.push(arguments);}
     gtag('js', new Date());
     gtag('config', 'GA_MEASUREMENT_ID');
   </script>
   ```

## 🚀 Performance Optimization

### Pre-deployment Checklist

- [ ] Minify CSS and JavaScript
- [ ] Optimize images
- [ ] Enable compression
- [ ] Set up CDN
- [ ] Configure caching headers
- [ ] Run Lighthouse audit

### Build Commands

```bash
# Development
npm run dev

# Production build
npm run build

# Performance audit
npm run lighthouse
```

## 🔒 Security Headers

The `netlify.toml` file includes security headers. For other platforms, add these headers:

```http
X-Frame-Options: DENY
X-XSS-Protection: 1; mode=block
X-Content-Type-Options: nosniff
Referrer-Policy: strict-origin-when-cross-origin
Content-Security-Policy: default-src 'self'; script-src 'self' 'unsafe-inline' https://cdnjs.cloudflare.com; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com; img-src 'self' data:; connect-src 'self';
```

## 📊 Monitoring & Analytics

### Performance Monitoring

1. **Google PageSpeed Insights**
2. **WebPageTest.org**
3. **Lighthouse CI**

### Error Monitoring

1. **Sentry** (free tier available)
2. **LogRocket** (free tier available)

## 🔄 Continuous Deployment

### GitHub Actions Example

```yaml
name: Deploy Portfolio

on:
  push:
    branches: [ main ]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - name: Setup Node.js
        uses: actions/setup-node@v2
        with:
          node-version: '18'
      - name: Install dependencies
        run: npm install
      - name: Build
        run: npm run build
      - name: Deploy to Netlify
        uses: nwtgck/actions-netlify@v1.2
        with:
          publish-dir: '.'
          production-branch: main
          github-token: ${{ secrets.GITHUB_TOKEN }}
          deploy-message: "Deploy from GitHub Actions"
```

## 🎯 Domain Setup

### Custom Domain Configuration

1. **Purchase domain** (Namecheap, GoDaddy, etc.)
2. **Configure DNS records**
   - A record: Point to hosting provider IP
   - CNAME: www subdomain
3. **Update hosting provider settings**
4. **Enable HTTPS/SSL certificate**

## 📱 PWA Deployment

The portfolio includes PWA capabilities:

- **Manifest file**: `manifest.json`
- **Service worker**: Add for offline functionality
- **App icons**: Configure in manifest
- **Install prompts**: Automatic on supported browsers

## 🚨 Troubleshooting

### Common Issues

1. **Build failures**
   - Check Node.js version
   - Verify all dependencies installed
   - Check for syntax errors

2. **Contact form not working**
   - Verify service configuration
   - Check CORS settings
   - Test with different services

3. **Performance issues**
   - Optimize images
   - Minify assets
   - Enable compression
   - Use CDN

### Support Resources

- [Netlify Docs](https://docs.netlify.com/)
- [Vercel Docs](https://vercel.com/docs)
- [GitHub Pages Docs](https://docs.github.com/en/pages)
- [Firebase Hosting Docs](https://firebase.google.com/docs/hosting)

---

**Need help?** Check the main README.md or create an issue in the repository.
