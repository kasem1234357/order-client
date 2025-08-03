import React from "react";
import { useMemo } from "react";

export const DOTS = "...";

const range = (start: any, end: any) => {
  let length = end - start + 1;
  return Array.from({ length }, (_, idx) => idx + start);
};

export const usePagination = ({
  totalCount,
  pageSize,
  siblingCount = 1,
  currentPage,
  isMobile = false
}: any) => {

  
  const paginationRange = useMemo(() => {
    const totalPageCount = Math.ceil(totalCount / pageSize);

    // Pages count is determined as siblingCount + firstPage + lastPage + currentPage + 2*DOTS
    const totalPageNumbers = siblingCount + 5;

    /*
      If the number of pages is less than the page numbers we want to show in our
      paginationComponent, we return the range [1..totalPageCount]
    */
    if (totalPageNumbers >= totalPageCount) {
      return range(1, totalPageCount);
    }

    const leftSiblingIndex = Math.max(currentPage - siblingCount, 1);
    const rightSiblingIndex = Math.min(
      currentPage + siblingCount,
      totalPageCount
    );

    /*
      We do not want to show dots if there is only one position left 
      after/before the left/right page count as that would lead to a change if our Pagination
      component size which we do not want
    */
    const shouldShowLeftDots = leftSiblingIndex > (isMobile?0:2);
    const shouldShowRightDots = rightSiblingIndex < totalPageCount - 2;

    const firstPageIndex = 1;
    const lastPageIndex = totalPageCount;

    if (!shouldShowLeftDots && shouldShowRightDots) {
      let leftItemCount = isMobile?1:3 + 2 * siblingCount;
      let leftRange = range(1, leftItemCount);
// if(middleRangeNumber>-1){
//        leftRange= leftRange.slice(0,middleRangeNumber)
       
       
//       }
      //   if(middleRangeNumber <=1 && middleRangeNumber  > -1){
      //  return [...leftRange, totalPageCount];
      // }
      return [...leftRange, DOTS, totalPageCount];
    }

    if (shouldShowLeftDots && !shouldShowRightDots) {
      let rightItemCount = isMobile?1:3 + 2 * siblingCount;
      let rightRange = range(
        totalPageCount - rightItemCount + 1,
        totalPageCount
      );
      // if(middleRangeNumber>-1){
      //  rightRange= rightRange.slice(0,middleRangeNumber)
       
       
      // }
      //  if(middleRangeNumber <=1 && middleRangeNumber  > -1){
      //  return [firstPageIndex,  ...rightRange];
      // }
      return [firstPageIndex, DOTS, ...rightRange];
    }

    if (shouldShowLeftDots && shouldShowRightDots) {
      let middleRange = range(leftSiblingIndex, rightSiblingIndex);
      // if(middleRangeNumber>-1){
      // middleRange= middleRange.slice(0,middleRangeNumber)
       
       
      
      if(isMobile){
        middleRange = range(leftSiblingIndex+1, rightSiblingIndex-1);
         return [firstPageIndex, ...middleRange,  lastPageIndex];
      }
      return [firstPageIndex,DOTS, ...middleRange, DOTS,  lastPageIndex];
    }
  }, [totalCount, pageSize, siblingCount, currentPage,isMobile]);

  return paginationRange;
};
