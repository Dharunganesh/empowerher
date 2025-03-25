declare module 'react-native-maps' {
  import { Component } from 'react';
  import { ViewProps } from 'react-native';

  export interface Region {
    latitude: number;
    longitude: number;
    latitudeDelta: number;
    longitudeDelta: number;
  }

  export interface MapViewProps extends ViewProps {
    region?: Region;
    initialRegion?: Region;
    onRegionChange?: (region: Region) => void;
    onRegionChangeComplete?: (region: Region) => void;
    provider?: 'google' | undefined;
    showsUserLocation?: boolean;
    showsMyLocationButton?: boolean;
  }

  export default class MapView extends Component<MapViewProps> {
    static Marker: any;
    static Polyline: any;
  }

  export class Marker extends Component<any> {}
  export class Polyline extends Component<any> {}
}

declare module 'react-native-vector-icons/MaterialCommunityIcons' {
  import { Component } from 'react';
  interface IconProps {
    name: string;
    size?: number;
    color?: string;
    style?: any;
  }
  export default class Icon extends Component<IconProps> {}
}

declare module 'react-native-geolocation-service' {
  interface GeoPosition {
    coords: {
      latitude: number;
      longitude: number;
      altitude: number | null;
      accuracy: number;
      altitudeAccuracy: number | null;
      heading: number | null;
      speed: number | null;
    };
    timestamp: number;
  }

  interface GeoError {
    code: number;
    message: string;
  }

  type SuccessCallback = (position: GeoPosition) => void;
  type ErrorCallback = (error: GeoError) => void;
  type GeoOptions = {
    timeout?: number;
    maximumAge?: number;
    enableHighAccuracy?: boolean;
    distanceFilter?: number;
    useSignificantChanges?: boolean;
  };

  export function getCurrentPosition(
    successCallback: SuccessCallback,
    errorCallback?: ErrorCallback,
    options?: GeoOptions
  ): void;

  export function watchPosition(
    successCallback: SuccessCallback,
    errorCallback?: ErrorCallback,
    options?: GeoOptions
  ): number;

  export function clearWatch(watchId: number): void;
  export function stopObserving(): void;
} 
