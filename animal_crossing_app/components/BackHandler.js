import { useCallback } from 'react';
import { BackHandler } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';

// From https://github.com/vonovak/react-navigation-backhandler

export const useAndroidBackHandler = (onBackPress) => (
  useFocusEffect((
    useCallback(() => {
      BackHandler.addEventListener('hardwareBackPress', onBackPress);

      return () => BackHandler.removeEventListener('hardwareBackPress', onBackPress);
    }, [onBackPress])
  ))
);

export const AndroidBackHandler = ({ onBackPress, children = null }) => {
  useAndroidBackHandler(onBackPress);

  return children;
};