import { GoogleLogin, GoogleOAuthProvider } from '@react-oauth/google';
import { useDispatch } from 'react-redux';
import { features } from '@iuroadmap/core';
import { setAccessToken } from '@iuroadmap/store';
import { useAuthenticationControllerLoginWithGoogle, type AuthLoginResponseDto } from '@iuroadmap/api-gen';
import { useTranslation } from '../../hooks/useTranslation';
import { apiErrorMessage, unwrapData } from '../../api/apiResult';
import { setAccessToken as persistAccessToken } from '../../auth/tokenStore';

const authKeys = features.auth.keys;
const GOOGLE_CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID;
/** Pages hide the Google button and its "OR" divider when this is false */
export const GOOGLE_SIGN_IN_ENABLED = Boolean(GOOGLE_CLIENT_ID);

export interface GoogleSignInButtonProps {
  /** Button caption: "Sign in with Google" (login) or "Sign up with Google" (register) */
  text: 'signin_with' | 'signup_with';
  onError: (message: string) => void;
}

/**
 * Google Identity Services button. The ID token goes to POST /auth/google, which signs in the account
 * with that email or creates a learner account; the page redirects once the store is authenticated.
 * Renders nothing while VITE_GOOGLE_CLIENT_ID is not set.
 */
export function GoogleSignInButton({ text, onError }: GoogleSignInButtonProps) {
  const dispatch = useDispatch();
  const { t, language } = useTranslation();
  const { mutateAsync: loginWithGoogle } = useAuthenticationControllerLoginWithGoogle();

  if (!GOOGLE_CLIENT_ID) return null;

  const onCredential = async (credential: string | undefined) => {
    if (!credential) {
      onError(t(authKeys.login.googleFailed));
      return;
    }
    try {
      const token = unwrapData<AuthLoginResponseDto>(await loginWithGoogle({ data: { idToken: credential } }))?.access_token;
      if (!token) {
        onError(t(authKeys.login.googleFailed));
        return;
      }
      persistAccessToken(token);
      dispatch(setAccessToken(token));
    } catch (err: unknown) {
      onError(apiErrorMessage(err, t, t(authKeys.login.googleFailed)));
    }
  };

  return (
    <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID} locale={language}>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <GoogleLogin
          text={text}
          size="large"
          shape="rectangular"
          theme="outline"
          onSuccess={(response) => onCredential(response.credential)}
          onError={() => onError(t(authKeys.login.googleFailed))}
        />
      </div>
    </GoogleOAuthProvider>
  );
}
