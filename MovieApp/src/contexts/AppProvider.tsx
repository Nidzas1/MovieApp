import React, { ReactNode } from 'react';
import { PostProvider } from './PostContext';
import { MovieProvider } from './MovieContext';

interface AppProviderProps {
  children: ReactNode;
}

const AppProvider: React.FC<AppProviderProps> = ({ children }) => (
  <PostProvider>
    <MovieProvider>
      {children}
    </MovieProvider>
  </PostProvider>
);

export default AppProvider;