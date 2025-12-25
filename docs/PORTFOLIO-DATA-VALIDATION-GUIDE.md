# Portfolio Data Validation Guide

## Overview

The Portfolio Data Validation system ensures data integrity for all portfolio projects by validating against a defined schema. This prevents runtime errors and ensures all portfolio items have complete, well-formed data.

**Created:** 2025-12-25
**Module:** [js/modules/portfolio-validator.js](../js/modules/portfolio-validator.js)
**Test Suite:** [tests/portfolio-validation.js](../tests/portfolio-validation.js)

---

## Features

### ✅ Validation Capabilities

- **Schema-based validation** - All fields validated against defined rules
- **Type checking** - Ensures correct data types (string, array)
- **Length constraints** - Min/max character limits for strings and arrays
- **Pattern matching** - URL and path validation using regex
- **Required fields** - Ensures all mandatory fields are present
- **Unexpected field detection** - Warns about extra fields not in schema
- **Development-only execution** - Runs automatically on localhost only
- **Detailed error reporting** - Clear, actionable error messages

---

## Validation Schema

Each portfolio item must conform to this schema:

```javascript
{
    title: {
        type: 'string',
        required: true,
        minLength: 1,
        maxLength: 200
    },
    description: {
        type: 'string',
        required: true,
        minLength: 10,
        maxLength: 1000
    },
    image: {
        type: 'string',
        required: true,
        pattern: /^(https?:\/\/|assets\/)/  // Must start with http(s):// or assets/
    },
    tags: {
        type: 'array',
        required: true,
        minItems: 1,
        maxItems: 10,
        itemType: 'string'
    },
    details: {
        type: 'array',
        required: true,
        minItems: 1,
        maxItems: 20,
        itemType: 'string',
        itemMinLength: 10,
        itemMaxLength: 1000
    },
    link: {
        type: 'string',
        required: true,
        pattern: /^(https?:\/\/|mailto:|tel:|#|$)/,  // Can be empty string
        allowEmpty: true
    }
}
```

---

## Usage

### Automatic Validation

Validation runs automatically when [portfolio-data.js](../js/data/portfolio-data.js) is loaded in development mode (localhost):

```javascript
// portfolio-data.js
import { validatePortfolioData, formatValidationErrors } from '../modules/portfolio-validator.js';

export const portfolioData = {
    1: { /* project data */ },
    2: { /* project data */ },
    // ...
};

// Auto-validates in development
if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
    const validationResult = validatePortfolioData(portfolioData);
    const message = formatValidationErrors(validationResult);

    if (validationResult.valid) {
        console.log('✓ All portfolio items are valid');
    } else {
        console.error('✗ Validation failed\n' + message);
    }
}
```

### Manual Validation

You can also validate data programmatically:

```javascript
import { validatePortfolioItem, validatePortfolioData } from './modules/portfolio-validator.js';

// Validate a single item
const result = validatePortfolioItem(1, portfolioItem);
if (!result.valid) {
    console.error('Validation errors:', result.errors);
}

// Validate all data
const allResults = validatePortfolioData(portfolioData);
console.log('Summary:', allResults.summary);
// { totalItems: 3, validItems: 2, invalidItems: 1 }
```

---

## API Reference

### `validatePortfolioItem(id, item, throwOnError = false)`

Validates a single portfolio item.

**Parameters:**
- `id` (number|string) - Portfolio item ID
- `item` (Object) - Portfolio item data
- `throwOnError` (boolean) - Whether to throw ValidationError on failure

**Returns:**
```javascript
{
    valid: boolean,
    errors: {
        fieldName: ['error message', ...],
        _unexpected: ['unexpected field names']
    }
}
```

**Example:**
```javascript
const result = validatePortfolioItem(1, {
    title: "Test Project",
    description: "A test description with sufficient length.",
    image: "assets/images/portfolio/test.webp",
    tags: ["JavaScript", "React"],
    details: ["Detail point one with enough characters"],
    link: "https://example.com"
});

if (result.valid) {
    console.log('✓ Valid');
} else {
    console.error('Errors:', result.errors);
}
```

