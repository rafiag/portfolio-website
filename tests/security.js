// Security Testing Suite
// Tests CSP compliance, external links security, sensitive data exposure, form sanitization
// No browser automation required - uses static HTML analysis

import { readFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const projectRoot = join(__dirname, '..');

// Read HTML files
function readHTML(filename) {
  return readFileSync(join(projectRoot, filename), 'utf-8');
}

function runSecurityTests() {
  console.log('\n🎯 SECURITY TEST SUITE');
  console.log('Testing security best practices and vulnerabilities\n');

  let passed = 0;
  let failed = 0;
  let warnings = 0;

  const htmlFiles = ['index.html', 'portfolio.html'];
  const allContent = htmlFiles.map(f => ({ file: f, content: readHTML(f) }));

  // ========================================
  // INLINE JAVASCRIPT & CSP COMPLIANCE
  // ========================================
  console.log('='.repeat(60));
  console.log('Testing CSP Compliance (No Inline JavaScript)');
  console.log('='.repeat(60));

  console.log('\n🔒 Checking for inline JavaScript...');

  let totalInlineScripts = 0;
  let totalInlineHandlers = 0;
  const foundIssues = [];

  allContent.forEach(({ file, content }) => {
    // Check for inline script tags (excluding JSON-LD)
    const inlineScripts = [];

    let match;
    const scriptPattern = /<script([^>]*)>([\s\S]*?)<\/script>/gi;
    while ((match = scriptPattern.exec(content)) !== null) {
      const attrs = match[1];
      const scriptContent = match[2];

      // Skip if it has src attribute or is JSON-LD
      if (!attrs.includes('src=') && !attrs.includes('application/ld+json') && scriptContent.trim()) {
        inlineScripts.push(scriptContent.substring(0, 100));
      }
    }

    // Check for inline event handlers
    const handlerRegex = /\s(on\w+)=["'][^"']+["']/gi;
    const handlers = [];
    while ((match = handlerRegex.exec(content)) !== null) {
      handlers.push(match[0]);
    }

    if (inlineScripts.length > 0 || handlers.length > 0) {
      foundIssues.push({ file, inlineScripts, handlers });
      totalInlineScripts += inlineScripts.length;
      totalInlineHandlers += handlers.length;
    }
  });

  console.log(`  Inline <script> tags (non-JSON-LD): ${totalInlineScripts}`);
  console.log(`  Inline event handlers: ${totalInlineHandlers}`);

  if (totalInlineScripts === 0 && totalInlineHandlers === 0) {
    console.log(`  ✅ No inline JavaScript detected (CSP compliant)`);
    passed++;
  } else {
    console.log(`  ❌ Inline JavaScript found (violates CSP best practices)`);
    foundIssues.forEach(({ file, inlineScripts, handlers }) => {
      if (inlineScripts.length > 0) {
        console.log(`\n  ${file} - ${inlineScripts.length} inline script(s)`);
      }
      if (handlers.length > 0) {
        console.log(`  ${file} - ${handlers.length} inline handler(s): ${handlers.slice(0, 3).join(', ')}`);
      }
    });
    failed++;
  }

  // ========================================
  // EXTERNAL LINKS SECURITY
  // ========================================
  console.log('\n' + '='.repeat(60));
  console.log('Testing External Links Security');
  console.log('='.repeat(60));

  console.log('\n🔗 Checking external link security attributes...');

  let totalExternal = 0;
  let secureLinks = 0;
  let insecureLinks = 0;
  const insecureDetails = [];

  allContent.forEach(({ file, content }) => {
    // Find all external links
    const linkRegex = /<a\s+([^>]*href=["']https?:\/\/[^"']+["'][^>]*)>/gi;
    let match;

    while ((match = linkRegex.exec(content)) !== null) {
      const attrs = match[1];
      totalExternal++;

      const hasBlank = /target=["']_blank["']/i.test(attrs);
      const hasNoopener = /rel=["'][^"']*noopener[^"']*["']/i.test(attrs);

      if (hasBlank && !hasNoopener) {
        insecureLinks++;
        const hrefMatch = /href=["']([^"']+)["']/.exec(attrs);
        const href = hrefMatch ? hrefMatch[1] : 'unknown';
        insecureDetails.push({ file, href: href.substring(0, 50) });
      } else {
        secureLinks++;
      }
    }
  });

  console.log(`  Total external links: ${totalExternal}`);
  console.log(`  Secure links: ${secureLinks}`);
  console.log(`  Insecure links: ${insecureLinks}`);

  if (insecureLinks === 0) {
    console.log(`  ✅ All external links are secure (rel="noopener" on target="_blank")`);
    passed++;
  } else {
    console.log(`  ❌ ${insecureLinks} insecure external link(s) found:`);
    insecureDetails.forEach(({ file, href }, i) => {
      console.log(`    ${i + 1}. [${file}] ${href}...`);
      console.log(`       Missing: rel="noopener noreferrer"`);
    });
    failed++;
  }

  // ========================================
  // SENSITIVE DATA EXPOSURE
  // ========================================
  console.log('\n' + '='.repeat(60));
  console.log('Testing for Sensitive Data Exposure');
  console.log('='.repeat(60));

  console.log('\n🔍 Scanning for sensitive data patterns...');

  const sensitivePatterns = {
    apiKeys: /(['"`])(api[_-]?key|apikey|key)['"`]\s*[:=]\s*['"`][a-zA-Z0-9_-]{20,}['"`]/gi,
    passwords: /(['"`])(password|passwd|pwd)['"`]\s*[:=]\s*['"`][^'"`]{8,}['"`]/gi,
    tokens: /(['"`])(token|auth[_-]?token|access[_-]?token)['"`]\s*[:=]\s*['"`][a-zA-Z0-9_-]{20,}['"`]/gi,
    secrets: /(['"`])(secret|client[_-]?secret)['"`]\s*[:=]\s*['"`][a-zA-Z0-9_-]{20,}['"`]/gi,
    privateKeys: /(-----BEGIN\s+(?:RSA\s+)?PRIVATE\s+KEY-----)/gi,
    awsKeys: /(AKIA[0-9A-Z]{16})/gi
  };

  const findings = {
    total: 0,
    byType: {}
  };

  const fullContent = allContent.map(f => f.content).join('\n');

  Object.entries(sensitivePatterns).forEach(([type, pattern]) => {
    const matches = fullContent.match(pattern);
    if (matches && matches.length > 0) {
      findings.byType[type] = matches.length;
      findings.total += matches.length;
    }
  });

  if (findings.total === 0) {
    console.log(`  ✅ No obvious sensitive data patterns found in HTML`);
    passed++;
  } else {
    console.log(`  ⚠️  Found ${findings.total} potential sensitive data pattern(s):`);
    Object.entries(findings.byType).forEach(([type, count]) => {
      console.log(`    ${type}: ${count} match(es)`);
    });
    console.log(`  Note: Review these manually to confirm if they are actual secrets`);
    warnings++;
  }

  // ========================================
  // COMMENTS WITH SENSITIVE INFO
  // ========================================
  console.log('\n💬 Checking HTML comments for sensitive info...');

  const commentRegex = /<!--([\s\S]*?)-->/g;
  const suspiciousComments = [];
  const suspiciousPattern = /password|secret|key|token|api|todo.*security|fixme.*security|hack|temp|credential/gi;

  allContent.forEach(({ file, content }) => {
    let match;
    while ((match = commentRegex.exec(content)) !== null) {
      const comment = match[1].trim();
      if (suspiciousPattern.test(comment)) {
        suspiciousComments.push({ file, comment: comment.substring(0, 100) });
      }
    }
  });

  if (suspiciousComments.length === 0) {
    console.log(`  ✅ No suspicious comments found`);
    passed++;
  } else {
    console.log(`  ⚠️  Found ${suspiciousComments.length} suspicious comment(s):`);
    suspiciousComments.forEach(({ file, comment }, i) => {
      console.log(`    ${i + 1}. [${file}] ${comment}...`);
    });
    warnings++;
  }

  // ========================================
  // FORM INPUT VALIDATION
  // ========================================
  console.log('\n' + '='.repeat(60));
  console.log('Testing Form Input Security');
  console.log('='.repeat(60));

  console.log('\n📝 Checking form inputs...');

  let formCount = 0;
  let inputCount = 0;
  let inputsWithValidation = 0;

  allContent.forEach(({ content }) => {
    formCount += (content.match(/<form/gi) || []).length;

    const inputRegex = /<(input|textarea)[^>]*>/gi;
    let match;
    while ((match = inputRegex.exec(content)) !== null) {
      inputCount++;
      const input = match[0];

      // Check for validation attributes
      if (/required|pattern|minlength|maxlength|min=|max=/i.test(input)) {
        inputsWithValidation++;
      }
    }
  });

  if (formCount === 0) {
    console.log(`  ℹ️  No forms found on pages`);
    console.log(`     Note: If contact form is added, ensure proper validation & sanitization`);
  } else {
    console.log(`  Forms: ${formCount}`);
    console.log(`  Inputs: ${inputCount}`);
    console.log(`  Inputs with validation: ${inputsWithValidation}`);
    console.log(`  Inputs without validation: ${inputCount - inputsWithValidation}`);

    if (inputsWithValidation === inputCount) {
      console.log(`  ✅ All form inputs have validation attributes`);
      passed++;
    } else {
      console.log(`  ⚠️  Some inputs lack validation`);
      warnings++;
    }
  }

  // ========================================
  // XSS PROTECTION
  // ========================================
  console.log('\n🛡️  Checking for XSS vulnerabilities...');

  const xssFindings = [];

  allContent.forEach(({ file, content }) => {
    // Check for dangerous patterns in inline scripts
    const scriptContent = content.replace(/<script[^>]*type=["']application\/ld\+json["'][^>]*>[\s\S]*?<\/script>/gi, '');

    if (/\.innerHTML\s*=/i.test(scriptContent)) {
      xssFindings.push({ file, issue: 'innerHTML usage', severity: 'warning' });
    }
    if (/document\.write\(/i.test(scriptContent)) {
      xssFindings.push({ file, issue: 'document.write() usage', severity: 'warning' });
    }
    if (/\beval\s*\(/i.test(scriptContent)) {
      xssFindings.push({ file, issue: 'eval() usage', severity: 'critical' });
    }

    // Check for dangerous attributes
    if (/javascript:/i.test(content) && !content.includes('noopener')) {
      xssFindings.push({ file, issue: 'javascript: protocol in href', severity: 'critical' });
    }
  });

  if (xssFindings.length === 0) {
    console.log(`  ✅ No obvious XSS vulnerabilities detected`);
    passed++;
  } else {
    xssFindings.forEach(({ file, issue, severity }) => {
      if (severity === 'critical') {
        console.log(`  ❌ [${file}] ${issue}`);
        failed++;
      } else {
        console.log(`  ⚠️  [${file}] ${issue}`);
        warnings++;
      }
    });
  }

  // ========================================
  // MIXED CONTENT
  // ========================================
  console.log('\n🔒 Checking for mixed content (HTTP resources)...');

  const mixedContent = [];

  allContent.forEach(({ file, content }) => {
    // Check for HTTP (not HTTPS) resources
    const httpResources = [
      ...content.matchAll(/<script[^>]+src=["']http:\/\/(?!localhost)[^"']+["']/gi),
      ...content.matchAll(/<link[^>]+href=["']http:\/\/(?!localhost)[^"']+["']/gi),
      ...content.matchAll(/<img[^>]+src=["']http:\/\/(?!localhost)[^"']+["']/gi),
      ...content.matchAll(/<iframe[^>]+src=["']http:\/\/(?!localhost)[^"']+["']/gi)
    ];

    httpResources.forEach(match => {
      const urlMatch = /http:\/\/[^"']+/.exec(match[0]);
      if (urlMatch) {
        mixedContent.push({ file, url: urlMatch[0].substring(0, 70) });
      }
    });
  });

  if (mixedContent.length === 0) {
    console.log(`  ✅ No mixed content detected`);
    passed++;
  } else {
    console.log(`  ⚠️  Found ${mixedContent.length} insecure resource(s):`);
    mixedContent.forEach(({ file, url }, i) => {
      console.log(`    ${i + 1}. [${file}] ${url}...`);
    });
    console.log(`     Update to HTTPS or use protocol-relative URLs`);
    warnings++;
  }

  // ========================================
  // META SECURITY HEADERS
  // ========================================
  console.log('\n🛡️  Checking meta security tags...');

  let hasCSP = false;

  allContent.forEach(({ content }) => {
    if (/<meta[^>]+http-equiv=["']Content-Security-Policy["']/i.test(content)) {
      hasCSP = true;
    }
  });

  if (hasCSP) {
    console.log(`  ✅ Content-Security-Policy meta tag found`);
    passed++;
  } else {
    console.log(`  ⚠️  No CSP meta tag (should be configured in server headers for production)`);
    warnings++;
  }

  // ========================================
  // SUMMARY
  // ========================================
  console.log('\n' + '='.repeat(60));
  console.log('📊 SECURITY TEST SUMMARY');
  console.log('='.repeat(60));
  console.log(`✅ Passed: ${passed}`);
  console.log(`❌ Failed: ${failed}`);
  console.log(`⚠️  Warnings: ${warnings}`);
  const total = passed + failed;
  if (total > 0) {
    console.log(`Success Rate: ${((passed / total) * 100).toFixed(1)}%`);
  }
  console.log('='.repeat(60));

  console.log('\n🔐 Security Recommendations:');
  console.log('  HIGH PRIORITY (Production):');
  console.log('    - Enforce HTTPS with HSTS headers');
  console.log('    - Add Content Security Policy (CSP) headers');
  console.log('    - Set all security headers (X-Frame-Options, X-Content-Type-Options, etc.)');
  console.log('    - Ensure all external links have rel="noopener noreferrer"');
  console.log('\n  MEDIUM PRIORITY:');
  console.log('    - Remove any inline JavaScript for CSP compliance');
  console.log('    - Sanitize all user inputs if forms are added');
  console.log('    - Avoid using innerHTML, document.write, eval()');
  console.log('    - Review and remove sensitive comments');
  console.log('\n  BEST PRACTICES:');
  console.log('    - Regular security audits');
  console.log('    - Keep dependencies updated');
  console.log('    - Implement rate limiting on APIs');
  console.log('    - Use Subresource Integrity (SRI) for CDN resources');

  console.log('\n✅ Security testing complete!');

  // Exit with error code if there are failures
  if (failed > 0) {
    process.exit(1);
  }
}

try {
  runSecurityTests();
} catch (error) {
  console.error('\n❌ Critical error during testing:', error.message);
  process.exit(1);
}
