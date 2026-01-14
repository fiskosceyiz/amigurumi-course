# Google Sheets Entegrasyonu (Sizin Dosyanız İçin)

Verdiğiniz Google Sheet dosyasına (`1lJCAvdylxxtY9qNKDmWu20kaA0HgSTGDM7bs1hE3IWE`) form verilerini göndermek için yapmanız gerekenler aşağıdadır. Ben sizin hesabınıza erişemediğim için bu son "bağlama" işlemini sizin yapmanız gerekiyor.

## Adım 1: Script Editörünü Açın
1.  Verdiğiniz [Google E-Tablosunu](https://docs.google.com/spreadsheets/d/1lJCAvdylxxtY9qNKDmWu20kaA0HgSTGDM7bs1hE3IWE/edit) açın.
2.  Üst menüden **Uzantılar (Extensions)** > **Apps Script** seçeneğine tıklayın.

## Adım 2: Kodu Yapıştırın
Açılan sayfadaki kodları silin ve aşağıdaki kodu olduğu gibi yapıştırın:

```javascript
// Tablo (Sekme) Adınızın birebir "Amigurumi" olduğundan emin olun
const SHEET_NAME = "Amigurumi";

function doPost(e) {
  const lock = LockService.getScriptLock();
  lock.tryLock(10000);

  try {
    const doc = SpreadsheetApp.getActiveSpreadsheet();
    const sheet = doc.getSheetByName(SHEET_NAME);

    // Gelen veriyi işle
    const headers = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0];
    const nextRow = sheet.getLastRow() + 1;

    // Gelen JSON verisi
    const postData = JSON.parse(e.postData.contents);
    
    const newRow = [
      new Date(),           // Tarih (Sütun 1)
      postData.ad,          // Ad
      postData.soyad,       // Soyad
      postData.telefon,     // Tel
      postData.email,       // Email
      postData.course,      // Kurs Tercihi
      postData.location,    // Konum
      postData.availability // Müsaitlik
    ];

    sheet.getRange(nextRow, 1, 1, newRow.length).setValues([newRow]);

    return ContentService
      .createTextOutput(JSON.stringify({ 'result': 'success', 'row': nextRow }))
      .setMimeType(ContentService.MimeType.JSON);
  }

  catch (e) {
    return ContentService
      .createTextOutput(JSON.stringify({ 'result': 'error', 'error': e }))
      .setMimeType(ContentService.MimeType.JSON);
  }

  finally {
    lock.releaseLock();
  }
}
```

**Kaydet (Disket ikonu)** butonuna basın.

## Adım 3: Linki Alın (Deploy)
Bu adım çok kritiktir, lütfen dikkatle yapın:

1.  Sağ üstteki mavi **Dağıt (Deploy)** butonuna basın -> **Yeni dağıtım (New deployment)** seçin.
2.  **Tür seçin** dişli çarkından -> **Web Uygulaması (Web app)** seçin.
3.  Şu ayarları yapın:
    *   **Açıklama:** Amigurumi Kayıt
    *   **Yürütme kimliği (Execute as):** "Ben (Me)" (DEĞİŞTİRMEYİN)
    *   **Erişim sahibi (Who has access):** "Herkes (Anyone)" (**BUNU MUTLAKA SEÇİN**)
4.  **Dağıt** butonuna basın.
5.  Google izin isterse **Erişim Ver -> Hesabını Seç -> Gelişmiş -> Güvenli Değil (Go to Project) -> İzin Ver** adımlarını takip edin.
6.  Size verilen **Web App URL**'sini kopyalayın.

## Adım 4: Son İşlem
Kopyaladığınız bu linki bana buradan gönderin veya `basvuru.html` dosyasında 639. satıra kendiniz yapıştırın:
`const SCRIPT_URL = 'SİZİN_KOPYALADIĞINIZ_LİNK';`
