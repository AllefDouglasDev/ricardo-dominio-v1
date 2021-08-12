import styled from 'styled-components';
import { Layout } from 'antd';

export const Logo = styled.img`
  height: ${(props) => props.height};
  margin: 16px;
  background: rgba(255, 255, 255, 1);
  border-radius: 5px;
`;

export const Headers = styled(Layout.Header)`
  background: #fff;
  padding: 0;
  height: 5%;
`;
