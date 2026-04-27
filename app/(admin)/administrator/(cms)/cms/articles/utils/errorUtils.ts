import { ErrorWithStatusCode } from "../types";


export const createApiError = (message:string, statusCode?:number):ErrorWithStatusCode => {
    const error = new Error(message) as ErrorWithStatusCode;
    if(statusCode !== undefined){
        error.statusCode = statusCode;
    }
    return error
}

export const getErrorMessage = (statusCode?: number): string => {
  if (statusCode === undefined) {
    return "Connection error with YandexGPT";
  }

  switch (statusCode) {
    case 400:
      return "Incorrect request to YandexGPT API";
    case 401:
      return "Incorrect API key to YandexGPT";
    case 403:
      return "Permission to YandexGPT API is denied";
    case 404:
      return " YandexGPT API not found";
    case 429:
      return "To many requests to YandexGPT";
    case 500:
      return "Internal server error YandexGPT";
    case 502:
      return "Bad gateway YandexGPT";
    case 503:
      return "YandexGPT service temporarily unavailable";
    case 504:
      return "Gateway timeout YandexGPT";
    default:
      // Коды 4xx
      if (statusCode >= 400 && statusCode < 500) {
        return `Client error YandexGPT (${statusCode})`;
      }
      // Коды 5xx
      if (statusCode >= 500 && statusCode < 600) {
        return `Server error YandexGPT (${statusCode})`;
      }
      // Другие коды
      return `YandexGPT error (${statusCode})`;
  }
};

// Получение полного сообщения об ошибке
export const getFullErrorMessage = (error: ErrorWithStatusCode): string => {
  const userMessage = getErrorMessage(error.statusCode);
  const errorMessage = error.message;

  if (error.statusCode !== undefined) {
    return `${userMessage}\n\nHTTP code: ${error.statusCode}\Message: ${errorMessage}`;
  }

  return `${userMessage}\n\nMessage: ${errorMessage}`;
};

// Type guard для проверки типа ErrorWithStatusCode
export const isErrorWithStatusCode = (
  error: unknown,
): error is ErrorWithStatusCode => {
  return error instanceof Error && "statusCode" in error;
};