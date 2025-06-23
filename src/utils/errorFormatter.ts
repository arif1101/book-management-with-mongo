export function formatError(error: any) {
  if (error.name === "CastError") {
    return {
      status: 400,
      body: {
        message: "Validation failed",
        success: false,
        error: {
          name: error.name,
          kind: error.kind,
          path: error.path,
          value: error.value
        }
      }
    };
  }
  if (error.name === "ValidationError") {
    return {
      status: 400,
      body: {
        message: "Validation failed",
        success: false,
        error: {
          name: error.name,
          errors: error.errors
        }
      }
    };
  }
  // Default
  return {
    status: 500,
    body: {
      message: "Internal Server Error",
      success: false,
      error
    }
  };
}