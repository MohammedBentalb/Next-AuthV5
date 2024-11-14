/**
 * This is an array of routes that are accessible to the public
 * These routes do no require auth
 * @type {string[]}
 */
export const publicRoutes: string[] = ["/"];

/**
 * This is an array of routes used for authentication
 * These routes will redirect logged users to /settings
 * @type {string[]}
 */
export const authRoutes: string[] = ["/auth/login", "/auth/register"];

/**
 * This is a prefix for API authentication routes
 * Routes that starts with this prefix are used for API authentication
 * @type {string}
 */
export const apiAuthPrefix: string = "/api/auth";

/**
 * This is the default redirect after logging in
 * @type {string}
 */
export const DEFAULT_LOGIN_REDIRECT: string = "/settings";
