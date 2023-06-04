import styled from "styled-components";

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
  @media only screen and (min-width: 320px) and (max-width: 598px) {
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
  margin-bottom: 16px;
`;

const SearchInput = styled.input`
  padding: 14px;
  border-radius: 8px;
  border: none;
  outline: none;
  width: 400px;

  @media only screen and (min-width: 320px) and (max-width: 598px) {
    max-width: 300px;
  }
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

  @media only screen and (min-width: 320px) and (max-width: 598px) {
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
  padding-left: 20px;

  &:not(:last-child) {
    border-right: 1px solid #ccc;
  }

  @media only screen and (min-width: 320px) and (max-width: 598px) {
    width: 100%;
    height: 80px;
    border: none;
    text-align: center;
    padding-left: 0;
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

const ErrorText = styled.p`
  text-align: center;
  color: #bf233a;
  font-weight: bold;
`;

export {
  Wrapper,
  ItemTitles,
  StyledDivChecker,
  MainBackground,
  Title,
  SearchGroup,
  SearchInput,
  SeacrhIcon,
  Position,
  ResultItems,
  StyledResultDiv,
  ItemTextStrong,
  ErrorText,
};
