function doPost(e) {
  const SHEET_NAME = "Amigurumi";
  const lock = LockService.getScriptLock();
  lock.tryLock(10000);

  try {
    const doc = SpreadsheetApp.getActiveSpreadsheet();
    const sheet = doc.getSheetByName(SHEET_NAME);

    // --- BAŞLIK (HEADER) KONTROLÜ ---
    // Eğer A1 hücresi boşsa, başlıkları otomatik ekle
    if (sheet.getRange("A1").getValue() === "") {
        const headers = ["Tarih", "Ad", "Soyad", "Telefon", "Email", "Kurs Tercihi", "Konum", "Müsaitlik"];
        sheet.getRange(1, 1, 1, headers.length).setValues([headers]);
        // Başlıkları kalın yap ve dondur
        sheet.getRange(1, 1, 1, headers.length).setFontWeight("bold");
        sheet.setFrozenRows(1);
    }
    // ---------------------------------

    const nextRow = sheet.getLastRow() + 1;
    const postData = JSON.parse(e.postData.contents);
    
    // Tarih, Ad, Soyad, Telefon, Email, Kurs, Konum, Müsaitlik
    const newRow = [
      new Date(),
      postData.ad,
      postData.soyad,
      postData.telefon,
      postData.email,
      postData.course,
      postData.location,
      postData.availability
    ];

    sheet.getRange(nextRow, 1, 1, newRow.length).setValues([newRow]);

    return ContentService
      .createTextOutput(JSON.stringify({ 'result': 'success', 'row': nextRow }))
      .setMimeType(ContentService.MimeType.JSON);
  }

  catch (e) {
    // Hata olursa geri döndür
    return ContentService
      .createTextOutput(JSON.stringify({ 'result': 'error', 'error': e.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }

  finally {
    lock.releaseLock();
  }
}
