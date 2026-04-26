// src/services/api.js
const GOOGLE_SHEET_API = 'https://script.google.com/macros/s/AKfycbwtMeD3FQsmsdQHPl6pvPSazsmF-T5g9cu5tMh1mh9NhNWwJksCynomxLSqglJPEWEn/exec';

// Save user registration to Google Sheets
export const saveUserToSheet = async (userData) => {
  try {
    let ip = 'N/A';
    try {
      const ipResponse = await fetch('https://api.ipify.org?format=json');
      const ipData = await ipResponse.json();
      ip = ipData.ip;
    } catch(e) {}
    
    await fetch(GOOGLE_SHEET_API, {
      method: 'POST',
      mode: 'no-cors',
      headers: { 'Content-Type': 'application/json' },
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

// Get all users from Google Sheets (for admin panel)
export const getAllUsersFromSheet = async () => {
  try {
    // Fetch data from Google Sheet
    const response = await fetch(GOOGLE_SHEET_API);
    const text = await response.text();
    
    // Try to parse as JSON
    try {
      const data = JSON.parse(text);
      if (data.success && data.data) {
        const rows = data.data;
        if (rows && rows.length > 1) {
          const headers = rows[0];
          const sheetUsers = rows.slice(1).map((row, index) => {
            const user = { id: `sheet-${index}`, source: 'Google Sheet' };
            headers.forEach((header, i) => {
              const key = header.toLowerCase().replace(/ /g, '_');
              user[key] = row[i] || '';
            });
            return user;
          }).filter(user => user.email && user.email !== '');
          
          return { success: true, users: sheetUsers };
        }
      }
    } catch(e) {
      console.log('Response is not JSON yet or no data');
    }
    
    return { success: true, users: [] };
    
  } catch (error) {
    console.error('Error fetching users from Google Sheet:', error);
    return { success: false, users: [], error: error.message };
  }
};

// Sync users from Google Sheet to localStorage
export const syncUsersFromSheet = async () => {
  try {
    const result = await getAllUsersFromSheet();
    
    if (result.success && result.users.length > 0) {
      // Get existing local users
      const existingUsers = JSON.parse(localStorage.getItem('registeredUsers') || '[]');
      
      // Merge sheet users with local users (avoid duplicates by email)
      const sheetEmails = new Set(result.users.map(u => u.email));
      const localUsersToKeep = existingUsers.filter(u => !sheetEmails.has(u.email));
      
      // Convert sheet users to match local format
      const formattedSheetUsers = result.users.map(user => ({
        id: `sheet-${Date.now()}-${Math.random()}`,
        name: user.name || 'Unknown',
        email: user.email,
        role: 'user',
        phone: user.phone || '',
        createdAt: user.date || new Date().toISOString(),
        source: 'Google Sheet'
      }));
      
      // Combine users
      const allUsers = [...localUsersToKeep, ...formattedSheetUsers];
      
      // Ensure admin is always present
      const adminExists = allUsers.some(u => u.email === 'admin@apexlegacy.com');
      if (!adminExists) {
        allUsers.unshift({
          id: 'admin-001',
          name: 'Brian Shitambasi',
          email: 'admin@apexlegacy.com',
          role: 'admin',
          createdAt: new Date().toISOString(),
          isAdmin: true
        });
      }
      
      // Save to localStorage
      localStorage.setItem('registeredUsers', JSON.stringify(allUsers));
      
      return { success: true, syncedCount: formattedSheetUsers.length, totalUsers: allUsers.length };
    }
    
    return { success: false, syncedCount: 0 };
    
  } catch (error) {
    console.error('Error syncing users from sheet:', error);
    return { success: false, error: error.message };
  }
};