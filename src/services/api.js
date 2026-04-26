// src/services/api.js
// REPLACE with your FULL Web App URL from Google Apps Script
const GOOGLE_SHEET_API = 'https://script.google.com/macros/s/AKfycbzB_tDCX2_Z_Z_c8NTQLkQK_QyTlyZ5z2hnIoX0fovXlwUHFGqUweNZ6Ze4nhg73hGz/exec';

export const saveUserToSheet = async (userData) => {
  try {
    let ip = 'N/A';
    try {
      const ipResponse = await fetch('https://api.ipify.org?format=json');
      const ipData = await ipResponse.json();
      ip = ipData.ip;
    } catch(e) {
      console.log('Could not fetch IP');
    }
    
    const response = await fetch(GOOGLE_SHEET_API, {
      method: 'POST',
      mode: 'no-cors',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: userData.name,
        email: userData.email,
        ip: ip,
        phone: userData.phone || '',
        referral: userData.referral || 'Website Registration',
        userAgent: navigator.userAgent,
        timestamp: new Date().toISOString()
      })
    });
    
    console.log('✅ User saved to Google Sheet:', userData.email);
    return { success: true };
    
  } catch (error) {
    console.error('❌ Error saving to Google Sheet:', error);
    return { success: false, error: error.message };
  }
};

// Optional: Get all users from Google Sheets (for admin panel)
export const getAllUsersFromSheet = async () => {
  try {
    const response = await fetch(GOOGLE_SHEET_API);
    const text = await response.text();
    
    try {
      const data = JSON.parse(text);
      if (data.success && data.data) {
        const rows = data.data;
        const headers = rows[0];
        const users = rows.slice(1).map((row, index) => {
          const user = { id: `sheet-${index}` };
          headers.forEach((header, i) => {
            const key = header.toLowerCase().replace(/ /g, '_');
            user[key] = row[i];
          });
          return user;
        });
        return { success: true, users };
      }
    } catch(e) {
      console.log('Response is not JSON yet');
    }
    
    return { success: false, users: [] };
    
  } catch (error) {
    console.error('Error fetching users:', error);
    return { success: false, users: [] };
  }
};