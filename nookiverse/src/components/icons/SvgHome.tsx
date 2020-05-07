import * as React from 'react';

function SvgHome(props: any) {
  return (
    <svg height="1em" viewBox="0 0 64 64" width="1em" {...props}>
      <g fillRule="evenodd">
        <path d="M32 52c-11.046 0-20-8.954-20-20s8.954-20 20-20 20 8.954 20 20-8.954 20-20 20zm0-1.538c10.196 0 18.462-8.266 18.462-18.462S42.196 13.538 32 13.538 13.538 21.804 13.538 32 21.804 50.462 32 50.462z" />
        <path d="M40 32v11H24V32h-5l13-11 13 11h-5zm-11.733 0v7h7.466v-7h-7.466z" />
      </g>
    </svg>
  );
}

export default SvgHome;
