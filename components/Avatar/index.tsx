import React from 'react';

export type AvatarSize = 'small' | 'normal' | 'large';

interface Props {
  size: AvatarSize;
  imageUrl: string;
};

const computeImageSize = (size: AvatarSize): { width: number, height: number } => {
  if (size === 'small') {
    return { width: 50, height: 48 };
  }

  if (size === 'normal') {
    return { width: 80, height: 69 };
  }

  return { width: 200, height: 172 };
};

export const Avatar = ({ size, imageUrl }: Props): JSX.Element => {
  const { width, height } = computeImageSize(size);
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 2000 1720"
      version="1.1"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <clipPath clipPathUnits="userSpaceOnUse" id="clip">
          <path
            d="M 1000,280 A 640,640 0 0 0 360,920 640,640 0 0 0 696.9961,1481.8849 320.45084,237.65944 0 0 1 1000,1320.0001 320.45084,237.65944 0 0 1 1303.5684,1481.5763 640,640 0 0 0 1640,920 640,640 0 0 0 1000,280 Z"
          />
        </clipPath>
      </defs>
  
      <g stroke="none">
        <image
          width="1280"
          height="1280"
          xlinkHref={imageUrl}
          clipPath="url(#clip)"
          x="360"
          y="240"
        />
        <path
          fill="#cda76b"
          d="M 1220,0 961.5885,142.20348 940,60 700,280 C 786.56919,244.06453 901.82861,215.16402 998.4843,214.7457 1085.7247,215.07132 1180.2051,230.52136 1260,260 l 120,-160 -260.0642,76.8567 z"
        />
        <path
          fill="#e8d6ba"
          d="M 269.65092,3.02375 A 300.02915,312.00178 83.962919 0 0 196.2085,22.09349 300.02915,312.00178 83.962919 0 0 22.241809,413.53266 300.02915,312.00178 83.962919 0 0 348.01434,597.67801 C 372.5415,537.69205 412.86624,482.877 468.13717,426.23964 490.23895,403.59135 514.25405,382.22398 540,362.32372 L 393.29897,9.93017 A 300.02915,312.00178 83.962919 0 0 269.65092,3.02375 Z"
        />
        <path
          fill="#e8d6ba"
          d="m 1730.349,3.02374 a 312.00181,300.02915 6.0370649 0 1 73.4425,19.06974 312.00181,300.02915 6.0370649 0 1 173.9667,391.43917 312.00181,300.02915 6.0370649 0 1 -325.7726,184.14536 C 1627.4584,537.69205 1587.1337,482.87699 1531.8628,426.23963 1509.7611,403.59134 1485.7459,382.22398 1460,362.32372 L 1606.701,9.93016 a 312.00181,300.02915 6.0370649 0 1 123.648,-6.90642 z"
        />
        <ellipse fill="#3d3d3d" cx="1000" cy="1550" rx="240" ry="170" />
      </g>
    </svg>
  );
};

export default Avatar;