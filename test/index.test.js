const { handler } = require("../src/index");
const { updateGoogleSheet } = require("../src/googleSheetsService");

jest.mock("../src/googleSheetsService");

describe("Lambda Handler", () => {
  if (
    ("should handle new_user action correctly",
    async () => {
      const event = {
        body: JSON.stringify({
          action: "new_user",
          data: {
            name: "John Doe",
            email: "john@example.com",
          },
        }),
      };

      updateGoogleSheet.mockResolvedValue();

      const result = await handler(event);

      expect(result.statusCode).toBe(200);
      expect(JSON.parse(result.body).message).toBe(
        "Sheet updated successfully"
      );
      expect(updateGoogleSheet).toHaveBeenCalled();
    })
  );
});
