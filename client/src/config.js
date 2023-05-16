export const API_URL =
  process.env.NODE_ENV === 'production'
    ? 'http://localisaiton-url:8000'
    : 'http://localhost:8000';
