// frontend/src/lib/api/parseApiError.ts
export type FastApiValidationError = {
    detail?: unknown;
  };
  
  export function parseApiError(data: FastApiValidationError, fallback = "Something went wrong"): string {
    const { detail } = data;
  
    // Custom app errors: { detail: { message, code } }
    if (detail && typeof detail === "object" && !Array.isArray(detail) && "message" in detail) {
      return String((detail as { message: string }).message);
    }
  
    // Top-level message (AuthError handler shape)
    if ("message" in data && typeof (data as { message: unknown }).message === "string") {
      return (data as { message: string }).message;
    }
  
    // Pydantic / FastAPI validation: { detail: [{ loc, msg }] }
    if (Array.isArray(detail)) {
      return detail
        .map((err) => {
          const field = err.loc?.slice(-1)[0]; // e.g. "password"
          return field ? `${field}: ${err.msg}` : err.msg;
        })
        .join(". ");
    }
  
    return fallback;
  }