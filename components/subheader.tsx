import styled from "styled-components";

// export const Subheader = () => (
//   <>
//   <h5>Star Wars</h5>
//     <h1>Personajes</h1>
//   </>
// )

export const Subheader = styled.div`
  background: url("/assets/img/banner.jpg");
  background-size: cover;
  background-attachment: fixed;
  background-position: 0 -17vmax;
  background-repeat: no-repeat;
  height: 55vh;
  padding-top: 18vh;
  padding-left: 20px;
  position: relative;

  &:after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    background-color: #4d4d4d80;
    height: 55vh;
    width: 100%;
  }

  > * {
    color: white;
    z-index: 1;
    position: relative;
  }

  h1 {
    font-size: 7vmin;
    line-height: 7vmin;
    max-width: 60%;
  }

  h5 {
    margin: 0;
  }
`;

export const Fade = styled.div`
  height: 100px;
  width: 100%;
  position: absolute;
  left: 0;
  bottom: 0;
  background: linear-gradient(transparent, #101332);
  z-index: 1;
`;


export const Avatar = () => (
  <ContentAvatar>
    <img src={"https://avatars.githubusercontent.com/u/21148589?v=4"} />
    <aside>
      <small>
        <pre>Alexander Forero L.</pre>
      </small>
      <small>Ene 23, 2022</small>
    </aside>
  </ContentAvatar>
);

const ContentAvatar = styled.div`
  margin-top: 80px;

  img {
    max-width: 27px;
    max-height: 27px;
    border-radius: 100%;
    display: inline-block;
    margin-right: 9px;
    vertical-align: top;
  }
  aside {
    display: inline-block;
  }
  pre,
  small {
    line-height: 9px;
    padding: 0;
    margin: 0;
  }
`;