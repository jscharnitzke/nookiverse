import React from "react";

function Fish(props: any) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="170.667"
      height="170.667"
      version="1"
      viewBox="0 0 128 128"
      {...props}
    >
      <path
        d="M376 914C191 874 88 776 88 641c0-104 58-200 162-270 204-136 448-110 629 67 35 34 65 62 66 62s15-18 30-40 48-54 74-70c38-26 54-30 96-28 65 4 68 18 19 122-50 106-50 152 0 256 43 88 44 107 11 122-41 19-112-8-165-62l-46-47-37 43c-96 110-342 162-551 118zm-56-164c43-43 13-130-45-130-59 0-86 81-43 127 26 28 61 30 88 3z"
        transform="matrix(.1 0 0 -.1 0 128)"
      ></path>
    </svg>
  );
}

export default Fish;
