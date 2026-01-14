# Debugging Guide for Google Sheets Integration

The success message "Başvurunuz başarıyla alındı!" means the website successfully sent the data to the provided Google Script URL. If you don't see it in the Sheet, the issue is likely within the **Google Sheet** or the **Apps Script** configuration itself.

Please check the following common issues:

## 1. Check Sheet Name Match (CRITICAL)
Your request mentioned "Eğitim Talep Listesi page" (tab), but the script I gave you was configured for a tab named **"Amigurumi"**.

**Solution:**
1.  Open your Google Sheet.
2.  Look at the tabs at the bottom.
3.  **Rename the tab** from "Eğitim Talep Listesi" to `Amigurumi`.
    *   *OR*
4.  Update the script code in Apps Script to match your tab name exactly: `const SHEET_NAME = "Eğitim Talep Listesi";` (Then you must Save & Deploy again).

**Recommendation:** Changing the tab name in the Sheet to `Amigurumi` is instant and easier.

## 2. Check "Executions" Log
Failed executions can tell you exactly what went wrong.
1.  Go to your [Apps Script Project](https://script.google.com/).
2.  On the left sidebar, click **Executions** (Play icon with a clock).
3.  Look for the latest "doPost" execution.
4.  If it says **"Failed"**, click on it to see the error message (e.g., "Sheet not found").

## 3. Deployment Version
If you changed the code (e.g., fixed the sheet name) but didn't create a **New Deployment**, the live URL is still running the *old* code.
*   **Always:** Deploy > New Deployment > Deploy.

## 4. Wrong Script URL
Verify the URL you pasted matches the latest deployment URL.

---
**Most Likely Fix:**
Rename your Excel sheet tab to **Amigurumi**. It is currently looking for that exact name.
