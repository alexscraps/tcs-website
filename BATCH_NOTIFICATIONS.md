# Batch Notification System

## Overview

The website now uses a **batched notification system** that sends form submission summaries at **12:00 PM and 5:00 PM CST** every day, instead of sending individual emails immediately when each form is submitted.

## How It Works

### 1. Form Submission
When a user submits any form (webinar registration, booking, meeting request, supplier submission):
- The submission is **saved to the database immediately**
- An **in-app notification** is sent to the Manus dashboard (real-time)
- **No email is sent** at this time
- The submission is marked as `notified = 0` (not yet included in batch email)

### 2. Batch Processing
At 12:00 PM and 5:00 PM CST daily:
- The system queries all form submissions where `notified = 0`
- **ONE consolidated email** is sent to:
  - info@thechannelstandard.com
  - eric@thechannelstandard.com
  - owen@thechannelstandard.com
  - david@thechannelstandard.com
- The email includes:
  - A summary of ALL unnotified submissions grouped by form type
  - Individual details for each submission
  - An Excel spreadsheet with ALL historical submissions across all form types
- After the email is sent, all submissions are marked as `notified = 1`

### 3. Production Deployment
The cron jobs **only run in production** (when `NODE_ENV=production`). In development mode, the batch notifications are disabled to avoid sending test emails.

## Technical Implementation

### Database Schema
Each form table has a `notified` field:
- `bookings.notified`
- `webinarRegistrations.notified`
- `supplierSubmissions.notified`
- `meetingRequests.notified`

Default value: `0` (not notified)
After batch email: `1` (notified)

### Cron Schedule
The cron jobs use 6-field format (seconds minutes hours day month dayOfWeek):
- **Noon CST**: `0 0 18 * * *` (6:00 PM UTC)
- **5 PM CST**: `0 0 23 * * *` (11:00 PM UTC)

*Note: These times assume CST (UTC-6). During CDT (UTC-5), the times will be 1 hour earlier.*

### Files
- `server/_core/batchNotifications.ts` - Main batch notification logic
- `server/_core/cronJobs.ts` - Cron schedule configuration
- `server/_core/index.ts` - Cron job initialization on server startup
- `server/batchNotifications.test.ts` - Tests for batch notification system

## Benefits

1. **Minimal Email Noise**: Just 2 emails per day (noon and 5pm) regardless of submission volume
2. **Consolidated View**: All form submissions in one email for easy review
3. **Immediate Database Storage**: All submissions are captured immediately
4. **Real-time Dashboard Visibility**: In-app Manus notifications still work in real-time
5. **Flexible Schedule**: Easy to adjust batch times or add more batches if needed

## Trade-offs

- **Email Delay**: Up to 7-hour delay before seeing form submissions via email (vs instant)
- **Production Only**: Batch emails only work after publishing the website

## Deployment

To activate the batch notification system:

1. **Save a checkpoint** of the current code
2. **Publish the website** using the Publish button in the Management UI
3. The cron jobs will automatically start running on the production server

## Testing

To verify the batch notification system is configured correctly:

```bash
pnpm test batchNotifications.test.ts
```

This test verifies:
- Cron schedules are configured for noon and 5pm CST
- Handler functions are properly defined

## Manual Trigger (Development Only)

For testing purposes, you can manually trigger batch notifications without waiting for the cron schedule:

```typescript
import { triggerBatchNotificationsManually } from './server/_core/cronJobs';

await triggerBatchNotificationsManually();
```

**Warning**: This will send real emails to info@ and eric@thechannelstandard.com for all unnotified submissions.

## Monitoring

After deployment, you can monitor batch notifications in the production logs:

- `[Cron] Initializing batch notification schedules...` - Cron jobs registered on startup
- `[Cron] Running scheduled task: batch-notifications-noon` - Batch job started
- `[Batch Notifications] Found X unnotified submissions` - Number of emails to send
- `[Batch Notifications] Successfully sent X notification emails` - Batch complete

## Future Enhancements

Potential improvements to consider:
- Add a summary email with all form types combined
- Allow configuration of batch times via environment variables
- Add a dashboard to view batch notification history
- Implement retry logic for failed email sends
