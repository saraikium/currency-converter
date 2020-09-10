import styled from "styled-components/native";
import colors from "../../constants/themes";

type IStyledText = {
  color?: string;
  fontSize?: string;
};

export const StyledText = styled.Text<IStyledText>`
  font-family: OpenSans-Regular;
  text-align: center;
  font-size: ${({fontSize = "16px"}) => fontSize};
  color: ${({color = "black"}) => color};
`;

export const TextBold = styled(StyledText)`
  font-family: OpenSans-Bold;
  font-weight: 900;
`;

export const Heading = styled(TextBold)`
  font-family: "OpenSans-Bold";
  color: ${colors.white};
  font-size: 30px;
  margin-bottom: 20px;
  margin-top: 10px;
  text-align: center;
`;
