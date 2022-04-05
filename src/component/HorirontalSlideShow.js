import React, { useState } from "react";
import "./SlideShow.css";
export default function HorirontalSlideShow({ showNumber }) {
  const array = Array.from({ length: showNumber }, (v, i) => {
    return { id: i + 1, content: i + 1 };
  });

  const checkSelectedIndex = (selectedIndexs, index) => {
    const isSelected = selectedIndexs[index];
    if (isSelected) return false;
    selectedIndexs[index] = true;
    return true;
  };

  const getDisplayArray = (arr, activeIndex) => {
    const arrLen = arr.length;
    const half = Math.floor(showNumber / 2);
    const mid = half + 1;

    const dArr = new Array(showNumber);
    dArr[mid - 1] = { ...arr[activeIndex], index: activeIndex };
    const selectedIndexs = { [activeIndex]: true };
    for (let i = 1, j; i <= half; ++i) {
      j = i * -1;
      let l = activeIndex + j;
      let r = activeIndex + i;
      if (l < 0) l = arrLen + l;

      dArr[mid + j - 1] = checkSelectedIndex(selectedIndexs, l)
        ? { ...arr[l], index: l }
        : null;

      if (r >= arrLen) r = r - arrLen;

      dArr[mid + i - 1] = checkSelectedIndex(selectedIndexs, r)
        ? { ...arr[r], index: r }
        : null;
    }
    return dArr;
  };
  const [currentActive, setCurrentActive] = useState(0);
  const calculatePosition = (idx) => {
    let position = Math.abs(Math.floor(showNumber / 2) - idx) * 30;
    let scale = 1 - Math.abs((Math.floor(showNumber / 2) - idx) / 5);
    let color;
    idx === Math.floor(showNumber / 2)
      ? (color = "rgb(6, 71, 212)")
      : (color = "rgb(17, 154, 233)");

    let size = { position, scale, color };
    return size;
  };
  const disArr = getDisplayArray(array, currentActive);

  return (
    array.length && (
      <div className="slider">
        {disArr.map((item, idx) => {
          return (
            <div
              className="image-container"
              onClick={() => setCurrentActive(item.index)}
              style={{
                backgroundColor: calculatePosition(idx).color,
                transform: `translateY(${
                  calculatePosition(idx).position
                }px) scale(${calculatePosition(idx).scale})`,
              }}
            >
              <h1>{item.content}</h1>
            </div>
          );
        })}
      </div>
    )
  );
}
