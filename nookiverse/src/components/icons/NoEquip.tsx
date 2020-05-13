import React from "react";

function NoEquip(props: any) {
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
        d="M215 541C128 501 80 421 80 318c1-142 97-238 240-238 144 0 240 96 240 240 0 104-53 187-142 224-52 22-153 20-203-3zm174-99c19-10 43-34 53-53 17-33 25-119 11-119-10 0-183 173-183 182 0 15 86 8 119-10zM283 282c48-48 87-91 87-95 0-14-86-6-119 11-19 10-43 34-53 53-18 33-25 119-10 119 4 0 47-39 95-88z"
        transform="matrix(.1 0 0 -.1 0 64)"
      ></path>
    </svg>
  );
}

export default NoEquip;
