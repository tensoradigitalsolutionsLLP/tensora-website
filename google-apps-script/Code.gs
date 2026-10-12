const SPREADSHEET_ID = '1hlNrWyteM-Cymr33IRzwG3_GzfzTogi-qz54Co9Ygh0';
const HEADERS = ['Timestamp', 'Full Name', 'Email', 'Phone', 'Service', 'Budget', 'Message'];

function doPost(event) {
  try {
    const payload = JSON.parse(event.postData.contents);
    const fullName = String(payload.fullName || '').trim();
    const email = String(payload.email || '').trim();
    const phone = String(payload.phone || '').trim();
    const service = String(payload.service || '').trim();
    const budget = String(payload.budget || '').trim();
    const message = String(payload.message || '').trim();

    if (!fullName || !email || !service || !budget || !message) {
      return jsonResponse({ success: false, error: 'Required fields are missing.' });
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return jsonResponse({ success: false, error: 'Email address is invalid.' });
    }
    if (fullName.length > 150 || email.length > 254 || phone.length > 50 ||
        service.length > 150 || budget.length > 100 || message.length > 5000) {
      return jsonResponse({ success: false, error: 'A field exceeds the allowed length.' });
    }

    const lock = LockService.getScriptLock();
    lock.waitLock(10000);
    try {
      const spreadsheet = SpreadsheetApp.openById(SPREADSHEET_ID);
      const sheet = spreadsheet.getSheets()[0];
      if (!sheet) throw new Error('The spreadsheet has no sheet tabs.');
      if (sheet.getLastRow() === 0) sheet.appendRow(HEADERS);

      sheet.appendRow([
        new Date(),
        safeCell(fullName),
        safeCell(email),
        safeCell(phone),
        safeCell(service),
        safeCell(budget),
        safeCell(message)
      ]);
    } finally {
      lock.releaseLock();
    }

    return jsonResponse({ success: true });
  } catch (error) {
    console.error(error);
    return jsonResponse({ success: false, error: 'Unable to save the inquiry.' });
  }
}

function safeCell(value) {
  return /^[=+\-@]/.test(value) ? `'${value}` : value;
}

function jsonResponse(value) {
  return ContentService
    .createTextOutput(JSON.stringify(value))
    .setMimeType(ContentService.MimeType.JSON);
}