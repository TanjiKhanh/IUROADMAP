import { Page, expect } from '@playwright/test';
import { BasePage } from './BasePage';
import { APP_ROUTES } from '../support/app-routes';
import { TEST_USERS } from '../support/test-data';

/**
 * Page Object for Authentication (/login, /register, /forgot-password)
 */
export class AuthPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  async navigateToLogin() {
    await this.goto(APP_ROUTES.PUBLIC.LOGIN);
    await this.verifyPageTitle(/GUPJOB|IUROADMAP/i);
  }

  async navigateToRegister() {
    await this.goto(APP_ROUTES.PUBLIC.REGISTER);
  }

  async login(email: string, pass: string) {
    await this.navigateToLogin();
    await this.fillInputByLabel(/email/i, email);
    await this.fillInputByLabel(/password/i, pass);
    await this.clickButton(/sign in|login/i);
  }

  async loginAsLearner() {
    await this.login(TEST_USERS.LEARNER.email, TEST_USERS.LEARNER.password);
  }

  async loginAsAdmin() {
    await this.login(TEST_USERS.ADMIN.email, TEST_USERS.ADMIN.password);
  }

  async loginAsMentor() {
    await this.login(TEST_USERS.MENTOR.email, TEST_USERS.MENTOR.password);
  }

  async registerLearner(email: string, pass: string) {
    await this.navigateToRegister();
    await this.fillInputByLabel(/email/i, email);
    await this.fillInputByLabel(/^password$/i, pass);
    await this.fillInputByLabel(/confirm password/i, pass);
    await this.clickButton(/create account|register/i);
  }
}
