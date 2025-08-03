import React from "react";

const ProductSkeleton = () => {
  return (
    <>
      {[1, 2, 3, 4].map(() => {
        return (
          <div className="max-w-[375px] lg:max-w-[375px] px-3 py-3 flex flex-col border select-none shadow-sm rounded-xl space-y-2 animate-pulse">
            <div className="h-40 bg-gray-200 rounded"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2"></div>
            <div className="h-4 bg-gray-200 rounded w-full"></div>
            <div className="h-4 bg-gray-200 rounded w-3/4"></div>
            <div className="h-4 bg-gray-200 rounded w-3/4"></div>
            <div className="flex justify-between">
              <div className="flex flex-row justify-center items-center space-x-2">
                <div className="h-7 w-7 bg-gray-200 rounded"></div>
                <div className="h-5 w-14 bg-gray-200 rounded"></div>
              </div>
              <div className="flex justify-center items-center space-x-2">
                <div className="h-6 w-6 bg-gray-200 rounded"></div>
                <div className="h-4 w-4 bg-gray-200 rounded"></div>
                <div className="h-6 w-6 bg-gray-200 rounded"></div>
              </div>
            </div>
          </div>
        );
      })}
    </>
  );
};

export default ProductSkeleton;
