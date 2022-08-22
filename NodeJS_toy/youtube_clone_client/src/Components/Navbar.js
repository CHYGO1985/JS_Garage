import React, { useState } from 'react';
import styled from 'styled-components';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import VideoCallOutlinedIcon from '@mui/icons-material/VideoCallOutlined';

import Upload from './Upload.js';

const Container = styled.div`
  background-color: ${({ theme }) => theme.bg};
  position: sticky;
  top: 0;
  height: 56px;
`;

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  flex-direction: row;
  height: 100%;
  padding: 0px 20px;
  position: relative;
`;

const Search = styled.div`
  width: 400px;
  position: absolute;
  left: 0px;
  right: 0px;
  margin: auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 10px;
  padding: 5px;
  border: 1px solid #ccc;
  border-radius: 3px;
  color: ${({ theme }) => theme.textColor};
`;

const Input = styled.input`
  border: none;
  background-color: transparent;
  outline: none;
  color: ${({ theme }) => theme.textColor};
`;

const Button = styled.button`
  padding: 5px 15px;
  background-color: transparent;
  color: #3ea6ff;
  border: 1px solid #3ea6ff;
  align-items: center;
  display: flex;
  border-radius: 5px;
  margin-top: 10px;
  cursor: pointer;
  font-weight: 500;
  gap: 5px;
`;

const User = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  font-weight: 500;
  color: ${({ theme }) => theme.textColor};
`;

const Avatar = styled.img`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background-color: #999;
`;

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [q, setQ] = useState('');
  
  const { currentUser } = useSelector((state) => state.user);
  const navigate = useNavigate();

  return (
    <>
      <Container>
      <Wrapper>
        <Search>
          <Input
            placeholder="Search" 
            onChange={(e) => setQ(e.target.value)}
          />
          <SearchOutlinedIcon onClick={() => navigate(`/search?q=${q}`)}/>
        </Search>
        {currentUser ? (
          <User>
            <VideoCallOutlinedIcon onClick={() => 
              setOpen(true)
            } />
            <Avatar src={currentUser.img} />
            {currentUser.name}
          </User>
        ) : (
          <Link to='signin' style={{ textDecoration: 'none' }}>
            <Button>
              <AccountCircleIcon />
              SIGN IN
            </Button>
          </Link>
        )}
      </Wrapper>
    </Container>
    {open && <Upload setOpen={setOpen} />}
    </>
  );
};

export default Navbar;