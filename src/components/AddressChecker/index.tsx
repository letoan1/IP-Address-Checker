/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import React from "react";
import { MapContainer, TileLayer } from "react-leaflet";

import {
  ErrorText,
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
import "@/app.css";
import arrowRightIcon from "@/assets/svg/icon-arrow.svg";
import { MapMarker } from "../MapMarker";
import { getDataCheckerDomain, getDataCheckerIP } from "../../api/ipChecker";
import { IDataFound } from "../../utils/type";
import { initialDataFound } from "../../utils/constant";
import { isDomainName, isValidIpAddress } from "../../utils/validation";

const AddressChecker = () => {
  const [ipAddress, setIpAddress] = useState<string>("");
  const [text, setText] = useState<string>("");
  const [dataFound, setDataFound] = useState<IDataFound>(initialDataFound);
  const [errorMessage, setErrorMessage] = useState<string>("");

  console.log(dataFound);

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
          setDataFound(data.data);
          setErrorMessage("");
        } catch (error: any) {
          if (error.response.status === 422) {
            setErrorMessage("Input correct IPv4 or IPv6 address.");
          }
          console.log(error);
        }
      } else if (isDomainName(ipAddress)) {
        try {
          const data = await getDataCheckerDomain(ipAddress);
          setDataFound(data.data);
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
          {errorMessage && <ErrorText>*{errorMessage}</ErrorText>}
        </MainBackground>
        <StyledResultDiv>
          <ResultItems>
            <ItemTitles>IP Address</ItemTitles>
            <ItemTextStrong>{dataFound?.ip || ""}</ItemTextStrong>
          </ResultItems>
          <ResultItems>
            <ItemTitles>Location</ItemTitles>
            <ItemTextStrong>
              {dataFound &&
                `${dataFound?.location.region}${
                  dataFound?.location.region && ", "
                }${dataFound?.location.country}`}
            </ItemTextStrong>
          </ResultItems>
          <ResultItems>
            <ItemTitles>Timezone</ItemTitles>
            <ItemTextStrong>
              {dataFound?.location.timezone &&
                `UCL ${dataFound.location.timezone}`}
            </ItemTextStrong>
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