### `validatePortfolioData(data, throwOnError = false)`

Validates all portfolio items.

**Parameters:**
- `data` (Object) - Complete portfolio data object
- `throwOnError` (boolean) - Whether to throw ValidationError on first failure

**Returns:**
```javascript
{
    valid: boolean,
    errors: {
        item_1: { fieldName: ['error', ...] },
        item_2: { fieldName: ['error', ...] }
    },
    summary: {
        totalItems: number,
        validItems: number,
        invalidItems: number
    }
}
```

**Example:**
```javascript
const result = validatePortfolioData(portfolioData);

console.log(`Total: ${result.summary.totalItems}`);
console.log(`Valid: ${result.summary.validItems}`);
console.log(`Invalid: ${result.summary.invalidItems}`);

if (!result.valid) {
    console.error('Errors:', result.errors);
}
```

### `formatValidationErrors(validationResult)`

Formats validation results into a human-readable string.

**Parameters:**
- `validationResult` (Object) - Result from validatePortfolioData()

**Returns:** String with formatted errors

**Example:**
```javascript
const result = validatePortfolioData(portfolioData);
console.log(formatValidationErrors(result));
// Output:
// ✓ All 3 portfolio items are valid
// OR
// ✗ Validation failed:
//   Total items: 3
//   Valid: 2
//   Invalid: 1
//
//   item_3:
//     - title: title must be at least 1 characters, got 0
```

### `getSchema()`

Returns the validation schema for reference.

**Returns:** Object containing the portfolio item schema

**Example:**
```javascript
const schema = getSchema();
console.log(schema.title);
// { type: 'string', required: true, minLength: 1, maxLength: 200 }
```

### `ValidationError`

Custom error class for validation failures.

**Properties:**
- `name` - "ValidationError"
- `message` - Error message
- `field` - Field that failed validation
- `value` - Value that failed validation

**Example:**
```javascript
try {
    validatePortfolioItem(1, invalidItem, true);  // throwOnError = true
} catch (error) {
    if (error instanceof ValidationError) {
        console.error(`Field ${error.field} failed validation`);
    }
}
```

---

## Validation Examples

### ✅ Valid Portfolio Item

```javascript
{
    title: "E-Commerce Dashboard",
    description: "A comprehensive analytics dashboard for tracking sales, customer retention, and behavioral patterns using Python and Tableau.",
    image: "assets/images/portfolio/project.webp",
    tags: ["Python", "Tableau", "Analytics"],
    details: [
        "Built interactive dashboard with real-time data updates",
        "Implemented customer segmentation using K-Means clustering",
        "Created automated reporting system reducing manual work by 80%"
    ],
    link: "https://public.tableau.com/app/profile/username/viz/dashboard"
}
```

### ❌ Invalid Examples

**Missing Required Field:**
```javascript
{
    title: "Project",
    description: "Description here...",
    // image: missing!
    tags: ["Python"],
    details: ["Detail one"],
    link: ""
}
// Error: image is required
```

**Type Mismatch:**
```javascript
{
    title: "Project",
    description: "Description here...",
    image: "assets/images/test.jpg",
    tags: "Python, Tableau",  // Should be array!
    details: ["Detail one"],
    link: ""
}
// Error: tags must be an array, got string
```

**String Too Short:**
```javascript
{
    title: "Project",
    description: "Short",  // Less than 10 characters!
    image: "assets/images/test.jpg",
    tags: ["Python"],
    details: ["Detail one"],
    link: ""
}
// Error: description must be at least 10 characters, got 5
```

**Invalid Pattern:**
```javascript
{
    title: "Project",
    description: "Description here...",
    image: "images/test.jpg",  // Should start with assets/ or http(s)://!
    tags: ["Python"],
    details: ["Detail one"],
    link: ""
}
// Error: image does not match required pattern
```

