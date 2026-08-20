import core from './core.json';
import auth from './auth.json';
import publicLocale from '../../features/public/locales/vi.json';
import navigation from './navigation.json';
import learner from './learner.json';
import mentor from './mentor.json';
import admin from './admin-portal.json';
import permission from './permission.json';

export default {
  ...core,
  auth,
  ...publicLocale,
  ...navigation,
  ...learner,
  ...mentor,
  admin,
  ...permission,
};
