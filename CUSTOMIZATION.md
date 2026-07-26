# Customization Cheat Sheet - Find & Replace Guide

## 🎨 How to Customize Your Website

Open `index.html` in any text editor and use Find & Replace (Ctrl+H) to make these changes:

---

## 1. Company Branding

### Change Company Name
**Find:**
```
NextGen AI
```
**Replace with:**
```
Your Company Name
```
*Appears in: Header, Footer, Hero, About sections*

### Change Company Description
**Find:**
```
Transforming businesses with cutting-edge AI solutions
```
**Replace with:**
```
Your company tagline here
```

---

## 2. Colors

### Change Primary Blue
**Find:**
```
#003366
```
**Replace with:**
```
#your-color-code
```
*Used for: Main text, headings, primary elements*

### Change Secondary Blue  
**Find:**
```
#0066cc
```
**Replace with:**
```
#your-color-code
```
*Used for: Buttons, links, secondary elements*

### Change Accent Cyan
**Find:**
```
#00d9ff
```
**Replace with:**
```
#your-color-code
```
*Used for: Highlights, accents, hover states*

---

## 3. Contact Information

### Phone Number
**Find:**
```
+1 (555) 123-4567
```
**Replace with:**
```
Your phone number
```

### Email
**Find:**
```
hello@nextgen-ai.com
```
**Replace with:**
```
Your email address
```

### Address
**Find:**
```
123 Tech Street, San Francisco, CA 94105
```
**Replace with:**
```
Your office address
```

### Business Hours
**Find:**
```
Monday - Friday: 9:00 AM - 6:00 PM
```
**Replace with:**
```
Your business hours
```

---

## 4. Hero Section

### Main Heading
**Find:**
```
Transform Your Business with Cutting-Edge AI Solutions
```
**Replace with:**
```
Your main headline
```

### Subheading
**Find:**
```
We deliver innovative AI and machine learning solutions that drive efficiency, innovation, and growth for your organization.
```
**Replace with:**
```
Your company tagline/description
```

### Stats (Left-aligned content under hero buttons)
**Find line numbers 550-570:**
```
500+ Projects Completed
98% Client Satisfaction
50+ Team Members
```
**Replace with your stats**

---

## 5. Services Section

### Service 1
**Find:**
```
<div class="service-icon"><i class="fas fa-brain"></i></div>
                <h3>AI Consulting</h3>
                <p>Strategic guidance to integrate AI into your business processes...</p>
```
**Replace with your service info**

*Repeat for Services 2-6 (look for next service-card divs)*

---

## 6. Portfolio / Case Studies

### Case Study 1
**Find:**
```
<div class="portfolio-content">
                    <h3>Predictive Analytics Platform</h3>
                    <p>Developed ML model for customer behavior prediction</p>
                </div>
```
**Replace with your project details**

*Repeat for Projects 2-6 (look for next portfolio-item divs)*

---

## 7. Team Members

### Team Member 1
**Find:**
```
<h3>Dr. Alex Chen</h3>
                <div class="team-role">CEO & Founder</div>
                <p class="team-bio">Ph.D. in Machine Learning with 15+ years in AI development</p>
```
**Replace with your team member details**

*Repeat for Team Members 2-4*

---

## 8. Blog Posts

### Blog Post 1
**Find:**
```
<div class="blog-date">May 2024</div>
                    <h3>The Future of AI in Business</h3>
                    <p>Exploring how artificial intelligence is reshaping industries...</p>
```
**Replace with your blog info**

*Repeat for Blog Posts 2-3*

---

## 9. Social Media Links

### Update Social Links in Footer
**Find:**
```
<a href="#" title="Facebook"><i class="fab fa-facebook-f"></i></a>
```
**Replace href="#" with:** `https://facebook.com/yourpage`

*Repeat for Twitter, LinkedIn, Instagram*

---

## 10. Quick Color Change (All At Once)

To change the entire color scheme:

1. **Find** `#003366` → **Replace all** with your primary color
2. **Find** `#0066cc` → **Replace all** with your secondary color  
3. **Find** `#00d9ff` → **Replace all** with your accent color

---

## 11. Logo/Favicon

### Replace Logo Text with Image
**Find (around line 180):**
```html
<div class="logo">
    <i class="fas fa-brain"></i> NextGen AI
</div>
```

**Replace with:**
```html
<img src="your-logo.png" alt="Your Company" class="logo" style="max-width: 200px;">
```

---

## 12. Open Graph / SEO

### Update Meta Tags
**Find (in <head> section):**
```html
<title>NextGen AI Solution - Professional AI Services</title>
```

**Replace with:**
```html
<title>Your Company - Your Tagline</title>
```

---

## 📋 Step-by-Step Customization Guide

1. **Open** `index.html` in any text editor (VS Code recommended)
2. **Use Ctrl+H** to open Find & Replace
3. **Copy find phrases** from above
4. **Paste replace content** with your info
5. **Click Replace All** or **Replace** individually
6. **Save** the file
7. **Open in browser** to see changes

---

## 🎨 Styling Customization

### Change Font (currently: Inter)
**Find:**
```css
font-family: 'Inter', sans-serif;
```
**Replace with:**
```css
font-family: 'Your Font', sans-serif;
```
*Then add your font from Google Fonts in the <head>*

### Change Button Styles
**Find:**
```css
.primary-btn {
    background: linear-gradient(135deg, #0066cc, #0052a3);
    color: white;
    padding: 1rem 2rem;
    border-radius: 8px;
```
**Modify** the padding, border-radius, or gradient colors

### Change Animation Speed
**Find:**
```css
animation: fadeInUp 0.6s ease-out;
```
**Change 0.6s** to your desired speed (e.g., 0.3s for faster, 1s for slower)

---

## ✅ Verification Checklist

After customization:
- [ ] Company name updated everywhere
- [ ] Colors match your brand
- [ ] Contact info is correct
- [ ] Services/Features updated
- [ ] Team members added
- [ ] Portfolio/Projects updated
- [ ] Blog posts customized
- [ ] Logo/Favicon added
- [ ] Social links updated
- [ ] Website opens in browser without errors

---

## 💾 Save Changes

After each edit:
1. **Save file** (Ctrl+S)
2. **Refresh browser** (F5 or Cmd+Shift+R)
3. **Verify changes** appear correctly

---

## 🚀 Pro Tips

- **Keep backups**: Save original before major changes
- **Test on mobile**: Use browser DevTools (F12)
- **Validate HTML**: Use W3C Validator
- **Spell check**: Especially in content sections
- **Test links**: Make sure all links work
- **Preview colors**: Use color pickers for exact shades

---

**That's it! Your website is fully customizable. Just find and replace! 🎉**
