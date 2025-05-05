import * as React from "react";

export const CompanyLogo = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    width="40"
    height="40"
    viewBox="0 0 40 40"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <circle cx="20" cy="20" r="20" fill="#5D5FEF" />
    <text x="50%" y="55%" textAnchor="middle" fill="#fff" fontSize="16" fontFamily="Arial" dy=".3em">T360</text>
  </svg>
);

export default CompanyLogo;
