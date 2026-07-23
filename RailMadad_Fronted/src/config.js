// Centralized API Base URL configuration for local & production environments
export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';

// Gemini API Key (Can be overridden via VITE_GEMINI_API_KEY environment variable on Vercel)
export const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY || "AIzaSyCZpCZCeOHtMk2s2T3_ZUuVoifq_b4dIKQ";
