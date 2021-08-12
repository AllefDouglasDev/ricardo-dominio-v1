import React from 'react';
import { Link } from 'react-router-dom';
import { AiOutlineFilePdf, AiOutlineSetting } from 'react-icons/ai';

import logo from '../../assets/img/logo.svg';
import * as S from './styles';

export type MenuProps = {
  active: 'report' | 'configs' | 'home';
  children?: React.ReactNode;
};

const Layout = ({ active, children }: MenuProps) => {
  return (
    <S.Wrapper>
      <S.Menu>
        <S.Header>
          <S.Logo to="/">
            <img src={logo} />
          </S.Logo>
        </S.Header>

        <S.MenuList>
          <S.MenuItem active={active === 'report'}>
            <AiOutlineFilePdf size={25} />
            <Link to="/cartaResponsabilidade">Relatórios</Link>
          </S.MenuItem>

          <S.MenuItem active={active === 'configs'}>
            <AiOutlineSetting size={25} />
            <Link to="/config">Configurações</Link>
          </S.MenuItem>
        </S.MenuList>
      </S.Menu>

      <S.Content>{children}</S.Content>
    </S.Wrapper>
  );
};

export default Layout;
