/**
 * Portfolio Data Validation Tests
 * Tests the portfolio data validator module
 */

import {
    validatePortfolioItem,
    validatePortfolioData,
    formatValidationErrors,
    getSchema,
    ValidationError
} from '../js/modules/portfolio-validator.js';

// Test utilities
const testResults = [];

function test(description, testFn) {
    try {
        testFn();
        testResults.push({ description, passed: true, error: null });
        console.log(`✓ ${description}`);
    } catch (error) {
        testResults.push({ description, passed: false, error: error.message });
        console.error(`✗ ${description}`, error);
    }
}

function assert(condition, message) {
    if (!condition) {
        throw new Error(message || 'Assertion failed');
    }
}

function assertEquals(actual, expected, message) {
    if (actual !== expected) {
        throw new Error(message || `Expected ${expected}, got ${actual}`);
    }
}

function assertDeepEquals(actual, expected, message) {
    const actualStr = JSON.stringify(actual);
    const expectedStr = JSON.stringify(expected);
    if (actualStr !== expectedStr) {
        throw new Error(message || `Expected ${expectedStr}, got ${actualStr}`);
    }
}

// Valid test data
const validPortfolioItem = {
    title: "Test Project",
    description: "This is a test project description with enough characters to pass validation.",
    image: "assets/images/portfolio/test.webp",
    tags: ["JavaScript", "React", "Node.js"],
    details: [
        "First detail point with sufficient length for validation",
        "Second detail point also meeting minimum requirements",
        "Third detail with technical information"
    ],
    link: "https://example.com/project"
};

console.log('\n=== Portfolio Data Validation Tests ===\n');

// Schema tests
test('getSchema returns schema object', () => {
    const schema = getSchema();
    assert(schema !== null, 'Schema should not be null');
    assert(typeof schema === 'object', 'Schema should be an object');
    assert(schema.title, 'Schema should have title field');
    assert(schema.description, 'Schema should have description field');
});

// Valid data tests
test('Valid portfolio item passes validation', () => {
    const result = validatePortfolioItem(1, validPortfolioItem);
    assert(result.valid === true, 'Valid item should pass');
    assertDeepEquals(result.errors, {}, 'Should have no errors');
});

test('Valid portfolio data passes validation', () => {
    const data = { 1: validPortfolioItem };
    const result = validatePortfolioData(data);
    assert(result.valid === true, 'Valid data should pass');
    assertEquals(result.summary.validItems, 1, 'Should have 1 valid item');
    assertEquals(result.summary.invalidItems, 0, 'Should have 0 invalid items');
});

// Required field tests
test('Missing title fails validation', () => {
    const item = { ...validPortfolioItem };
    delete item.title;
    const result = validatePortfolioItem(1, item);
    assert(result.valid === false, 'Should fail without title');
    assert(result.errors.title, 'Should have title error');
});

test('Missing description fails validation', () => {
    const item = { ...validPortfolioItem };
    delete item.description;
    const result = validatePortfolioItem(1, item);
    assert(result.valid === false, 'Should fail without description');
    assert(result.errors.description, 'Should have description error');
});

test('Missing image fails validation', () => {
    const item = { ...validPortfolioItem };
    delete item.image;
    const result = validatePortfolioItem(1, item);
    assert(result.valid === false, 'Should fail without image');
    assert(result.errors.image, 'Should have image error');
});

test('Missing tags fails validation', () => {
    const item = { ...validPortfolioItem };
    delete item.tags;
    const result = validatePortfolioItem(1, item);
    assert(result.valid === false, 'Should fail without tags');
    assert(result.errors.tags, 'Should have tags error');
});

test('Missing details fails validation', () => {
    const item = { ...validPortfolioItem };
    delete item.details;
    const result = validatePortfolioItem(1, item);
    assert(result.valid === false, 'Should fail without details');
    assert(result.errors.details, 'Should have details error');
});

test('Missing link fails validation', () => {
    const item = { ...validPortfolioItem };
    delete item.link;
    const result = validatePortfolioItem(1, item);
    assert(result.valid === false, 'Should fail without link');
    assert(result.errors.link, 'Should have link error');
});

