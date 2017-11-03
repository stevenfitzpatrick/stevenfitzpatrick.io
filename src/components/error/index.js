import { h } from 'preact';
import styled, { keyframes } from 'styled-components';
import ErrorSVG from '../../assets/svg/404';

const comeUpAnimation = keyframes`
  from {
    transform: translateY(5%);
    opacity: 0;
  }

  to {
    transform: translateY(0);
    opacity: 1;
  }
`;

const ErrorContainer = styled.div`
	position: relative;
	justify-content: center;
	align-items: flex-start;
	flex-direction: column;
	display: flex;
	flex: 1;
	z-index: 9999;
	animation: ${comeUpAnimation} 1.2s ease-in-out;
	overflow: hidden;
	backface-visibility: hidden;
	-webkit-backface-visibility: hidden;
`;

const ErrorBG = styled.div`
	-webkit-backface-visibility: hidden;
	position: absolute;
	left: 50%;
	top: 50%;
	transform: translate(-50%, -50%);
	z-index: -1;
	opacity: 0.3;

	svg {
		height: 17em;
	}
`;

const ErrorTitle = styled.div`
	text-transform: uppercase;
	font-family: 'brandon-grotesque', 'Segoe UI', Segoe, Calibri, Arial sans-serif;
	font-size: 1.1em;
	font-weight: 600;
	position: relative;
	margin: 1em 0;
	z-index: 9999;

	&:after {
		content: '';
		position: absolute;
		top: 100%;
		left: 0;
		width: 1em;
		height: 2px;
		background-color: #555;
	}
`;

export default props => (
  <ErrorContainer class="content">
    <ErrorTitle>Error</ErrorTitle>
    <h2>
			Oops, something went wrong <span>&hellip;</span>
    </h2>
    <ErrorBG>
      <svg>
        <use xlinkHref={`#${ErrorSVG.id}`} />
      </svg>
    </ErrorBG>

    <h4>
			Let&rsquo;s get you back{' '}
      <a class="link--content" href="/">
				home
      </a>
      <span>!</span>
    </h4>
  </ErrorContainer>
);
