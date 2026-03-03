# Demo Pages Implementation Guide

## Overview
Two private, hidden demo pages have been created for The Channel Standard:
- `/demo` - Gated access page with HubSpot form
- `/demo-access` - Private video briefing page with Vidyard embed

Both pages are hidden from navigation, search engines (noindex/nofollow), and feature premium confidential aesthetics.

---

## Page 1: /demo (Gated Access Page)

### Current Status
✅ Fully implemented with placeholder for HubSpot form embed

### Features Implemented
- **Hero Section**: "Confidential Demo Access" headline with lock icon
- **Confidentiality Notice**: Two-paragraph legal notice explaining proprietary content and usage restrictions
- **HubSpot Form Placeholder**: Clearly marked section ready for embed code
- **After-form Messaging**: Blue info panel explaining what happens after submission
- **Trust Cues**: "Access is logged" and "Secure connection" badges at bottom
- **Meta Tags**: noindex, nofollow configured via useEffect
- **Mobile Optimized**: Responsive design with proper spacing and typography

### How to Add HubSpot Form

**Step 1: Get HubSpot Embed Code**
1. Log into your HubSpot account
2. Navigate to Marketing → Lead Capture → Forms
3. Select or create your demo access form with these fields:
   - First Name (required)
   - Last Name (required)
   - Email Address (required)
   - Checkbox (required): "I acknowledge that this demo contains confidential and proprietary information. I agree not to record, reproduce, share, or distribute this content, in whole or in part, without prior written consent."
4. Click "Share" → "Embed" → Copy the embed code

**Step 2: Paste Embed Code**
1. Open `/home/ubuntu/the-channel-standard/client/src/pages/Demo.tsx`
2. Find the section with `id="hubspot-form-container"`
3. Replace the placeholder content inside the div with your HubSpot embed code:

```tsx
{/* Before: */}
<div 
  id="hubspot-form-container" 
  className="min-h-[400px] flex items-center justify-center border-2 border-dashed border-white/20 rounded-xl bg-white/5"
>
  <div className="text-center p-8">
    {/* Placeholder content */}
  </div>
</div>

{/* After: */}
<div 
  id="hubspot-form-container" 
  className="min-h-[400px]"
>
  {/* Paste your HubSpot embed code here */}
  <script charset="utf-8" type="text/javascript" src="//js.hsforms.net/forms/embed/v2.js"></script>
  <script>
    hbspt.forms.create({
      region: "na1",
      portalId: "YOUR_PORTAL_ID",
      formId: "YOUR_FORM_ID"
    });
  </script>
</div>
```

**Step 3: Style HubSpot Form (Optional)**
If the HubSpot form doesn't match your brand, add custom CSS in `/client/src/index.css`:

```css
/* HubSpot Form Overrides */
#hubspot-form-container .hs-form {
  max-width: 100%;
}

#hubspot-form-container .hs-input {
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  color: white;
  padding: 0.75rem;
  border-radius: 0.5rem;
}

#hubspot-form-container .hs-button {
  background: var(--primary);
  color: white;
  padding: 0.75rem 2rem;
  border-radius: 0.5rem;
  font-weight: 600;
}
```

**Step 4: Configure HubSpot Workflow**
1. In HubSpot, create a workflow triggered by form submission
2. Add action: Send email with private access link
3. Email should include: `https://thechannelstandard.com/demo-access`
4. Optional: Add unique token to URL for tracking (e.g., `?token=abc123`)

---

## Page 2: /demo-access (Private Video Page)

### Current Status
✅ Fully implemented with placeholder for Vidyard embed

### Features Implemented
- **Hero Section**: "Private Demo Briefing" headline with lock icon and red "Confidential — do not share" warning
- **Confidentiality Reminder**: Red alert panel with monitoring notice
- **Vidyard Embed Placeholder**: Clearly marked section ready for embed code
- **Important Notes**: Three-point list explaining access restrictions
- **Support Line**: "Contact us" placeholder for help
- **Trust Cues**: "Access logged and monitored" and "Confidential content" badges
- **Meta Tags**: noindex, nofollow configured via useEffect
- **Mobile Optimized**: Responsive design with proper video container

### How to Add Vidyard Video

**Step 1: Get Vidyard Embed Code**
1. Log into your Vidyard account
2. Navigate to your demo video
3. Click "Share" → "Embed"
4. **IMPORTANT**: Use "Embed Code" option, NOT "Share Link"
5. Configure privacy settings:
   - Enable "Require email to watch" (optional but recommended)
   - Enable "Disable social sharing"
   - Enable "Track viewer engagement"
6. Copy the embed code (should look like `<script>` tags or `<iframe>`)

**Step 2: Paste Embed Code**
1. Open `/home/ubuntu/the-channel-standard/client/src/pages/DemoAccess.tsx`
2. Find the section with `id="vidyard-embed-container"`
3. Replace the placeholder content inside the div with your Vidyard embed code:

```tsx
{/* Before: */}
<div 
  id="vidyard-embed-container" 
  className="min-h-[500px] flex items-center justify-center border-2 border-dashed border-white/20 rounded-xl bg-black/40"
>
  <div className="text-center p-8">
    {/* Placeholder content */}
  </div>
</div>

{/* After: */}
<div 
  id="vidyard-embed-container" 
  className="min-h-[500px] rounded-xl overflow-hidden bg-black"
>
  {/* Paste your Vidyard embed code here */}
  <script src="https://play.vidyard.com/embed/v4.js" type="text/javascript" async></script>
  <img
    style="width: 100%; margin: auto; display: block;"
    className="vidyard-player-embed"
    src="https://play.vidyard.com/YOUR_VIDEO_ID.jpg"
    data-uuid="YOUR_VIDEO_ID"
    data-v="4"
    data-type="inline"
  />
</div>
```

