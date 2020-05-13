import React from "react";

function Plant(props: any) {
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
        d="M93 465c-41-17-44-55-10-106 41-61 119-83 191-54 17 8 18 3 11-89l-7-96h84l-7 96c-7 92-6 97 11 89 42-17 99-16 134 2 42 22 80 76 80 115 0 24-6 32-35 44-39 16-131 19-168 5-13-5-31-17-40-26-16-15-18-15-34 0-9 9-27 21-40 26-36 13-133 10-170-6z"
        transform="matrix(.1 0 0 -.1 0 64)"
      ></path>
    </svg>
  );
}

export default Plant;
