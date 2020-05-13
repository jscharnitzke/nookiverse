import React from "react";

function Apple(props: any) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="85.333"
      height="85.333"
      version="1"
      viewBox="0 0 64 64"
      {...props}
    >
      <path
        d="M206 490c-67-20-114-105-103-185 15-109 77-194 158-215 75-21 178 12 218 69 51 71 69 197 38 258-28 54-102 88-127 58-12-15-12-19 5-31 25-19 9-34-43-41-65-9-136 35-87 53 8 4 15 15 15 25 0 21-24 24-74 9z"
        transform="matrix(.1 0 0 -.1 0 64)"
      ></path>
    </svg>
  );
}

export default Apple;
