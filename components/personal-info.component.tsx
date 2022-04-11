import styled from "styled-components";

export const LoadingPage = styled.div`
position: absolute;
top: 0;
left: 0;
width: 100vw;
height: 100vh;
display: flex;
justify-content: center;
align-items: center;
`;

export const PersonalInfo = styled.div``;

export const Header = styled.div`
display: flex;
flex-direction: row;
align-items: center;
margin-bottom: 1rem;
.data {
  margin-left: 1rem;

  h3 {
    margin: 0;
    font-weight: 600;
  }
  p {
    margin: 0;
    display: inline-block;
  }
}
`;

export const Cake = styled.div`
background-image: url("https://www.svgrepo.com/show/20280/birthday-cake.svg");
width: 15px;
height: 15px;
background-size: cover;
opacity: 0.4;
cursor: pointer;
display: inline-block;
margin-left: 0.5rem;
`;

export const Grid = styled.div`
display: grid;
grid-template-columns: repeat(2, 1fr);

h4 {
  margin: 0;
  font-weight: 600;
}
`;