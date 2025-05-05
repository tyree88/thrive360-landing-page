import * as React from "react";

export const SpotlightBackground = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    width="100%"
    height="100%"
    viewBox="0 0 400 200"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <ellipse cx="200" cy="100" rx="180" ry="80" fill="#5D5FEF" fillOpacity="0.15" />
    <ellipse cx="200" cy="100" rx="120" ry="50" fill="#5D5FEF" fillOpacity="0.25" />
  </svg>
);

export default SpotlightBackground;
