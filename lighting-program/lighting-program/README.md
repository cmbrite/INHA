# INHA Security Lighting – Public Site

This repo hosts the **public sign-up form** for the Iron Horse Neighborhood Association Security Lighting Program (GitHub Pages).

### Files
- `index.html` – light-themed form with logo, consent, validation, inventory estimate
- `style.css` – styling
- `app.js` – client-side logic and submission to the backend
- `assets/logo.png`, `assets/favicon.png`

### Setup
1) Deploy the Google Apps Script backend (I'll supply code next).  
2) Edit `index.html` and set your Apps Script URL:
```html
<script>
  window.GAS_URL = "YOUR_DEPLOYED_APPS_SCRIPT_URL";
  window.PUBLIC_SETTINGS = { budget:1000, costPerLight:18, distributed:0 };
</script>
```
3) Push to GitHub Pages (e.g., `cmbrite/Portfolio`).