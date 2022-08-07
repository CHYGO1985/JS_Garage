import React from 'react';
import styled from 'styled-components';

import HomeIcon from '@mui/icons-material/Home';

const Container = styled.div`
  flex: 1;
  background-color: #202020;
  height: 100vh;
  color: white;
`;

const Wrapper = styled.div`
  padding: 18px 26px;
`;

const Logo = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
  font-weight: bold;
  margin-bottom: 25px;
`;

const Img = styled.img`
  height: 25px;
`;

const Item = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
  cursor: pointer;
  padding: 7.5px 0px;
`;

const Menu = () => {
  return (
    <Container>
      <Wrapper>
        <Logo>
          <Img src='/images/logo.png' />
          JingjieTube
        </Logo>
        <Item>
          <HomeIcon />
          Home
        </Item>
        <Item>
          Explore
        </Item>
      </Wrapper>
    </Container>
  );
};

export default Menu;