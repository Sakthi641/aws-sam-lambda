const handleError = (error) => {};

function handleError(error) {
  console.error("Error:", error);

  let statusCode = 500;
  let message = "An unexpected error occurred";

  if (error.message === "Invalid action") {
    statusCode = 400;
    message = "Invalid action specified";
  } else if (error.code === 403) {
    statusCode = 403;
    message = "Access denied to Google Sheet";
  }

  return {
    statusCode,
    body: JSON.stringify({ message }),
  };
}

module.exports = {
  handleError,
};
