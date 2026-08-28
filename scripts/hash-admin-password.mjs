#!/usr/bin/env node
// Generate an ADMIN_PASSWORD_HASH value for the admin panel.
// Usage: node scripts/hash-admin-password.mjs 'your-strong-password'

import { randomBytes, scryptSync } from 'node:crypto'

const password = process.argv[2]

if (!password) {
  console.error("Usage: node scripts/hash-admin-password.mjs 'your-strong-password'")
  process.exit(1)
}

const salt = randomBytes(16)
const digest = scryptSync(password, salt, 64)

console.log(`ADMIN_PASSWORD_HASH=scrypt$${salt.toString('hex')}$${digest.toString('hex')}`)
