import React, { useEffect, useState } from "react";
import classnames from "classnames";
import { usePagination, DOTS } from "../../hooks/usePagination";
import { useSelector } from "react-redux";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { useViewport } from "../../hooks/useViewport";
import { MOBILE_VIEW_ENDPOINT } from "../../constants";
//import "./pagination.scss";
const Pagination = (props: any) => {
  const {
    onPageChange,
    totalCount = [],
    siblingCount = 1,
    currentPage,
    pageSize,
    className,
  } = props;
  const {sizeInfo,isMobile} = useViewport()
  const paginationRange = usePagination({
    currentPage,
    totalCount,
    siblingCount,
    pageSize,
    isMobile:( sizeInfo.currentWidth<MOBILE_VIEW_ENDPOINT)
  });
  const location = useLocation()
   const updatePageInUrl = (page: number) => {
    const newSearchParams = new URLSearchParams(searchParams.toString());
    newSearchParams.set("currentPage", page.toString());
    navigate(`${location.pathname}?${newSearchParams.toString()}`);
  };
  useEffect(()=>{
    console.log(window.location.pathname);
         
          const getPage = searchParams.get('currentPage')
          if(getPage){
            onPageChange(parseInt(getPage))
          }
  },[window.location.search])
   const navigate = useNavigate()
      const [searchParams] = useSearchParams()
  //  useEffect(() => {
  
    
  //     const newUrl = `${window.location.pathname}?${searchParams.toString()}`;
  // if (newUrl !== window.location.href) {
  //   navigate(newUrl);
  // }
  //   }, [searchParams,currentPage]);
  const lang = useSelector((state: any) => state?.user?.lang);
  // @ts-ignore
  if (currentPage === 0 || paginationRange?.length < 2) {
    return null;
  }

  const onNext = () => {
    onPageChange(currentPage + 1);
 updatePageInUrl(currentPage +1)
    
  };

  const onPrevious = () => {
    onPageChange(currentPage - 1);
   
     updatePageInUrl(currentPage - 1);
  };
  // @ts-ignore
  let lastPage = paginationRange[paginationRange.length - 1];
  return (
    <ul
      className={classnames("pagination-container", { [className]: className })}
    >
      <li
        className={classnames("pagination-item", {
          disabled: currentPage === 1,
        })}
        onClick={onPrevious}
      >
        <div className={lang == "ar" ? "arrow right" : "arrow left"} />
      </li>
      {/* @ts-ignore */}
      {paginationRange.map((pageNumber) => {
        if (pageNumber === DOTS) {
          return <li className="pagination-item dots">&#8230;</li>;
        }

        return (
          <li
            className={classnames("pagination-item", {
              selected: pageNumber === currentPage,
            })}
            onClick={() => {
                updatePageInUrl(pageNumber);
              onPageChange(pageNumber)
            }}
          >
            {pageNumber}
          </li>
        );
      })}
      <li
        className={classnames("pagination-item", {
          disabled: currentPage === lastPage,
        })}
        onClick={onNext}
      >
        <div className={lang == "ar" ? "arrow left" : "arrow right"} />
      </li>
    </ul>
  );
};

export default Pagination;
