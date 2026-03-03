import { drizzle } from 'drizzle-orm/mysql2';
import mysql from 'mysql2/promise';
import ExcelJS from 'exceljs';
import * as schema from './drizzle/schema.ts';

const DATABASE_URL = process.env.DATABASE_URL;

async function exportToExcel() {
  let connection;
  
  try {
    console.log('Connecting to database...');
    connection = await mysql.createConnection(DATABASE_URL);
    const db = drizzle(connection, { schema, mode: 'default' });
    
    const submissions = [];

    // Fetch all bookings
    console.log('Fetching bookings...');
    const allBookings = await db.select().from(schema.bookings);
    allBookings.forEach((booking) => {
      submissions.push({
        type: booking.formType === 'booking' ? 'Booking Request' : 'Contact Message',
        timestamp: booking.createdAt.toISOString(),
        firstName: booking.firstName,
        lastName: booking.lastName,
        email: booking.email,
        ecosystemType: booking.ecosystemType || '',
        message: booking.message || '',
        resumeUrl: booking.resumeUrl || '',
        resumeFileName: booking.resumeFileName || '',
      });
    });

    // Fetch all webinar registrations
    console.log('Fetching webinar registrations...');
    const allWebinars = await db.select().from(schema.webinarRegistrations);
    allWebinars.forEach((reg) => {
      submissions.push({
        type: `Webinar Registration - ${reg.webinarName}`,
        timestamp: reg.createdAt.toISOString(),
        firstName: reg.firstName,
        lastName: reg.lastName,
        email: reg.email,
        company: reg.company || '',
        role: reg.role || '',
      });
    });

    // Fetch all launch notifications
    console.log('Fetching launch notifications...');
    const allLaunch = await db.select().from(schema.launchNotifications);
    allLaunch.forEach((launch) => {
      submissions.push({
        type: 'Launch Notification Signup',
        timestamp: launch.createdAt.toISOString(),
        email: launch.email,
        firstName: launch.firstName || '',
        lastName: launch.lastName || '',
      });
    });

    // Fetch all demo access requests
    console.log('Fetching demo access requests...');
    const allDemos = await db.select().from(schema.demoAccessTokens);
    allDemos.forEach((demo) => {
      submissions.push({
        type: 'Demo Access Request',
        timestamp: demo.createdAt.toISOString(),
        firstName: demo.firstName,
        lastName: demo.lastName,
        email: demo.email,
        companyName: demo.companyName,
        token: demo.token,
        isUsed: demo.isUsed === 1 ? 'Yes' : 'No',
        usedAt: demo.usedAt ? demo.usedAt.toISOString() : 'Not used yet',
      });
    });

    // Sort by timestamp descending
    submissions.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
    
    console.log(`\nFound ${submissions.length} total submissions`);
    
    if (submissions.length === 0) {
      console.log('No submissions found in database');
      await connection.end();
      return;
    }

    // Create workbook and worksheet
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('All Form Submissions');

    // Determine all unique columns
    const allKeys = new Set();
    submissions.forEach((sub) => {
      Object.keys(sub).forEach((key) => allKeys.add(key));
    });

    const columns = Array.from(allKeys);

    // Set up headers
    worksheet.columns = columns.map((col) => ({
      header: col.charAt(0).toUpperCase() + col.slice(1).replace(/([A-Z])/g, ' $1'),
      key: col,
      width: 20,
    }));

    // Style the header row
    worksheet.getRow(1).font = { bold: true };
    worksheet.getRow(1).fill = {
      type: 'pattern',
      pattern: 'solid',
      fgColor: { argb: 'FF10B981' },
    };

    // Add data rows
    submissions.forEach((submission) => {
      worksheet.addRow(submission);
    });

    // Save to file
    const filename = `/home/ubuntu/form-submissions-${Date.now()}.xlsx`;
    await workbook.xlsx.writeFile(filename);
    
    console.log(`\n✅ Excel file created: ${filename}`);
    
    // Print summary by type
    const byType = {};
    submissions.forEach(sub => {
      byType[sub.type] = (byType[sub.type] || 0) + 1;
    });
    
    console.log('\nSubmissions by type:');
    Object.entries(byType).forEach(([type, count]) => {
      console.log(`  ${type}: ${count}`);
    });
    
    await connection.end();
    
  } catch (error) {
    console.error('Error exporting submissions:', error);
    if (connection) await connection.end();
    process.exit(1);
  }
}

exportToExcel();
