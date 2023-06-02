import { useEffect, useState } from "react";
import "./app.css";
import arrowRightIcon from "./assets/svg/icon-arrow.svg";

import axios from "axios";
import { MapContainer, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { MapMarker } from "./components/MapMarker";
import {
  ItemTextStrong,
  ItemTitles,
  MainBackground,
  Position,
  ResultItems,
  SeacrhIcon,
  SearchGroup,
  SearchInput,
  StyledDivChecker,
  StyledResultDiv,
  Title,
  Wrapper,
} from "./components/StyledComponent";
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

const initialDataFound: IDataFound = {
  ip: "",
  location: {
    country: "",
    region: "",
    timezone: "",
    lat: 0,
    lng: 0,
  },
  isp: "",
};

const App = () => {
  const [ipAddress, setIpAddress] = useState<string>("");
  const [text, setText] = useState<string>("");
  const [dataFound, setDataFound] = useState<IDataFound>(initialDataFound);

  useEffect(() => {
    const addressChecker = async () => {
      const data = await axios.get(
        `https://geo.ipify.org/api/v2/country,city,vpn?apiKey=${
          import.meta.env.VITE_APP_API_KEY
        }&ipAddress=${ipAddress}`
      );
      setDataFound(data.data);
    };
    addressChecker();
  }, [ipAddress]);

  const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setText(event.target.value);
  };

  const handleSearch = () => {
    setIpAddress(text);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <Wrapper>
      <StyledDivChecker>
        <MainBackground className="checker__background">
          <Title>IP Address Checker</Title>
          <SearchGroup>
            <SearchInput
              placeholder="Search for any IP address or domain"
              onChange={handleOnChange}
              onKeyDown={handleKeyDown}
            />
            <SeacrhIcon onClick={handleSearch}>
              <img
                style={{
                  height: "15px",
                  width: "15px",
                }}
                src={arrowRightIcon}
                alt=""
              />
            </SeacrhIcon>
          </SearchGroup>
        </MainBackground>
        <StyledResultDiv>
          <ResultItems>
            <ItemTitles>IP Address</ItemTitles>
            <ItemTextStrong>{dataFound?.ip}</ItemTextStrong>
          </ResultItems>
          <ResultItems>
            <ItemTitles>Location</ItemTitles>
            <ItemTextStrong>
              {dataFound?.location.region}, {dataFound?.location.country}
            </ItemTextStrong>
          </ResultItems>
          <ResultItems>
            <ItemTitles>Timezone</ItemTitles>
            <ItemTextStrong>UCT {dataFound?.location.timezone}</ItemTextStrong>
          </ResultItems>
          <ResultItems>
            <ItemTitles>ISP</ItemTitles>
            <ItemTextStrong>{dataFound?.isp}</ItemTextStrong>
          </ResultItems>
        </StyledResultDiv>
        <Position>
          <MapContainer center={[0, 0]} zoom={13}>
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors'
            />
            <MapMarker data={dataFound} />
          </MapContainer>
        </Position>
      </StyledDivChecker>
    </Wrapper>
  );
};

export default App;
