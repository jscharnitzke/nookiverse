import React from "react";

function Insect(props: any) {
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
        d="M349 1109c-38-38 0-94 56-83 51 9 92-33 120-124 6-20 1-19-56 18-76 49-125 64-204 64-70 0-113-20-146-65-79-112-3-337 150-443l40-28-19-39c-13-24-20-58-20-95 0-51 3-59 35-91 34-34 38-35 93-31 74 6 125 31 188 93l51 50 40-45c51-58 121-93 195-98 55-4 59-3 93 31 31 31 35 40 35 89 0 30-8 71-19 94l-19 41 49 37c114 85 195 257 171 364-27 118-130 166-269 124-37-12-90-37-118-56-27-20-50-34-52-33-10 11 25 87 53 115 30 30 39 33 69 28 27-5 39-2 55 14 71 71-70 126-166 64-50-32-81-77-103-148l-17-56-13 50c-17 65-60 128-107 157-52 31-135 32-165 2z"
        transform="matrix(.1 0 0 -.1 0 128)"
      ></path>
    </svg>
  );
}

export default Insect;
