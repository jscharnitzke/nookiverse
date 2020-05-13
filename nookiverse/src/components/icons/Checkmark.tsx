import React from "react";

function Checkmark(props: any) {
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
        d="M381 388L247 277l-44 47c-25 25-48 46-52 46s-24-18-45-39c-27-28-36-44-31-57 6-19 142-145 162-151 13-5 323 321 323 339 0 17-20 38-34 38-6 0-71-51-145-112z"
        transform="matrix(.1 0 0 -.1 0 64)"
      ></path>
    </svg>
  );
}

export default Checkmark;
