// Centralized API Base URL configuration for local & production environments
export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';

// Gemini API Key from environment variable
export const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
