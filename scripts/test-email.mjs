/**
 * Verifies the contact-form email configuration.
 *
 *   node scripts/test-email.mjs            check the credentials only
 *   node scripts/test-email.mjs --send     also send a real test message
 *
 * Reads .env.local, so run it after filling in SMTP_PASS. Nothing here
 * touches the site — it talks to the mail server directly, which makes
 * it the fastest way to tell a wrong password from a wrong port.
 */

import { readFileSync } from 'node:fs';
import { createRequire } from 'node:module';

const require = createRequire(import.meta.url);
const nodemailer = require('nodemailer');

/* ---------- load .env.local ---------- */

let env = {};
try {
  env = Object.fromEntries(
    readFileSync(new URL('../.env.local', import.meta.url), 'utf8')
      .split('\n')
      .map((line) => line.trim())
      .filter((line) => line && !line.startsWith('#'))
      .map((line) => {
        const i = line.indexOf('=');
        const key = line.slice(0, i).trim();
        let value = line.slice(i + 1).trim();
        if (
          (value.startsWith('"') && value.endsWith('"')) ||
          (value.startsWith("'") && value.endsWith("'"))
        ) {
          value = value.slice(1, -1);
        }
        return [key, value];
      }),
  );
} catch {
  console.error('\n  Could not read .env.local — create it first (see EMAIL_SETUP.md)\n');
  process.exit(1);
}

const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, CONTACT_TO, CONTACT_FROM } = env;

console.log('\n  Contact form email check');
console.log('  ─────────────────────────────────────────────');
console.log('  host     :', SMTP_HOST || '(missing)');
console.log('  port     :', SMTP_PORT || '(missing)');
console.log('  user     :', SMTP_USER || '(missing)');
console.log('  password :', SMTP_PASS ? `${'•'.repeat(8)} (${SMTP_PASS.length} chars)` : '(missing)');
console.log('  sends to :', CONTACT_TO || '(missing)');
console.log('');

if (!SMTP_HOST || !SMTP_USER || !SMTP_PASS) {
  console.error('  ✗ Missing settings. Fill them in in .env.local.\n');
  process.exit(1);
}

if (SMTP_PASS.includes('PASTE_YOUR')) {
  console.error('  ✗ SMTP_PASS is still the placeholder.');
  console.error('    Replace it with the info@apexintelligence.in mailbox password.\n');
  process.exit(1);
}

/* ---------- verify ---------- */

const port = Number(SMTP_PORT ?? 465);
const transport = nodemailer.createTransport({
  host: SMTP_HOST,
  port,
  secure: port === 465,
  auth: { user: SMTP_USER, pass: SMTP_PASS },
});

try {
  await transport.verify();
  console.log('  ✓ Connected and authenticated\n');
} catch (err) {
  const msg = String(err?.message ?? err);
  console.error('  ✗ Failed:', msg, '\n');

  if (/auth|535|credentials|password/i.test(msg)) {
    console.error('    The password was rejected. Reset it in hPanel:');
    console.error('    Emails → Email Accounts → (...) → Change password\n');
  } else if (/timeout|ETIMEDOUT|ECONNREFUSED|ENOTFOUND/i.test(msg)) {
    console.error('    Could not reach the server. Try SMTP_PORT=587 instead of 465,');
    console.error('    or check whether your network blocks outbound SMTP.\n');
  }
  process.exit(1);
}

/* ---------- optionally send ---------- */

if (process.argv.includes('--send')) {
  console.log('  Sending a test message…\n');
  try {
    const info = await transport.sendMail({
      from: CONTACT_FROM || SMTP_USER,
      to: CONTACT_TO || SMTP_USER,
      subject: 'Test — contact form is working',
      text:
        'This is a test from scripts/test-email.mjs.\n\n' +
        'If you are reading it in the info@apexintelligence.in inbox, the\n' +
        'website contact form is correctly configured and enquiries will\n' +
        'arrive here.',
    });
    console.log('  ✓ Sent. Message id:', info.messageId);
    console.log(`    Check the ${CONTACT_TO || SMTP_USER} inbox.\n`);
  } catch (err) {
    console.error('  ✗ Send failed:', err?.message ?? err, '\n');
    process.exit(1);
  }
} else {
  console.log('  Credentials are good. To send a real test message:\n');
  console.log('    node scripts/test-email.mjs --send\n');
}

process.exit(0);
