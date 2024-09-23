const { google } = require('googleapis');
const sheets = google.sheets("v4");

const credentials = {
  client_email: process.env.GOOGLE_CLIENT_EMAIL,
  private_key: process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, "\n"),
};

const auth = new google.auth.JWT(
  credentials.client_email,
  null,
  credentials.private_key,
  ["https://www.googleapis.com/auth/spreadsheets"]
);

async function updateGoogleSheet(spreadsheetId, range, values) {
  try {
    const request = {
      spreadsheetId,
      range,
      valueInputOption: "USER_ENTERED",
      resource: { values },
      auth,
    };

    const response = await sheets.spreadsheets.values.update(request);
    console.log("Sheet updated successfully");
    return response.data;
  } catch (error) {
    console.error("Error updating sheet: ", error);
    throw error;
  }
}

module.exports = {
  updateGoogleSheet,
};
