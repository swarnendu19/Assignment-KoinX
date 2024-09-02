
 export enum ErrorCode {
    BAD_REQUEST = 400, // For invalid or missing request data
    UNAUTHORIZED = 401, // For authentication failures
    FORBIDDEN = 403, // For insufficient permissions
    NOT_FOUND = 404, // For resources that don't exist
    INTERNAL_SERVER_ERROR = 500, // For unexpected server errors
   }
  
   export class ApiError extends Error {
    readonly statusCode: ErrorCode;
    readonly message: string;
    readonly errors?: string[];  
    readonly success: boolean = false;   
    constructor(
      statusCode: ErrorCode,
      message: string,
      errors?: string[]
    ) {
      super(message);
      this.statusCode = statusCode;
      this.message = message;
      this.errors = errors;
      Error.captureStackTrace(this, this.constructor);
    }
  }
  
   export function createApiErrorResponse(error: ApiError): Record<string, any> {
    return {
      statusCode: error.statusCode,
      message: error.message,
      errors: error.errors,  
      success: error.success,
    };
  }
  
