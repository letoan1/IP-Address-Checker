import { useEffect, useState } from "react";
import "./app.css";
import arrowRightIcon from "./assets/svg/icon-arrow.svg";

import styled from "styled-components";
import axios from "axios";
import { MapContainer, Marker, Popup, TileLayer, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
interface IDataFound {
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

const Wrapper = styled.section`
  position: relative;
`;

const StyledDivChecker = styled.div`
  position: relative;
`;

const MainBackground = styled.div`
  width: 100%;
  height: 250px;
  z-index: 1;
  @media only screen and (max-width: 375px) {
    height: 300px;
  }
`;

const Title = styled.h1`
  color: #fff;
  padding: 24px;
  text-align: center;
`;

const SearchGroup = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const SearchInput = styled.input`
  padding: 14px;
  border-radius: 8px;
  border: none;
  outline: none;
  width: 300px;
`;

const SeacrhIcon = styled.div`
  background: #000;
  width: 40px;
  height: 44px;
  border-bottom-right-radius: 8px;
  border-top-right-radius: 8px;
  margin-left: -40px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`;

const StyledResultDiv = styled.div`
  display: flex;
  box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
  justify-content: space-around;
  position: absolute;
  width: 80%;
  left: 50%;
  transform: translateX(-50%);
  top: 70%;
  z-index: 9999;
  background: #fff;
  border-radius: 8px;
  padding: 20px;
  gap: 50px;

  @media only screen and (max-width: 375px) {
    flex-direction: column;
    gap: 10px;
    top: 50%;
  }
`;

const Position = styled.div`
  position: absolute;
  height: 75vh;
  width: 100%;
  z-index: -1;
  overflow: hidden;
`;

const ResultItems = styled.div`
  width: 25%;
  height: 100px;

  &:not(:last-child) {
    border-right: 1px solid #ccc;
  }

  @media only screen and (max-width: 375px) {
    width: 100%;
    height: 80px;
    border: none;
    text-align: center;
    &:not(:last-child) {
      border: none;
    }
  }
`;

const ItemTitles = styled.p`
  color: #ccc;
  text-transform: uppercase;
  margin-bottom: 16px;
`;

const ItemTextStrong = styled.strong`
  font-size: 24px;
`;

const App = () => {
  const [ipAddress, setIpAddress] = useState<string>("");
  const [text, setText] = useState<string>("");
  const [dataFound, setDataFound] = useState<IDataFound>();

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

  const MapMarker = () => {
    const map = useMap();
    if (dataFound?.location.lat && dataFound?.location.lng) {
      map.setView([dataFound?.location.lat, dataFound?.location.lng], 13);
      return (
        <Marker position={[dataFound?.location.lat, dataFound?.location.lng]}>
          <Popup>
            {dataFound?.location.region}, {dataFound?.location.country}
          </Popup>
        </Marker>
      );
    }
    return null;
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
            <MapMarker />
          </MapContainer>
        </Position>
      </StyledDivChecker>
    </Wrapper>
  );
};

export default App;
