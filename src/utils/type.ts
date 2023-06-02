export interface IDataFound {
  ip: string;
  location: {
    country: string;
    region: string;
    timezone: string;
    lat: number;
    lng: number;
  };
  isp: string;
}
