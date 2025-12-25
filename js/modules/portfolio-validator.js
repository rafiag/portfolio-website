/**
 * Portfolio Data Validator
 * Validates portfolio data against a defined schema
 */

/**
 * Validation schema for portfolio project items
 */
const portfolioItemSchema = {
    title: {
        type: 'string',
        required: true,
        minLength: 1,
        maxLength: 200,
        description: 'Project title'
    },
    description: {
        type: 'string',
        required: true,
        minLength: 10,
        maxLength: 1000,
        description: 'Project description/summary'
    },
    image: {
        type: 'string',
        required: true,
        pattern: /^(https?:\/\/|assets\/)/,
        description: 'Image URL or relative path starting with assets/'
    },
    tags: {
        type: 'array',
        required: true,
        minItems: 1,
        maxItems: 10,
        itemType: 'string',
        description: 'Array of technology/skill tags'
    },
    details: {
        type: 'array',
        required: true,
        minItems: 1,
        maxItems: 20,
        itemType: 'string',
        itemMinLength: 10,
        itemMaxLength: 1000,
        description: 'Array of detailed project points'
    },
    link: {
        type: 'string',
        required: true,
        pattern: /^(https?:\/\/|mailto:|tel:|#|$)/,
        allowEmpty: true,
        description: 'External link URL (can be empty string)'
    }
};

/**
 * Validation error class
 */
export class ValidationError extends Error {
    constructor(message, field, value) {
        super(message);
        this.name = 'ValidationError';
        this.field = field;
        this.value = value;
    }
}

/**
 * Validates a single field against schema rules
 * @param {string} fieldName - Name of the field being validated
 * @param {*} value - Value to validate
 * @param {Object} rules - Validation rules from schema
 * @returns {Object} - { valid: boolean, errors: string[] }
 */
function validateField(fieldName, value, rules) {
    const errors = [];

    // Required check
    if (rules.required && (value === undefined || value === null)) {
        errors.push(`${fieldName} is required`);
        return { valid: false, errors };
    }

    // Skip further validation if field is optional and not provided
    if (!rules.required && (value === undefined || value === null)) {
        return { valid: true, errors: [] };
    }

    // Type check
    if (rules.type === 'string') {
        if (typeof value !== 'string') {
            errors.push(`${fieldName} must be a string, got ${typeof value}`);
        } else {
            // Empty string check
            if (!rules.allowEmpty && value.trim() === '') {
                errors.push(`${fieldName} cannot be empty`);
            }

            // Length checks
            if (rules.minLength !== undefined && value.length < rules.minLength) {
                errors.push(`${fieldName} must be at least ${rules.minLength} characters, got ${value.length}`);
            }
            if (rules.maxLength !== undefined && value.length > rules.maxLength) {
                errors.push(`${fieldName} must be at most ${rules.maxLength} characters, got ${value.length}`);
            }

            // Pattern check
            if (rules.pattern && !rules.pattern.test(value)) {
                // Special case for empty strings if allowed
                if (!(rules.allowEmpty && value === '')) {
                    errors.push(`${fieldName} does not match required pattern: ${rules.pattern}`);
                }
            }
        }
    } else if (rules.type === 'array') {
        if (!Array.isArray(value)) {
            errors.push(`${fieldName} must be an array, got ${typeof value}`);
        } else {
            // Array length checks
            if (rules.minItems !== undefined && value.length < rules.minItems) {
                errors.push(`${fieldName} must have at least ${rules.minItems} items, got ${value.length}`);
            }
            if (rules.maxItems !== undefined && value.length > rules.maxItems) {
                errors.push(`${fieldName} must have at most ${rules.maxItems} items, got ${value.length}`);
            }

            // Item type validation
            if (rules.itemType) {
                value.forEach((item, index) => {
                    if (typeof item !== rules.itemType) {
                        errors.push(`${fieldName}[${index}] must be a ${rules.itemType}, got ${typeof item}`);
                    } else if (rules.itemType === 'string') {
                        // Item string length checks
                        if (rules.itemMinLength !== undefined && item.length < rules.itemMinLength) {
                            errors.push(`${fieldName}[${index}] must be at least ${rules.itemMinLength} characters, got ${item.length}`);
                        }
                        if (rules.itemMaxLength !== undefined && item.length > rules.itemMaxLength) {
                            errors.push(`${fieldName}[${index}] must be at most ${rules.itemMaxLength} characters, got ${item.length}`);
                        }
                    }
                });
            }
        }
    }

    return {
        valid: errors.length === 0,
        errors
    };
}

/**
 * Validates a portfolio item against the schema
 * @param {number|string} id - Portfolio item ID
 * @param {Object} item - Portfolio item data
 * @param {boolean} throwOnError - Whether to throw on validation error
 * @returns {Object} - { valid: boolean, errors: Object }
 */
export function validatePortfolioItem(id, item, throwOnError = false) {
    const allErrors = {};
    let isValid = true;

    // Check if item exists
    if (!item || typeof item !== 'object') {
        const error = `Portfolio item ${id} is not a valid object`;
        if (throwOnError) {
            throw new ValidationError(error, id, item);
        }
        return { valid: false, errors: { [id]: [error] } };
    }

    // Validate each field
    for (const [fieldName, rules] of Object.entries(portfolioItemSchema)) {
        const result = validateField(fieldName, item[fieldName], rules);
        if (!result.valid) {
            isValid = false;
            allErrors[fieldName] = result.errors;
        }
    }

    // Check for unexpected fields
    const allowedFields = Object.keys(portfolioItemSchema);
    const actualFields = Object.keys(item);
    const unexpectedFields = actualFields.filter(field => !allowedFields.includes(field));

    if (unexpectedFields.length > 0) {
        isValid = false;
        allErrors._unexpected = unexpectedFields.map(field =>
            `Unexpected field: ${field}`
        );
    }

    if (!isValid && throwOnError) {
        const errorMessage = `Validation failed for portfolio item ${id}:\n` +
            Object.entries(allErrors)
                .map(([field, errors]) => `  ${field}: ${errors.join(', ')}`)
                .join('\n');
        throw new ValidationError(errorMessage, id, item);
    }

    return {
        valid: isValid,
        errors: allErrors
    };
}

/**
 * Validates all portfolio data
 * @param {Object} data - Complete portfolio data object
 * @param {boolean} throwOnError - Whether to throw on first validation error
 * @returns {Object} - { valid: boolean, errors: Object, summary: Object }
 */
export function validatePortfolioData(data, throwOnError = false) {
    const allErrors = {};
    let totalItems = 0;
    let validItems = 0;
    let invalidItems = 0;

    if (!data || typeof data !== 'object') {
        const error = 'Portfolio data must be an object';
        if (throwOnError) {
            throw new ValidationError(error, 'portfolioData', data);
        }
        return {
            valid: false,
            errors: { _root: [error] },
            summary: { totalItems: 0, validItems: 0, invalidItems: 0 }
        };
    }

    // Validate each portfolio item
    for (const [id, item] of Object.entries(data)) {
        totalItems++;
        const result = validatePortfolioItem(id, item, throwOnError);

        if (result.valid) {
            validItems++;
        } else {
            invalidItems++;
            allErrors[`item_${id}`] = result.errors;
        }
    }

    const isValid = invalidItems === 0;

    return {
        valid: isValid,
        errors: allErrors,
        summary: {
            totalItems,
            validItems,
            invalidItems
        }
    };
}

/**
 * Formats validation errors for console output
 * @param {Object} validationResult - Result from validatePortfolioData
 * @returns {string} - Formatted error message
 */
export function formatValidationErrors(validationResult) {
    if (validationResult.valid) {
        return `✓ All ${validationResult.summary.totalItems} portfolio items are valid`;
    }

    let output = `✗ Validation failed:\n`;
    output += `  Total items: ${validationResult.summary.totalItems}\n`;
    output += `  Valid: ${validationResult.summary.validItems}\n`;
    output += `  Invalid: ${validationResult.summary.invalidItems}\n\n`;

    for (const [itemKey, fieldErrors] of Object.entries(validationResult.errors)) {
        output += `${itemKey}:\n`;
        for (const [field, errors] of Object.entries(fieldErrors)) {
            errors.forEach(error => {
                output += `  - ${error}\n`;
            });
        }
        output += '\n';
    }

    return output;
}

/**
 * Gets the validation schema (for documentation/reference)
 * @returns {Object} - The portfolio item schema
 */
export function getSchema() {
    return portfolioItemSchema;
}
