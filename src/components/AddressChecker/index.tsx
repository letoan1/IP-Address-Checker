/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import React from "react";
import { MapContainer, TileLayer } from "react-leaflet";

import {
  ErrorText,
  ImageSVG,
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
import "~/app.css";
import arrowRightIcon from "~/assets/svg/icon-arrow.svg";
import { MapMarker } from "../MapMarker";
import { getDataCheckerDomain, getDataCheckerIP } from "~/apis/ipChecker";
import { IIpifyResponse } from "~/utils/types";
import { isDomainName, isValidIpAddress } from "~/utils/validations";

// eslint-disable-next-line react-refresh/only-export-components
export const initialIpifyPResponse: IIpifyResponse = {
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

const AddressChecker = () => {
  const [ipAddress, setIpAddress] = useState<string>("");
  const [text, setText] = useState<string>("");
  const [dataList, setDataList] = useState<IIpifyResponse>(
    initialIpifyPResponse
  );
  const [errorMessage, setErrorMessage] = useState<string>("");

  const handleSearch = () => {
    if (text.trim() === "") {
      setErrorMessage("This field cannot be left blank");
    } else {
      setErrorMessage("");
      setIpAddress(text);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      if (isValidIpAddress(ipAddress)) {
        try {
          const data = await getDataCheckerIP(ipAddress);
          setDataList(data.data);
          setErrorMessage("");
        } catch (error: any) {
          if (error.response.status === 422) {
            setErrorMessage("Input correct IPv4 or IPv6 address.");
          }
        }
      } else if (isDomainName(ipAddress)) {
        try {
          const data = await getDataCheckerDomain(ipAddress);
          setDataList(data.data);
          setErrorMessage("");
        } catch (error: any) {
          console.log(error);
        }
      } else {
        setErrorMessage("Input a valid IP address or domain name.");
      }
    };

    if (ipAddress) {
      fetchData();
    }
  }, [ipAddress]);

  const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setText(event.target.value);
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
          <Title>IP Address Tracker</Title>
          <SearchGroup>
            <SearchInput
              placeholder="Search for any IP address or domain"
              onChange={handleOnChange}
              onKeyDown={handleKeyDown}
            />
            <SeacrhIcon onClick={handleSearch}>
              <ImageSVG src={arrowRightIcon} alt="" />
            </SeacrhIcon>
          </SearchGroup>
          {errorMessage && <ErrorText>*{errorMessage}</ErrorText>}
        </MainBackground>
        <StyledResultDiv>
          <ResultItems>
            <ItemTitles>IP Address</ItemTitles>
            <ItemTextStrong>{dataList?.ip || ""}</ItemTextStrong>
          </ResultItems>
          <ResultItems>
            <ItemTitles>Location</ItemTitles>
            <ItemTextStrong>
              {dataList &&
                `${dataList?.location.region}${
                  dataList?.location.region && ", "
                }${dataList?.location.country}`}
            </ItemTextStrong>
          </ResultItems>
          <ResultItems>
            <ItemTitles>Timezone</ItemTitles>
            <ItemTextStrong>
              {dataList?.location.timezone &&
                `UCL ${dataList.location.timezone}`}
            </ItemTextStrong>
          </ResultItems>
          <ResultItems>
            <ItemTitles>ISP</ItemTitles>
            <ItemTextStrong>{dataList?.isp}</ItemTextStrong>
          </ResultItems>
        </StyledResultDiv>
        <Position>
          <MapContainer center={[0, 0]} zoom={13}>
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors'
            />
            <MapMarker data={dataList} />
          </MapContainer>
        </Position>
      </StyledDivChecker>
    </Wrapper>
  );
};

export default AddressChecker;
