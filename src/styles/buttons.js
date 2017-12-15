import styled from 'styled-components';

import colors from '../styles/colors';
import sizes from '../styles/typography';

export const FunkyH5 = styled.h5`
  line-height: 1;
  margin: 0 0 24px 0;
  position: relative;
  font-weight: 600;

  &::before {
    display: block;
    content: ' ';
    margin-top: -${sizes.header};
    height: ${sizes.header};
    visibility: hidden;

    @media (min-width: ${sizes.desktop}) {
      margin-top: -${sizes.headerOffsetDesktop};
      height: ${sizes.headerOffsetDesktop};
    }
  }

  &::after {
    content: '';
    position: absolute;
    bottom: -5px;
    left: 0;
    width: 1em;
    height: 2px;
    background-color: ${colors.primary};
  }
`;

export const FunkyAnchor = styled.a`
  position: static;
  padding-left: 8px;

  @media (min-width: ${sizes.desktop}) {
    position: absolute;
    top: calc(${sizes.headerOffsetDesktop} + 3px);
    left: -33px;
    padding: 0;
  }
`;

FunkyH5.FunkyAnchor = FunkyAnchor;

export default FunkyH5;