**Step 3: Configure Vidyard Privacy Settings**
1. In Vidyard, go to video settings
2. Enable these privacy features:
   - **Disable downloads**: Prevent video downloads
   - **Disable sharing**: Remove share buttons
   - **Require email**: Gate video behind email capture (optional)
   - **Track viewers**: Monitor who watches and for how long
3. Set video to "Unlisted" (not public, only accessible via embed)

**Step 4: Optional - Add Access Logging**
If you want to track who accesses the page (beyond Vidyard's built-in tracking):

1. Add analytics event in `DemoAccess.tsx`:
```tsx
useEffect(() => {
  // Track page access
  if (typeof window !== 'undefined' && window.analytics) {
    window.analytics.track('Demo Access Page Viewed', {
      timestamp: new Date().toISOString(),
      referrer: document.referrer
    });
  }
}, []);
```

2. Or use HubSpot tracking code to log page views in HubSpot CRM

---

## Security & Privacy Features

### Both Pages Include:
✅ **noindex, nofollow** meta tags (hidden from search engines)
✅ **Hidden from navigation** (not in header, footer, or sitemap)
✅ **Lock icons** indicating confidential content
✅ **Trust cues** ("Access is logged", "Secure connection")
✅ **Mobile-optimized** responsive design
✅ **Premium aesthetics** consistent with The Channel Standard brand

### Recommended Additional Security:
1. **URL Token Authentication** (optional):
   - Generate unique tokens in HubSpot workflow
   - Pass token in URL: `/demo-access?token=abc123`
   - Validate token on page load before showing video

2. **Time-Limited Access** (optional):
   - Add expiration timestamp to URL
   - Check timestamp on page load
   - Show "Access Expired" message if past expiration

3. **IP Logging** (optional):
   - Log IP addresses of page visitors
   - Track in HubSpot or separate analytics

---

## Testing Checklist

### Before Going Live:
- [ ] HubSpot form submits successfully
- [ ] HubSpot workflow sends email with `/demo-access` link
- [ ] Vidyard video plays correctly on desktop
- [ ] Vidyard video plays correctly on mobile
- [ ] Vidyard tracking captures viewer data
- [ ] Pages are NOT indexed by Google (check with `site:thechannelstandard.com/demo`)
- [ ] Pages do NOT appear in site navigation or footer
- [ ] Mobile responsiveness tested on iPhone and Android
- [ ] Confidentiality language reviewed by legal (if required)
- [ ] "Contact us" link updated with actual support email/link

### User Flow Test:
1. Visit `/demo` page
2. Fill out HubSpot form with test email
3. Receive email with `/demo-access` link
4. Click link and verify video loads
5. Confirm Vidyard tracking shows your view

---

## Maintenance Notes

### Updating Content:
- **Confidentiality language**: Edit in `Demo.tsx` and `DemoAccess.tsx`
- **Form fields**: Configure in HubSpot dashboard
- **Video**: Replace in Vidyard dashboard (embed code stays the same)
- **Support contact**: Update "Contact us" link in `DemoAccess.tsx`

### Monitoring:
- **Form submissions**: HubSpot dashboard
- **Video views**: Vidyard analytics
- **Page traffic**: Google Analytics (if configured)
- **Access attempts**: Server logs (if configured)

### Troubleshooting:
- **Form not submitting**: Check HubSpot portal ID and form ID
- **Video not loading**: Verify Vidyard embed code and video privacy settings
- **Pages appearing in Google**: Verify noindex meta tags and robots.txt
- **Mobile issues**: Test responsive design on actual devices

---

## File Locations

```
/home/ubuntu/the-channel-standard/
├── client/
│   └── src/
│       ├── pages/
│       │   ├── Demo.tsx              ← /demo page (HubSpot form)
│       │   └── DemoAccess.tsx        ← /demo-access page (Vidyard video)
│       ├── App.tsx                   ← Routes configured here
│       └── index.css                 ← Global styles (optional form styling)
└── DEMO_IMPLEMENTATION_GUIDE.md      ← This file
```

---

## Support

For questions or issues:
1. Check HubSpot form embed documentation: https://knowledge.hubspot.com/forms/embed-a-form-on-an-external-site
2. Check Vidyard embed documentation: https://knowledge.vidyard.com/hc/en-us/articles/360009879274
3. Review this implementation guide
4. Test in browser DevTools console for JavaScript errors

---

## Next Steps

1. **Get HubSpot embed code** and paste into `Demo.tsx`
2. **Get Vidyard embed code** and paste into `DemoAccess.tsx`
3. **Configure HubSpot workflow** to send email with `/demo-access` link
4. **Test complete user flow** from form submission to video viewing
5. **Monitor analytics** to track demo engagement
6. **Optional**: Add URL token authentication for enhanced security
7. **Optional**: Set up access expiration for time-limited demos

---

**Ready to deploy!** Both pages are fully functional and waiting for your HubSpot and Vidyard embed codes.
