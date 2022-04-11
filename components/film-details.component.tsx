import styled from "styled-components";

export const Film = styled.div`
  &:not(:last-child) {
    border-bottom: 1px solid #d1d1d1;
    padding-bottom: 1rem;
    margin-bottom: 1rem;
  }
  h3,
  p {
    margin: 0;
  }
  p {
    color: #555555;
  }

  p > strong {
    font-weight: 600;
    color: #777777;
  }

  h4 {
    margin-top: 0.5rem;
    font-weight: 600;
  }
`;