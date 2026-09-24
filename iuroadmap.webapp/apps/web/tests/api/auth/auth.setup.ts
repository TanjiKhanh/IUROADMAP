import { expect, test as setup } from '@playwright/test';
import { parseTokenJwtTest } from '@sop/api/utils';
import authApi from '@sop/api/v2/authApi';
import customerApi from '@sop/api/v2/customerApi';
import { configureSharedApiClient } from '../shared/api-client-web-config';
import { type AuthState, storeAuthState } from './auth-utils';

/**
 * Authentication setup for API tests
 * This runs before all API tests and stores the authentication token
 */
setup('authenticate and get infrastructure', async () => {
  // Configure the shared API client first
  configureSharedApiClient();

  // Get credentials from environment variables
  const phone = process.env.API_USER_PHONE;
  const password = process.env.API_USER_PASSWORD;
  if (!phone || !password) {
    throw new Error('API_USER_PHONE and API_USER_PASSWORD must be set in .env file');
  }

  console.log('🔐 Logging in...');

  // Login to get access token
  const loginResponse = await authApi.login({
    phoneNumber: phone,
    password: password,
  });

  expect(loginResponse).toBeDefined();
  expect(loginResponse.access_token).toBeDefined();
  console.log('✅ Login successful');

  // Store initial auth state (without tenant ID yet)
  let authState: AuthState = {
    areaId: '',
    companyId: '',
    loginUserId: '',
    accessToken: loginResponse.access_token,
    tenantId: '',
  };
  storeAuthState(authState);

  // Configure client again with the new token
  configureSharedApiClient();

  console.log('🏢 Fetching infrastructure (customers)...');

  // Get list of customers/infrastructure
  const infrastructures = await customerApi.getInfrastructures();

  expect(infrastructures).toBeDefined();
  expect(infrastructures.length).toBeGreaterThan(0);
  console.log(`✅ Found ${infrastructures.length} customer(s)`);

  // Get the first customer
  const firstCustomer = infrastructures[0];
  console.log(`📍 Using customer: ${firstCustomer.name} (ID: ${firstCustomer.id})`);

  // Update auth state with tenant ID and customer info
  authState = {
    accessToken: loginResponse.access_token,
    tenantId: firstCustomer.id,
    companyId: firstCustomer.companies?.[0]?.id,
    areaId: firstCustomer.companies?.[0]?.areas?.[0]?.id,
    loginUserId: parseTokenJwtTest(loginResponse.access_token)?.userId ?? '',
  };

  // Store complete auth state
  storeAuthState(authState);
  console.log('💾 Auth state saved');

  // Log useful information
  if (authState.companyId) {
    console.log(`   Company ID: ${authState.companyId}`);
  }
  if (authState.areaId) {
    console.log(`   Area ID: ${authState.areaId}`);
  }

  console.log('✅ Authentication setup complete');
});
