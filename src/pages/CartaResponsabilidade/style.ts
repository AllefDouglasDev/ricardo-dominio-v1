import { Col } from 'antd';
import styled from 'styled-components';

export const InputField = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  flex-direction: column;
  padding: 10px;
`;

export const Left = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const Submite = styled.div`
  display: flex;
  justify-content: flex-end;
`;

export const ButtonDirectory = styled(Col)`
  display: flex;
  align-self: flex-start;
  margin-top: 32px;
  button {
    color: rgb(255, 255, 230);
    font-size: 15px;
    padding: 5px;
    text-shadow: 0px 0px 5px rgba(30, 30, 30, 0.8);
    border-width: 0px;
    border-radius: 5px;
    background: linear-gradient(
      0deg,
      rgb(56, 234, 120) 30%,
      rgb(56, 234, 148) 59%
    );

    :hover {
      cursor: pointer;
      background: linear-gradient(
        0deg,
        rgb(56, 234, 160) 30%,
        rgb(56, 234, 170) 59%
      );
    }
  }
`;
