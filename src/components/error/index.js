import { h } from 'preact';
import styled from 'styled-components';

const ErrorContainer = styled.div`
  position: relative;
  justify-content: center;
  align-items: flex-start;
  flex-direction: column;
  display: flex;
  flex: 1;
`;

export default props =>
  <ErrorContainer>
    <h5>Error : 404</h5>
    <h2>
      Oops, something went wrong <span>&hellip;</span>
    </h2>
    <h3>
      I could not find the page, you are looking for <span>!</span>
    </h3>
  </ErrorContainer>;
