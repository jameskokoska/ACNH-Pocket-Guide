import { createNavigationContainerRef } from '@react-navigation/native';
//   RootNavigation.navigate('home', {propsPassed: passed});

export const navigationRef = createNavigationContainerRef()

export function navigate(name, params) {
  if (navigationRef.isReady()) {
    navigationRef.navigate(name, params);
  }
}