import { createNavigationContainerRef, StackActions } from '@react-navigation/native';
//   RootNavigation.navigate('home', {propsPassed: passed});

export const navigationRef = createNavigationContainerRef()

export function navigate(name, params) {
  if (navigationRef.isReady()) {
    navigationRef.navigate(name, params);
  }
}

export function getCurrentRoute() {
  if (navigationRef.isReady()) {
    if(navigationRef.current !== undefined && navigationRef.current.getCurrentRoute()!==undefined && navigationRef.current.getCurrentRoute().name!==undefined){
      return navigationRef.current.getCurrentRoute().name
    }
  }
  return ""
}

export function popRoute(number) {
  if (navigationRef.isReady() && navigationRef.canGoBack()){
    const popAction = StackActions.pop(number);
    navigationRef.dispatch(popAction)
  }
  return true
}