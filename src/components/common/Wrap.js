import { h } from 'preact';

function randomId() {
  return Math.random()
    .toString(36)
    .substr(2, 9);
}

const Wrap = ({ width, height, style, children, primaryColor, speed, secondaryColor }) => {
  let idClip = randomId();
  let idGradient = randomId();

  return (
    <svg viewBox={`0 0 ${width} ${height}`} version="1.1" style={style} preserveAspectRatio="xMidYMid meet">
      <rect
        style={{ fill: `url(#${idGradient})` }}
        clip-path={`url(#${idClip})`}
        x="0"
        y="0"
        width={width}
        height={height}
      />

      <defs>
        <clipPath id={`${idClip}`}>{children}</clipPath>

        <linearGradient id={`${idGradient}`}>
          <stop offset="0%" stop-color={primaryColor}>
            <animate attributeName="offset" values="-2; 1" dur={`${speed}s`} repeatCount="indefinite" />
          </stop>
          <stop offset="50%" stop-color={secondaryColor}>
            <animate attributeName="offset" values="-1.5; 1.5" dur={`${speed}s`} repeatCount="indefinite" />
          </stop>
          <stop offset="100%" stop-color={primaryColor}>
            <animate attributeName="offset" values="-1; 2" dur={`${speed}s`} repeatCount="indefinite" />
          </stop>
        </linearGradient>
      </defs>
    </svg>
  );
};

export default Wrap;
