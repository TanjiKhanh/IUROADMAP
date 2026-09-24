/**
 * E2E Test Constants
 *
 * Route paths, timeouts, and shared selectors for E2E tests.
 */

export const ROUTES = {
  signIn: '/sign-in',
  config: {
    users: '/config/users',
    userCreate: '/config/users/create',
    userDetail: (id: string) => `/config/users/${id}`,
    userEdit: (id: string) => `/config/users/${id}/edit`,
    roles: '/config/roles',
    roleCreate: '/config/roles/create',
    roleEdit: (id: string) => `/config/roles/${id}/edit`,
  },
} as const;

export const TIMEOUTS = {
  /** Short wait for immediate DOM updates */
  short: 3_000,
  /** Normal navigation / page load */
  navigation: 15_000,
  /** Form submit + toast appearance */
  formSubmit: 10_000,
  /** Toast visibility */
  toast: 8_000,
  /** Long operations (API calls, data load) */
  long: 20_000,
} as const;

export const SELECTORS = {
  /** Ant Design table */
  table: '.ant-table',
  tableRow: '.ant-table-row',
  tableBody: '.ant-table-tbody',
  /** Ant Design toast / notification */
  toastSuccess: '.ant-message-success, .ant-notification-notice-success',
  toastError: '.ant-message-error, .ant-notification-notice-error',
  /** Ant Design confirmation modal */
  confirmModal: '.ant-modal-confirm',
  confirmOkBtn: '.ant-modal-confirm .ant-btn-primary, .ant-popconfirm .ant-btn-primary',
  confirmCancelBtn: '.ant-modal-confirm .ant-btn:not(.ant-btn-primary)',
  /** Ant Design spinner / loading */
  spinner: '.ant-spin-spinning',
  skeleton: '.ant-skeleton',
  /** Ant Design form validation */
  formError: '.ant-form-item-explain-error',
  /** Ant Design select dropdown */
  selectDropdown: '.ant-select-dropdown',
  selectOption: '.ant-select-item-option',
  /** Ant Design pagination */
  pagination: '.ant-pagination',
  nextPageBtn: '.ant-pagination-next',
  prevPageBtn: '.ant-pagination-prev',
  /** Ant Design card */
  card: '.ant-card',
} as const;

export const NON_EXISTENT_UUID = '00000000-0000-0000-0000-000000000000';
