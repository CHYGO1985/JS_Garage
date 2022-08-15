import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: calc(100vh - 56px);
  color: ${({ theme }) => theme.textColor};
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: ${({ theme }) => theme.bgLighter};
  border: 2xp solid ${({ theme }) => theme.delimeterColor};
  padding: 20px 50px;
  gap: 10px;
`;

const Title = styled.h1`
  font-size: 24px;
`;

const SubTitle = styled.h1`
  font-size: 20px;
  font-weight: 300;
`;

const Input = styled.input`
  width: 100%;
  background-color: transparent;
  padding: 10px;
  border-radius: 5px;
  color: ${({ theme }) => theme.textColor};
  border: 1px solid ${({ theme }) => theme.delimeterColor};
`;

const Button = styled.button`
  border: none;
  padding: 10px 20px;
  font-weight: 500;
  cursor: pointer;
  border-radius: 5px;
  width: 100px;
  background-color: ${({ theme }) => theme.delimeterColor};
  color: ${({ theme }) => theme.textColor};
`;

const More = styled.div`
  display: flex;
  margin-top: 10px;
  font-size: 12px;
  color: ${({ theme }) => theme.textSoft};
`;

const Links = styled.div`
  margin-left: 50px;
`;

const Link = styled.span`
  margin-left: 30px;
`;

const SignIn = () => {
  return (
    <Container>
      <Wrapper>
        <Title>Sign in</Title>
        <SubTitle>to continue to JingjieTube</SubTitle>
        <Input placeholder='username' />
        <Input type='password' placeholder='password' />
        <Button>Sign in</Button>
        <Title>or</Title>
        <Input placeholder='username' />
        <Input placeholder='email' />
        <Input type='password' placeholder='password' />
        <Button>Sign up</Button>
      </Wrapper>
      <More>
        English(USA)
        <Links>
          <Link>Help</Link>
          <Link>Privacy</Link>
          <Link>Terms</Link>
        </Links>
      </More>
    </Container>
  );
};

export default SignIn;
