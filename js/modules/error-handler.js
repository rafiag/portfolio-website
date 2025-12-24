/**
 * Error Handler Module
 * Global error handling for the application
 */

export function initGlobalErrorHandlers() {
    // Global error handler
    window.addEventListener('error', (event) => {
        console.error('Global error caught:', {
            message: event.message,
            filename: event.filename,
            lineno: event.lineno,
            colno: event.colno,
            error: event.error
        });
        // Prevent default browser error handling
        return false;
    });

    // Handle unhandled promise rejections
    window.addEventListener('unhandledrejection', (event) => {
        console.error('Unhandled promise rejection:', event.reason);
        // Prevent default browser error handling
        event.preventDefault();
    });
}
