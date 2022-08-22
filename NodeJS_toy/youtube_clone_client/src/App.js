import React from 'react';
import styled, { ThemeProvider } from 'styled-components';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import Menu from './components/Menu';
import Navbar from './components/Navbar';
import { darkTheme, lightTheme } from './utils/Themes';
import Home from './routes/Home.js';
import SignIn from './routes/SignIn.js';
import Video from './routes/Video.js';
import Search from './routes/Search.js';

const Container = styled.div`
  display: flex;
`;

const Main = styled.div`
  flex: 7;
  background-color: ${({ theme }) => theme.bg};
`;

const Wrapper = styled.div`

`;

const App = () => {
  const [darkMode, setDarkMode] = React.useState(true);

  return (
    <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
      <Container>
        <BrowserRouter>
          <Menu darkMode={darkMode} setDarkMode={setDarkMode} />
          <Main>
            <Navbar />
            <Wrapper>
              <Routes>
                <Route paht='/'>
                  <Route index element={<Home type='random' />} />
                  <Route path='trends' element={<Home type='trend' />} />
                  <Route path='subscriptions' element={<Home type='sub' />} />
                  <Route path='search' element={<Search />} />
                  <Route path='signin' element={<SignIn />} />
                  <Route path='video'>
                    <Route path=':id' element={<Video />} />
                  </Route>
                </Route>
              </Routes>
            </Wrapper>
          </Main>
        </BrowserRouter>
      </Container>
    </ThemeProvider>
  );
};

export default App;
