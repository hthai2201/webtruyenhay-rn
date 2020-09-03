import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
import { useTheme } from 'react-native-paper';
const GradientBackground = ({ children, ...rest }) => {
  const theme = useTheme();
  return (
    <LinearGradient
      {...rest}
      // Button Linear Gradient
      colors={[theme.colors.purple, theme.colors.pink]}
      start={{
        x: 0,
        y: 0.5,
      }}
      end={{
        x: 0.5,
        y: 1,
      }}>
      {children}
    </LinearGradient>
  );
};

export default GradientBackground;
