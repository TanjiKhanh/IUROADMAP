import { expect, test as setup } from '@playwright/test';
import { type AuthState, storeAuthState } from './auth-utils';

/**
 * Authentication setup for API tests
 * This runs before all API tests and stores the authentication token
 */
setup('authenticate and save token', async ({ request }) => {
  // Get credentials from environment variables
  const email = process.env.API_USER_EMAIL;
  const password = process.env.API_USER_PASSWORD;

  if (!email || !password) {
    throw new Error('API_USER_EMAIL and API_USER_PASSWORD must be set in .env file');
  }

  console.log('🔐 Logging in via API...');

  // Login to get access token using IUROADMAP API
  const response = await request.post('/api/v1/auth/login', {
    data: {
      email: email,
      password: password,
    },
  });

  expect(response.ok()).toBeTruthy();

  const body = await response.json();
  const accessToken = body.data?.access_token || body.access_token;
  expect(accessToken).toBeDefined();

  console.log('✅ Login successful');

  // Store auth state
  const authState: AuthState = {
    accessToken: accessToken
  };

  // Store complete auth state
  storeAuthState(authState);
  console.log('💾 Auth state saved');
});
