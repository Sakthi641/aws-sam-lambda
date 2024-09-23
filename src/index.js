const { updateGoogleSheet } = require("./googleSheetsService");
const { handleError } = require("./utils/errorHandler");

exports.handler = async (event) => {
  try {
    const { action, data } = JSON.parse(event.body);

    const spreadsheetId = process.env.SPREADSHEET_ID;
    const range = "Sheet1!A1";

    let values;
    switch (action) {
      case "new_user":
        values = [[data.name, data.email, new Date().toISOString()]];
        break;
      case "purchase":
        values = [[data.productId, data.amount, new Date().toISOString]];
        break;
      default:
        throw new Error("Invalid action");
    }

    await updateGoogleSheet(spreadsheetId, range, values);

    return {
      statusCode: 200,
      body: JSON.stringify({ message: "Sheet updated successfully." }),
    };
  } catch (error) {
    return handleError(error);
  }
};