// Type validation tests
test('Title must be string', () => {
    const item = { ...validPortfolioItem, title: 123 };
    const result = validatePortfolioItem(1, item);
    assert(result.valid === false, 'Should fail with number title');
    assert(result.errors.title, 'Should have title type error');
});

test('Description must be string', () => {
    const item = { ...validPortfolioItem, description: ['array'] };
    const result = validatePortfolioItem(1, item);
    assert(result.valid === false, 'Should fail with array description');
    assert(result.errors.description, 'Should have description type error');
});

test('Tags must be array', () => {
    const item = { ...validPortfolioItem, tags: 'not an array' };
    const result = validatePortfolioItem(1, item);
    assert(result.valid === false, 'Should fail with string tags');
    assert(result.errors.tags, 'Should have tags type error');
});

test('Details must be array', () => {
    const item = { ...validPortfolioItem, details: 'not an array' };
    const result = validatePortfolioItem(1, item);
    assert(result.valid === false, 'Should fail with string details');
    assert(result.errors.details, 'Should have details type error');
});

// Length validation tests
test('Title too short fails validation', () => {
    const item = { ...validPortfolioItem, title: '' };
    const result = validatePortfolioItem(1, item);
    assert(result.valid === false, 'Should fail with empty title');
    assert(result.errors.title, 'Should have title length error');
});

test('Title too long fails validation', () => {
    const item = { ...validPortfolioItem, title: 'a'.repeat(201) };
    const result = validatePortfolioItem(1, item);
    assert(result.valid === false, 'Should fail with too long title');
    assert(result.errors.title, 'Should have title length error');
});

test('Description too short fails validation', () => {
    const item = { ...validPortfolioItem, description: 'short' };
    const result = validatePortfolioItem(1, item);
    assert(result.valid === false, 'Should fail with short description');
    assert(result.errors.description, 'Should have description length error');
});

test('Description too long fails validation', () => {
    const item = { ...validPortfolioItem, description: 'a'.repeat(1001) };
    const result = validatePortfolioItem(1, item);
    assert(result.valid === false, 'Should fail with too long description');
    assert(result.errors.description, 'Should have description length error');
});

// Array validation tests
test('Tags array cannot be empty', () => {
    const item = { ...validPortfolioItem, tags: [] };
    const result = validatePortfolioItem(1, item);
    assert(result.valid === false, 'Should fail with empty tags array');
    assert(result.errors.tags, 'Should have tags array error');
});

test('Tags array cannot have too many items', () => {
    const item = { ...validPortfolioItem, tags: Array(11).fill('tag') };
    const result = validatePortfolioItem(1, item);
    assert(result.valid === false, 'Should fail with too many tags');
    assert(result.errors.tags, 'Should have tags array error');
});

test('Details array cannot be empty', () => {
    const item = { ...validPortfolioItem, details: [] };
    const result = validatePortfolioItem(1, item);
    assert(result.valid === false, 'Should fail with empty details array');
    assert(result.errors.details, 'Should have details array error');
});

test('Details array items must meet minimum length', () => {
    const item = { ...validPortfolioItem, details: ['short'] };
    const result = validatePortfolioItem(1, item);
    assert(result.valid === false, 'Should fail with short detail item');
    assert(result.errors.details, 'Should have details item length error');
});

test('Tags array items must be strings', () => {
    const item = { ...validPortfolioItem, tags: [123, 456] };
    const result = validatePortfolioItem(1, item);
    assert(result.valid === false, 'Should fail with non-string tags');
    assert(result.errors.tags, 'Should have tags item type error');
});

// Pattern validation tests
test('Image must start with assets/ or http(s)://', () => {
    const item = { ...validPortfolioItem, image: 'invalid/path.jpg' };
    const result = validatePortfolioItem(1, item);
    assert(result.valid === false, 'Should fail with invalid image path');
    assert(result.errors.image, 'Should have image pattern error');
});

test('Image with https:// passes validation', () => {
    const item = { ...validPortfolioItem, image: 'https://example.com/image.jpg' };
    const result = validatePortfolioItem(1, item);
    assert(result.valid === true, 'Should pass with https:// image');
});

