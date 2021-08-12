import React from 'react';
import Sidebar from '../../components/Sidebar';
import * as S from './style';
import rede from '../../assets/img/logo-rede.png';

const Home: React.FC = () => {
  return (
    <Sidebar>
      <S.Container>
        {/* <S.ContEfect>
          <S.Efect>
            <S.Img src={rede} alt="" />
          </S.Efect>
        </S.ContEfect>
        <S.SectionMsg>
          <S.Msg>
            A inovação é <br /> descoberta em
            <br />
            ação.
          </S.Msg>
          <S.Msg></S.Msg>
        </S.SectionMsg> */}
      </S.Container>
    </Sidebar>
  );
};

export default Home;
