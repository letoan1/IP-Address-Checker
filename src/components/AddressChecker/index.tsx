import { useEffect, useState } from "react";
import React from "react";
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
} from "../StyledComponent";
import { MapContainer, TileLayer } from "react-leaflet";

import "../../app.css";
import arrowRightIcon from "../../assets/svg/icon-arrow.svg";
import { MapMarker } from "../MapMarker";
import { getDataChecker } from "../../api/ipChecker";
import { IDataFound } from "../../utils/type";
import { initialDataFound } from "../../utils/constant";

const AddressChecker = () => {
  const [ipAddress, setIpAddress] = useState<string>("");
  const [text, setText] = useState<string>("");
  const [dataFound, setDataFound] = useState<IDataFound>(initialDataFound);

  useEffect(() => {
    const addressChecker = async () => {
      const data = await getDataChecker(ipAddress);
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

export default AddressChecker;
