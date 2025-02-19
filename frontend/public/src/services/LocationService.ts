import { Platform, PermissionsAndroid } from 'react-native';
import Geolocation, { GeolocationResponse } from '@react-native-community/geolocation';

export class LocationService {
  static async requestPermissions(): Promise<boolean> {
    if (Platform.OS === 'ios') {
      const auth = await Geolocation.requestAuthorization('whenInUse');
      return auth === 'granted';
    }

    if (Platform.OS === 'android') {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: '位置权限',
          message: '智能导游需要获取您的位置信息以提供导览服务',
          buttonNeutral: '稍后询问',
          buttonNegative: '取消',
          buttonPositive: '确定'
        }
      );
      return granted === PermissionsAndroid.RESULTS.GRANTED;
    }
    return false;
  }

  static watchPosition(onLocationUpdate: (position: GeolocationResponse) => void): number {
    return Geolocation.watchPosition(
      onLocationUpdate,
      (error) => {
        console.error(error);
      },
      {
        enableHighAccuracy: true,
        distanceFilter: 5, // 最小更新距离：5米
        interval: 5000, // 更新间隔：5秒
        fastestInterval: 2000
      }
    );
  }

  static stopWatching(watchId: number): void {
    Geolocation.clearWatch(watchId);
  }
} 