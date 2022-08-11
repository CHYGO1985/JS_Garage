import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  margin-bottom: 10px;
  gap: 10px;
`;

const Image = styled.img`
  width: 100%;
`;

const Details = styled.div``;

const ChannelImage = styled.img``;

const Texts = styled.div``;

const Title = styled.h1``;

const ChannelName = styled.h2``;

const Info = styled.div``;

const Card = () => {
  return (
    <Container>
      <Image 
        src='https://i9.ytimg.com/vi_webp/k3Vfj-e1Ma4/mqdefault.webp?v=6277c159&sqp=CIjm8JUG&rs=AOn4CLDeKmf_vlMC1q9RBEZu-XQApzm6sA'
      />
      <Details>
        <ChannelImage />

      </Details>
    </Container>
  );
};

export default Card;