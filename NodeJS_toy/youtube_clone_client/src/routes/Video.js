import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  color: ${({theme}) => theme.textColor};
`;

const Video = () => {
  return (
    <Container>
      video
    </Container>
  );
};

export default Video;