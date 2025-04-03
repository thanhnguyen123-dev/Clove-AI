'use client';
import React from 'react';
import { signOut } from '@/app/actions/auth';

const SignOutButton = () => {
  const handleSignOut = async () => {
    await signOut();
  }
  
  return (
    <button onClick={handleSignOut}>Sign Out</button>
  );
}

export default SignOutButton;