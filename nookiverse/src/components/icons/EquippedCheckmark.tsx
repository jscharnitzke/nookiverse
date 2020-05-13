import React from "react";

function EquippedCheckmark(props: any) {
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
        d="M213 539c-180-89-178-352 2-439 38-18 59-21 120-18 62 3 80 8 117 33 71 50 102 104 106 185 5 85-8 126-59 183-66 76-196 101-286 56zm267-115c0-20-197-234-215-234-17 0-115 89-115 104 0 7 11 23 25 36l25 24 35-34 34-33 43 35c24 20 65 54 93 77 53 44 75 51 75 25z"
        transform="matrix(.1 0 0 -.1 0 64)"
      ></path>
    </svg>
  );
}

export default EquippedCheckmark;
