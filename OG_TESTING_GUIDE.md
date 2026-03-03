# Open Graph Metadata Testing Guide

## Overview
The Channel Standard website now includes comprehensive Open Graph (OG) metadata for consistent, premium link previews across all social platforms.

## What Was Implemented

### 1. Open Graph Image
- **File**: `/client/public/og-image.e5e56f21.png`
- **Dimensions**: 1200px × 630px (1.91:1 aspect ratio)
- **Design**: Center-weighted composition with safe margins
- **Primary Text**: "Where the Channel Happens"
- **Secondary Text**: "Home of The Channel Standard Companion"
- **Aesthetic**: High contrast, consulting-grade professional design

### 2. Metadata Tags
All metadata is configured in `/client/index.html`:

**Open Graph Tags:**
- `og:type`: website
- `og:url`: https://thechannelstandard.com/
- `og:title`: The Channel Standard | Where the Channel Happens
- `og:description`: The home of modern channel growth—fractional leadership, recruiting, and The Channel Standard Companion.
- `og:image`: https://thechannelstandard.com/og-image.e5e56f21.png
- `og:image:width`: 1200
- `og:image:height`: 630
- `og:site_name`: The Channel Standard

**Twitter Card Tags:**
- `twitter:card`: summary_large_image
- `twitter:url`: https://thechannelstandard.com/
- `twitter:title`: The Channel Standard | Where the Channel Happens
- `twitter:description`: The home of modern channel growth—fractional leadership, recruiting, and The Channel Standard Companion.
- `twitter:image`: https://thechannelstandard.com/og-image.e5e56f21.png

## Testing Instructions

### LinkedIn Post Inspector
1. Visit: https://www.linkedin.com/post-inspector/
2. Enter URL: `https://thechannelstandard.com/`
3. Click "Inspect"
4. **Expected Result**: 
   - Title: "The Channel Standard | Where the Channel Happens"
   - Description: "The home of modern channel growth—fractional leadership, recruiting, and The Channel Standard Companion."
   - Image: Professional OG image with headline visible

### iMessage (iOS/macOS)
1. Open iMessage
2. Send yourself: `https://thechannelstandard.com/`
3. Wait for link preview to load
4. **Expected Result**: 
   - Clean preview card with OG image
   - Title and description visible
   - Image properly cropped with safe margins

### Slack
1. Paste URL in any Slack channel: `https://thechannelstandard.com/`
2. Wait for unfurl
3. **Expected Result**:
   - Large image preview
   - Title and description below image
   - Professional appearance

### Facebook Sharing Debugger
1. Visit: https://developers.facebook.com/tools/debug/
2. Enter URL: `https://thechannelstandard.com/`
3. Click "Debug"
4. **Expected Result**:
   - All OG tags detected
   - Image preview displays correctly
   - No warnings or errors

### Twitter/X Card Validator
1. Visit: https://cards-dev.twitter.com/validator
2. Enter URL: `https://thechannelstandard.com/`
3. Click "Preview card"
4. **Expected Result**:
   - Large summary card with image
   - Title and description visible
   - Professional appearance

### Email Clients (Gmail, Outlook)
1. Send email with link: `https://thechannelstandard.com/`
2. View in recipient inbox
3. **Expected Result**:
   - Link preview may vary by client
   - Some clients will show OG image
   - Title should be visible

## Cache Clearing

If you don't see updated previews immediately:

**LinkedIn:**
- Use Post Inspector to force refresh
- May take 7 days for cache to clear naturally

**Facebook:**
- Use Sharing Debugger "Scrape Again" button
- Clears cache immediately

**Twitter/X:**
- Card Validator automatically fetches latest
- May need to wait a few minutes

**iMessage:**
- Delete conversation and create new one
- Or wait 24 hours for cache refresh

**Slack:**
- Use `/unfurl clear` command (if admin)
- Or post link in different channel

## Troubleshooting

### Image Not Showing
1. Verify image is accessible: `https://thechannelstandard.com/og-image.e5e56f21.png`
2. Check image dimensions are exactly 1200×630
3. Ensure HTTPS is working properly
4. Clear platform cache using tools above

### Wrong Title/Description
1. Check HTML meta tags in browser DevTools
2. Verify no conflicting meta tags exist
3. Clear platform cache
4. Wait for CDN propagation (up to 24 hours)

### Image Cropped Incorrectly
1. Verify safe margins (60px from edges)
2. Check aspect ratio is exactly 1.91:1
3. Test on multiple platforms (cropping varies)

## Post-Deployment Checklist

After publishing to production:

- [ ] Test LinkedIn Post Inspector with production URL
- [ ] Send iMessage link preview test
- [ ] Post in Slack workspace
- [ ] Run Facebook Sharing Debugger
- [ ] Check Twitter Card Validator
- [ ] Verify image loads at: `https://thechannelstandard.com/og-image.e5e56f21.png`
- [ ] Check browser title and description
- [ ] Monitor analytics for social referral traffic

## Notes

- OG image uses content hash (`e5e56f21`) for cache busting
- Image is optimized for both mobile and desktop previews
- Design follows consulting-grade aesthetic (not personal brand)
- Safe margins prevent text cropping on all platforms
- High contrast ensures readability in all contexts

## Support

If you encounter issues with social previews:
1. Check this guide's troubleshooting section
2. Verify all meta tags are present in HTML source
3. Use platform-specific debugging tools
4. Allow 24-48 hours for cache propagation
