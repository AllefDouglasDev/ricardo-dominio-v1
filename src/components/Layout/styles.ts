import styled, { css } from 'styled-components';
import { Link } from 'react-router-dom';

const width = '200px';
const height = '80px';

export const Wrapper = styled.aside`
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;

  display: flex;
`;

export const Menu = styled.nav`
  width: ${width};
  height: 100%;
  background-color: #001529;
`;

export const Header = styled.header`
  width: 100%;
  height: ${height};
`;

export const Logo = styled(Link)`
  width: ${width};
  height: ${height};

  img {
    width: ${width};
    height: ${height};
    object-fit: contain;

    background-image: radial-gradient(
      circle at 50% -20.71%,
      #ffffff 0,
      #ffffff 12.5%,
      #f3ffff 25%,
      #e1faf9 37.5%,
      #cdf2f2 50%,
      #b9e9ed 62.5%,
      #a6e1e9 75%,
      #95d9e7 87.5%,
      #85d2e6 100%
    );
  }
`;

export const MenuList = styled.ul`
  list-style: none;
  padding: 20px 0;
`;

type MenuItem = {
  active: boolean;
};

const menuItemModifier = {
  active: () => css`
    background-color: #1890ff;

    a,
    svg {
      color: white;
    }
  `,
};

export const MenuItem = styled.li<MenuItem>`
  ${({ active }) => css`
    display: flex;
    align-items: center;
    padding: 8px 20px;

    a {
      color: rgba(255, 255, 255, 0.7);
      font-size: 16px;
      text-decoration: none;
    }

    svg {
      color: rgba(255, 255, 255, 0.7);
      margin-right: 16px;
    }

    ${active && menuItemModifier.active()}

    &:hover {
      a,
      svg {
        color: white;
      }
    }
  `}
`;

export const Content = styled.div`
  width: calc(100vw - ${width});
`;
