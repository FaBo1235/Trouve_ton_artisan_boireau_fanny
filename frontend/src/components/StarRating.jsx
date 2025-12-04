import React from "react";

export default function StarRating({ rating = 0, size = 20 }) {
  const safeRating = Number(rating) || 0;
  const stars = [];

  for (let i = 1; i <= 5; i++) {
    const key = `star-${i}-${Math.round(safeRating * 100)}`;
    let fill = "0%";
    if (safeRating >= i) fill = "100%";
    else if (safeRating >= i - 0.5) fill = "50%";

    stars.push(
      <svg
        key={key}
        width={size}
        height={size}
        viewBox="0 0 24 24"
        className="inline-block"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id={`grad-${key}`}>
            <stop offset={fill} stopColor="#0074C7" />
            <stop offset={fill} stopColor="#e5e7eb" />
          </linearGradient>
        </defs>
        <path
          fill={`url(#grad-${key})`}
          stroke="#0074C7"
          strokeWidth="0.6"
          d="M12 .587l3.668 7.568L24 9.748l-6 5.858 1.416 8.264L12 18.896l-7.416 4.974L6 15.606 0 9.748l8.332-1.593z"
        />
      </svg>
    );
  }

  return <div className="flex gap-1 items-center">{stars}</div>;
}