import styled from "styled-components";

export const Main = styled.main`
  min-height: 70vh;
  padding: 20px;

  h2 {
    color: white !important;
    font-size: 1.8rem;
  }
`;

export const Footer = styled.footer`
  display: flex;
  flex: 1;
  padding: 2rem 0;
  border-top: 1px solid #eaeaea;
  justify-content: center;
  align-items: center;

  .logo {
    height: 1em;
    margin-left: 0.2rem;
    background-color: white;
    padding: 0.3rem 0.4rem;
    border-radius: 0.2rem;
  }
`;
