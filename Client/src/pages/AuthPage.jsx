// src/pages/AuthPage.jsx
import { SignIn, SignUp } from '@clerk/clerk-react';

export const AuthPage = () => (
  <div style={{ display: 'flex', justifyContent: 'center', padding: '2rem' }}>
    <SignIn routing="path" path="/sign-in" />
    <SignUp routing="path" path="/sign-up" />
  </div>
);