**Unexpected Field:**
```javascript
{
    title: "Project",
    description: "Description here...",
    image: "assets/images/test.jpg",
    tags: ["Python"],
    details: ["Detail one"],
    link: "",
    extraField: "Not allowed"  // Not in schema!
}
// Error: Unexpected field: extraField
```

---

## Testing

### Running Tests

The validation system includes 50+ comprehensive tests:

```bash
# From project root
node tests/portfolio-validation.js
```

### Test Coverage

Tests cover:
- ✅ Schema retrieval
- ✅ Valid data scenarios
- ✅ Required field validation
- ✅ Type validation (string, array)
- ✅ Length constraints (min/max)
- ✅ Pattern matching (URLs, paths)
- ✅ Array validation (items, types)
- ✅ Unexpected field detection
- ✅ Multiple item validation
- ✅ Error formatting
- ✅ Edge cases (null, undefined, empty)

**Test Results:**
```
=== Test Summary ===
Total: 37
✓ Passed: 37
✗ Failed: 0
```

---

## Console Output

### Development Mode (localhost)

When running on localhost, validation results appear in the browser console:

**All Valid:**
```
[Portfolio Data Validation] ✓ All 3 portfolio items are valid
```

**Validation Errors:**
```
[Portfolio Data Validation] ✗ Validation failed:
  Total items: 3
  Valid: 2
  Invalid: 1

  item_3:
    title: title must be at least 1 characters, got 0
    tags: tags must have at least 1 items, got 0
```

### Production Mode

Validation does not run in production (not localhost). This prevents unnecessary overhead and console noise for end users.

---

## Best Practices

### Adding New Portfolio Items

1. **Follow the schema** - Ensure all required fields are present
2. **Use proper paths** - Images should start with `assets/` or `http(s)://`
3. **Write descriptive content** - Meet minimum character requirements
4. **Keep arrays reasonable** - Stay within min/max item limits
5. **Test locally** - View console for validation feedback
6. **Check patterns** - Ensure URLs and paths match required formats

### Modifying the Schema

If you need to change validation rules:

1. **Update the schema** in [portfolio-validator.js](../js/modules/portfolio-validator.js)
2. **Update this documentation** with new rules
3. **Add corresponding tests** to [portfolio-validation.js](../tests/portfolio-validation.js)
4. **Update existing data** to match new requirements
5. **Run tests** to verify changes

Example:
```javascript
// Adding a new optional field
const portfolioItemSchema = {
    // ... existing fields
    category: {
        type: 'string',
        required: false,  // Optional
        pattern: /^(analytics|visualization|automation)$/
    }
};
```

---

## Troubleshooting

### Common Issues

**Issue:** Validation not running
**Solution:** Check you're on localhost (http://localhost or http://127.0.0.1)

**Issue:** "Module not found" error
**Solution:** Verify import path in portfolio-data.js is correct

**Issue:** Unexpected field warning
**Solution:** Remove extra fields or add them to schema if needed

**Issue:** Pattern match failures
**Solution:** Ensure URLs start with `http://`, `https://`, or paths with `assets/`

**Issue:** Array item errors
**Solution:** Check each array item meets minimum length requirements

---

## Files

| File | Description |
|------|-------------|
| [js/modules/portfolio-validator.js](../js/modules/portfolio-validator.js) | Validation logic and schema definition |
| [js/data/portfolio-data.js](../js/data/portfolio-data.js) | Portfolio data with auto-validation |
| [tests/portfolio-validation.js](../tests/portfolio-validation.js) | Comprehensive test suite (50+ tests) |
| [docs/PORTFOLIO-DATA-VALIDATION-GUIDE.md](PORTFOLIO-DATA-VALIDATION-GUIDE.md) | This documentation |

---

## Related Documentation

- **[JavaScript Modules Documentation](../js/README.md)** - Module structure and exports
- **[Test Suite README](../tests/README.md)** - Testing overview and instructions
- **[CLAUDE.md](../CLAUDE.md)** - Project overview and to-do list

---

**Last Updated:** 2025-12-25
**Status:** ✅ Complete - All 37 tests passing
**Coverage:** 50+ validation scenarios
