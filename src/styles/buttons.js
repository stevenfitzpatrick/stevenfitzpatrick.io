import styled from 'styled-components';

export const FunkyH5 = styled.h5`
  line-height: 1;
  margin: 0 0 24px 0;
  position: relative;
  font-weight: 600;

  &::after {
    content: '';
    position: absolute;
    bottom: -5px;
    left: 0;
    width: 1em;
    height: 2px;
    background-color: #d28546;
  }
`;
