import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';

import Card from '../components/Card.js';

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  overflow-x: scroll;
`;

const Home = ({ type }) => {

  const [videos, setVideos] = useState([]);

  useEffect(() => {
    const getVideos = async () => {
      const res = await axios.get(`/videos/${type}`);
      setVideos(res.data);
    };
    getVideos();
  }, [type]);

  return (
    <Container>
      {videos.map((video) => (
        <Card key={video._id} video={video} />
      ))}
    </Container>
  );
};

export default Home;