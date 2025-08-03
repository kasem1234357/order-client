import React from "react";
import { useViewport } from "../../hooks/useViewport";
import { MOBILE_VIEW_ENDPOINT } from "../../constants";

function SkeletonTable() {
  const { isMobile, sizeInfo } = useViewport();

  const rowsArray =
    sizeInfo.currentWidth < MOBILE_VIEW_ENDPOINT
      ? [1, 2, 3, 4, 5]
      : [1, 2, 3, 4, 5, 6, 7, 8];
  return (
    <table className="tg w-full my-4">
      <thead>
        <tr>
          <th className="tg-cly1">
            <div className="line"></div>
          </th>
          <th className="tg-cly1">
            <div className="line"></div>
          </th>
          <th className="tg-cly1">
            <div className="line"></div>
          </th>
          <th className="tg-cly1">
            <div className="line"></div>
          </th>
          <th className="tg-cly1">
            <div className="line"></div>
          </th>
          <th className="tg-cly1">
            <div className="line"></div>
          </th>
          <th className="tg-cly1">
            <div className="line"></div>
          </th>
          <th className="tg-cly1">
            <div className="line"></div>
          </th>
        </tr>
      </thead>
      <tbody>
        {rowsArray.map((e) => {
          return (
            <tr key={e}>
              <td className="tg-cly1">
                <div className="line"></div>
              </td>
              <td className="tg-cly1">
                <div className="line"></div>
              </td>
              <td className="tg-cly1">
                <div className="line"></div>
              </td>
              <td className="tg-cly1">
                <div className="line"></div>
              </td>
              <td className="tg-cly1">
                <div className="line"></div>
              </td>
              <td className="tg-cly1">
                <div className="line"></div>
              </td>
              <td className="tg-cly1">
                <div className="line"></div>
              </td>
              <td className="tg-cly1">
                <div className="line"></div>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}

export default SkeletonTable;
