# 📊 How to Connect Your Form to Google Sheets (Step-by-Step)

Follow these simple steps (takes under 2 minutes) to receive every lead submission directly in a private Google Sheet:

---

### Step 1: Create a Google Sheet
1. Open [Google Sheets](https://sheets.new) in your browser.
2. In row 1, add these column headers:
   - **A1**: `Timestamp`
   - **B1**: `Full Name`
   - **C1**: `Email`
   - **D1**: `WhatsApp / Phone`
   - **E1**: `City`
   - **F1**: `Age`
   - **G1**: `Profession / Business`
   - **H1**: `Biggest Challenge`
   - **I1**: `Looking Duration`
   - **J1**: `Tried So Far`
   - **K1**: `Ready To Take Action`

---

### Step 2: Add Google Apps Script
1. In the top menu of your Google Sheet, click **Extensions** > **Apps Script**.
2. Replace whatever is inside the script editor with this exact code:

```javascript
function doPost(e) {
  try {
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    var data = JSON.parse(e.postData.contents);

    sheet.appendRow([
      data.submittedAt || new Date().toLocaleString(),
      data.fullName || '',
      data.email || '',
      data.phone || '',
      data.city || '',
      data.age || '',
      data.profession || '',
      data.biggestChallenge || '',
      data.lookingDuration || '',
      data.alreadyTried || '',
      data.readyToAct || ''
    ]);

    return ContentService
      .createTextOutput(JSON.stringify({ status: "success" }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (error) {
    return ContentService
      .createTextOutput(JSON.stringify({ status: "error", message: error.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}
```

---

### Step 3: Deploy as Web App
1. At the top right of Apps Script, click the blue **Deploy** button > **New deployment**.
2. Click the gear icon ⚙️ next to "Select type" and choose **Web app**.
3. Fill in:
   - **Description**: `Persona Grow Leads Webhook`
   - **Execute as**: `Me (AjayKadam477@gmail.com)`
   - **Who has access**: `Anyone` *(Crucial: this allows the landing page form to send lead rows)*
4. Click **Deploy**.
5. Copy the **Web App URL** (looks like: `https://script.google.com/macros/s/AKfycb.../exec`).

---

### Step 4: Paste into your app
In your project file `src/config.ts`, paste your Web App URL into:
```typescript
export const GOOGLE_SHEETS_WEBHOOK_URL = "https://script.google.com/macros/s/YOUR_DEPLOYMENT_ID/exec";
```

That's it! Every visitor who clicks "Submit" will instantly have their details added to your Google Sheet, and will be immediately redirected to your Google Calendar link to pick their call time.
