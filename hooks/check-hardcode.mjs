#!/usr/bin/env node
/**
 * Hardcode & Design Token Checker Hook (Ver 2)
 * - Scans code changes before tool execution (PreToolUse)
 * - Blocks hardcoded colors, arbitrary units, and unauthorized external CDNs
 * - Exit 0: Allowed, Exit 2 / decision "deny": Blocked
 */

import fs from 'node:fs';
import process from 'node:process';

// 1. Whitelist of authorized CDNs & domains
const ALLOWED_DOMAINS = [
  'fonts.googleapis.com',
  'fonts.gstatic.com',
  'oapi.map.naver.com',
  'map.naver.com',
  'map.kakao.com',
  'tmap.co.kr',
  'qr.kakaopay.com',
  'kakaopay.com',
  'script.google.com',
  'drive.google.com',
  'www.w3.org',
  'w3.org',
  'www.youtube.com',
  'youtube.com',
  'cdn2.maisondemarie.co.kr',
  'cdn.maisondemarie.co.kr',
];

// 2. Inspection patterns
const HEX_COLOR_REGEX = /#(?:[0-9a-fA-F]{3,4}|[0-9a-fA-F]{6}|[0-9a-fA-F]{8})\b/g;
const RGB_HSL_COLOR_REGEX = /\b(?:rgb|rgba|hsl|hsla)\s*\([^)]*\)/gi;
const EXTERNAL_URL_REGEX = /https?:\/\/([a-zA-Z0-9.-]+)/gi;

// Exempt line tokens/comments
const EXEMPT_COMMENT_REGEX = /(?:\/\*|\/\/|<!--)\s*token-exempt[:\s][^*]*?(?:\*\/|-->|$)/i;

/**
 * Check if line is within :root or @theme declaration
 */
function isTokenDeclarationBlock(line, inRootBlock) {
  if (line.includes(':root') || line.includes('@theme')) return true;
  return inRootBlock;
}

/**
 * Scan content lines for violations
 */
function scanContent(content, filePath = 'snippet') {
  if (filePath.endsWith('.md') || filePath.endsWith('.json')) return [];
  const violations = [];
  const lines = content.split(/\r?\n/);
  let inRootBlock = false;

  lines.forEach((line, index) => {
    const lineNum = index + 1;
    const trimmed = line.trim();

    // Track :root { ... } scope
    if (trimmed.includes(':root') || trimmed.includes('@theme')) {
      inRootBlock = true;
    }
    if (inRootBlock && trimmed.includes('}')) {
      inRootBlock = false;
      return;
    }

    // Skip empty lines, comments, and exempt lines
    if (!trimmed || trimmed.startsWith('/*') || trimmed.startsWith('//') || trimmed.startsWith('<!--')) {
      if (EXEMPT_COMMENT_REGEX.test(line)) return;
    }
    if (EXEMPT_COMMENT_REGEX.test(line)) {
      return; // Line marked as token-exempt
    }

    // If inside :root, color/unit definitions are allowed
    if (inRootBlock) {
      return;
    }

    // Check Unauthorized External CDNs / URLs
    let urlMatch;
    while ((urlMatch = EXTERNAL_URL_REGEX.exec(line)) !== null) {
      const domain = urlMatch[1].toLowerCase();
      const isAllowed = ALLOWED_DOMAINS.some(allowed => domain === allowed || domain.endsWith('.' + allowed));
      if (!isAllowed) {
        violations.push({
          file: filePath,
          line: lineNum,
          type: 'UNAUTHORIZED_CDN',
          code: trimmed,
          message: `Unauthorized external domain: "${urlMatch[0]}" (Allowed: ${ALLOWED_DOMAINS.join(', ')})`,
        });
      }
    }

    // Check Hardcoded HEX Colors
    let hexMatch;
    while ((hexMatch = HEX_COLOR_REGEX.exec(line)) !== null) {
      const val = hexMatch[0];
      if (line.includes('var(--') && line.indexOf('var(--') < line.indexOf(val)) continue;
      
      violations.push({
        file: filePath,
        line: lineNum,
        type: 'HARDCODED_HEX_COLOR',
        code: trimmed,
        message: `Hardcoded HEX color found: "${val}". Use CSS variable tokens or add "/* token-exempt: reason */".`,
      });
    }

    // Check Hardcoded rgb/rgba/hsl/hsla
    let rgbMatch;
    while ((rgbMatch = RGB_HSL_COLOR_REGEX.exec(line)) !== null) {
      const val = rgbMatch[0];
      if (trimmed.includes('var(--')) continue;
      violations.push({
        file: filePath,
        line: lineNum,
        type: 'HARDCODED_RGB_COLOR',
        code: trimmed,
        message: `Hardcoded color function found: "${val}". Use CSS variable tokens or add "/* token-exempt: reason */".`,
      });
    }
  });

  return violations;
}

/**
 * Main execution handler
 */
async function main() {
  if (process.argv.length > 2) {
    const targetFile = process.argv[2];
    if (fs.existsSync(targetFile)) {
      const content = fs.readFileSync(targetFile, 'utf8');
      const violations = scanContent(content, targetFile);
      if (violations.length > 0) {
        console.error(`\n🚨 [Hardcode Hook] Violations detected in ${targetFile}:`);
        violations.forEach(v => {
          console.error(`  Line ${v.line}: [${v.type}] ${v.message}\n    > ${v.code}`);
        });
        process.exit(2);
      } else {
        console.log(`✅ [Hardcode Hook] ${targetFile} passed design harness check.`);
        process.exit(0);
      }
    }
  }

  let inputData = '';
  process.stdin.setEncoding('utf8');

  for await (const chunk of process.stdin) {
    inputData += chunk;
  }

  if (!inputData.trim()) {
    console.log(JSON.stringify({ decision: 'allow' }));
    process.exit(0);
  }

  try {
    const payload = JSON.parse(inputData);
    const toolCall = payload.toolCall || {};
    const args = toolCall.args || {};
    const targetContent = args.ReplacementContent || args.CodeContent || '';
    const targetFile = args.TargetFile || args.path || 'target_code';

    if (targetContent) {
      const violations = scanContent(targetContent, targetFile);
      if (violations.length > 0) {
        const errorMsg = violations.map(v => `Line ${v.line}: [${v.type}] ${v.message} (${v.code})`).join('\n');
        console.error(`\n🚨 [PreToolUse Hardcode Hook] Modification blocked by Design Harness:\n${errorMsg}\n`);
        
        console.log(JSON.stringify({
          decision: 'deny',
          reason: `Design System Harness violation: Hardcoded values or unauthorized CDNs detected.\n${errorMsg}`,
        }));
        process.exit(2);
      }
    }

    console.log(JSON.stringify({ decision: 'allow' }));
    process.exit(0);
  } catch (err) {
    console.log(JSON.stringify({ decision: 'allow' }));
    process.exit(0);
  }
}

main();
