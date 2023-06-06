import styled from "styled-components";
import * as sVar from "../styles/styleVariables";

export const Flex = styled.div`
  display: flex;
`;

export const Flex100 = styled(Flex)`
  width: 100%;
`;

export const FlexColumn = styled(Flex)`
  flex-direction: column;
`;

export const FlexColumn100 = styled(FlexColumn)`
  width: 100%;
`;

export const FlexCenter = styled(Flex)`
  align-content: center;
  justify-content: center;
`;

export const FlexCenterRow = styled(Flex)`
  align-items: center;
`;

export const FlexCenterRow100 = styled(Flex100)`
  align-items: center;
`;

export const FlexCenterRow100SpaceBetween = styled(FlexCenterRow100)`
  justify-content: space-between;
  border: 1px solid #c2c8d0;
  box-sizing: border-box;
  width: inherit;
  height: 52px;
  padding: 0 16px;
  margin-bottom: 16px;
  border-radius: 4px;
  transition: border 0.2s ease-in-out;
  ${(props) => {
    if (props.borderColor) return `border: 1px solid ${sVar.loginHLColor90};`;
  }}
  > input {
    font-size: 16px;
    width: 100%;
    border: none;
    &:focus {
      outline: none;
    }
  }
`;

export const FlexCenter100 = styled(Flex100)`
  align-items: center;
  justify-content: center;
`;

export const FlexColumnCenter = styled(FlexColumn)`
  align-items: center;
  justify-content: center;
`;

export const FlexColumnCenterRow = styled(FlexColumn)`
  align-items: center;
`;

export const FlexColumnRowCenter100 = styled(FlexColumn100)`
  align-items: center;
`;

export const FlexColumnCenter100 = styled(FlexColumn100)`
  align-items: center;
  justify-content: center;
`;

export const FlexColumnForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
