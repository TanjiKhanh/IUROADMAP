// gateway/src/config/jwt.config.ts

import * as fs from 'fs';
import * as path from 'path';

let publicKey: string;

export function getJwtPublicKey(): string {
  if (publicKey) return publicKey;

  const keyPath = process.env.JWT_PUBLIC_KEY_PATH;

  if (keyPath) {
    publicKey = fs.readFileSync(path.resolve(keyPath), 'utf-8');
  } else if (process.env.JWT_PUBLIC_KEY) {
    publicKey = process.env.JWT_PUBLIC_KEY.replace(/\\n/g, '\n');
  } else {
    throw new Error('JWT_PUBLIC_KEY or JWT_PUBLIC_KEY_PATH must be set');
  }

  return publicKey;
}