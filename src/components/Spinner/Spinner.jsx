/* eslint-disable react/prop-types */
export default function Spinner({ size = 24, color = "white" }) {
  return (
    <div>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 100 100"
        preserveAspectRatio="xMidYMid"
        width={size}
        height={size}
        style={{
          shapeRendering: "auto",
          display: "block",
          background: "rgba(0, 0, 0, 0)",
        }}
      >
        <g>
          <circle
            strokeDasharray="164.93361431346415 56.97787143782138"
            r="35"
            strokeWidth="10"
            stroke={color}
            fill="none"
            cy="50"
            cx="50"
          >
            <animateTransform
              keyTimes="0;1"
              values="0 50 50;360 50 50"
              dur="0.606060606060606s"
              repeatCount="indefinite"
              type="rotate"
              attributeName="transform"
            ></animateTransform>
          </circle>
          <g></g>
        </g>
      </svg>
    </div>
  );
}
