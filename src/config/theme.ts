import { useState, useEffect } from 'react';
import themes from '../constants/themes';

export const useTheming = (): [string, (value: string) => void] => {
  const [theme, changeTheme] = useState({ activeTheme: themes.default });
  useEffect(() => {
    document.getElementsByTagName('html')[0].className = theme.activeTheme;
  }, [theme]);
  const handleChange = (value: string) => {
    changeTheme({ activeTheme: value });
  };
  return [theme.activeTheme, handleChange];
};
