// provider.js
import { NextUIProvider } from '@heroui/react';
import { ThemeProvider as NextThemesProvider } from 'next-themes';

export default function Provider({ children }) {
  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme="system"
      value={{
        light: '',    // No extra class for light mode
        dark: 'dark', // Apply the 'dark' class for dark mode
      }}
    >
      <NextUIProvider>{children}</NextUIProvider>
    </NextThemesProvider>
  );
}
