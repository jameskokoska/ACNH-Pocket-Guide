import { createNavigationContainerRef } from '@react-navigation/native';
//   RootNavigation.navigate('home', {propsPassed: passed});

export const navigationRef = createNavigationContainerRef()

export function navigate(name, params) {
  if (navigationRef.isReady()) {
    navigationRef.navigate(name, params);
  }
}

export function getCurrentRoute() {
  if (navigationRef.isReady()) {
    return(navigationRef.current.getState().routeNames[navigationRef.current.getState().index])
  }
}