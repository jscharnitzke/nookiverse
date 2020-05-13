import React from "react";

function Furniture(props: any) {
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
        d="M160 705V210h59l3-72 3-73h120l14 73 15 72h534l14-73 13-72h120l3 73c3 69 4 72 27 72h25v990H160V705zm490 0c0-362-2-415-15-415s-15 53-15 415 2 415 15 415 15-53 15-415z"
        transform="matrix(.1 0 0 -.1 0 128)"
      ></path>
    </svg>
  );
}

export default Furniture;
