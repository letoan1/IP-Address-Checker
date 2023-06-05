import { Marker, Popup, useMap } from "react-leaflet";
import { IIpifyResponse } from "~/utils/types";

interface Props {
  data: IIpifyResponse;
}

export const MapMarker: React.FC<Props> = ({ data }) => {
  const map = useMap();
  if (data?.location.lat && data?.location.lng) {
    map.setView([data?.location.lat, data?.location.lng], 13);
    return (
      <Marker position={[data?.location.lat, data?.location.lng]}>
        <Popup>
          {data?.location.region}, {data?.location.country}
        </Popup>
      </Marker>
    );
  }
  return null;
};