test('Image with http:// passes validation', () => {
    const item = { ...validPortfolioItem, image: 'http://example.com/image.jpg' };
    const result = validatePortfolioItem(1, item);
    assert(result.valid === true, 'Should pass with http:// image');
});

test('Link can be empty string', () => {
    const item = { ...validPortfolioItem, link: '' };
    const result = validatePortfolioItem(1, item);
    assert(result.valid === true, 'Should pass with empty link');
});

test('Link with https:// passes validation', () => {
    const item = { ...validPortfolioItem, link: 'https://example.com' };
    const result = validatePortfolioItem(1, item);
    assert(result.valid === true, 'Should pass with https:// link');
});

test('Link with mailto: passes validation', () => {
    const item = { ...validPortfolioItem, link: 'mailto:test@example.com' };
    const result = validatePortfolioItem(1, item);
    assert(result.valid === true, 'Should pass with mailto: link');
});

// Unexpected field tests
test('Unexpected fields are reported', () => {
    const item = { ...validPortfolioItem, unexpectedField: 'value' };
    const result = validatePortfolioItem(1, item);
    assert(result.valid === false, 'Should fail with unexpected field');
    assert(result.errors._unexpected, 'Should have unexpected field error');
});

// Multiple items validation
test('Multiple portfolio items validation', () => {
    const data = {
        1: validPortfolioItem,
        2: validPortfolioItem,
        3: { ...validPortfolioItem, title: '' } // Invalid
    };
    const result = validatePortfolioData(data);
    assert(result.valid === false, 'Should fail with one invalid item');
    assertEquals(result.summary.totalItems, 3, 'Should have 3 total items');
    assertEquals(result.summary.validItems, 2, 'Should have 2 valid items');
    assertEquals(result.summary.invalidItems, 1, 'Should have 1 invalid item');
});

// Error formatting tests
test('formatValidationErrors returns string for valid data', () => {
    const data = { 1: validPortfolioItem };
    const result = validatePortfolioData(data);
    const formatted = formatValidationErrors(result);
    assert(typeof formatted === 'string', 'Should return string');
    assert(formatted.includes('✓'), 'Should include success indicator');
});

test('formatValidationErrors returns detailed errors for invalid data', () => {
    const data = { 1: { ...validPortfolioItem, title: '' } };
    const result = validatePortfolioData(data);
    const formatted = formatValidationErrors(result);
    assert(typeof formatted === 'string', 'Should return string');
    assert(formatted.includes('✗'), 'Should include error indicator');
    assert(formatted.includes('Invalid:'), 'Should include invalid count');
});

// ValidationError class tests
test('ValidationError has correct properties', () => {
    const error = new ValidationError('Test error', 'testField', 'testValue');
    assertEquals(error.name, 'ValidationError', 'Should have correct name');
    assertEquals(error.field, 'testField', 'Should have field property');
    assertEquals(error.value, 'testValue', 'Should have value property');
});

// Edge case tests
test('Null portfolio item fails validation', () => {
    const result = validatePortfolioItem(1, null);
    assert(result.valid === false, 'Should fail with null item');
});

test('Undefined portfolio item fails validation', () => {
    const result = validatePortfolioItem(1, undefined);
    assert(result.valid === false, 'Should fail with undefined item');
});

test('Empty portfolio data object is valid', () => {
    const result = validatePortfolioData({});
    assert(result.valid === true, 'Empty data should be valid');
    assertEquals(result.summary.totalItems, 0, 'Should have 0 items');
});

test('Null portfolio data fails validation', () => {
    const result = validatePortfolioData(null);
    assert(result.valid === false, 'Should fail with null data');
});

// Summary
console.log('\n=== Test Summary ===');
const totalTests = testResults.length;
const passedTests = testResults.filter(r => r.passed).length;
const failedTests = totalTests - passedTests;

console.log(`Total: ${totalTests}`);
console.log(`✓ Passed: ${passedTests}`);
console.log(`✗ Failed: ${failedTests}`);

if (failedTests > 0) {
    console.log('\nFailed tests:');
    testResults.filter(r => !r.passed).forEach(r => {
        console.log(`  - ${r.description}: ${r.error}`);
    });
}

export { testResults };
