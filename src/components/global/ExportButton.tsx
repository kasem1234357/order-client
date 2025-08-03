import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import useExport from "../../hooks/useExport";
import ImageIcon from "./ImageIcon";
import ExportIcon from "../../assets/icons/ExportIcon";
import { useDebounce } from "../../hooks/useDebounce";
type Props = {
  getFunction: any;
  getFunctionParams: any;
  fileName: string;
};

function ExportButton({ getFunction, getFunctionParams, fileName }: Props) {
  const { generateExcelFile } = useExport();

  const [startExporting, setStartExporting] = useState(false);
  const { data, isLoading, isFetching, isUninitialized, refetch, isSuccess } =
    getFunction(
      {
        ...getFunctionParams,
        name: useDebounce(getFunctionParams.name),
      },
      {
        skip: !startExporting,
      }
    );
  useEffect(() => {
    console.log(data);

    if (isSuccess && data && !isFetching && !isLoading && startExporting) {
      if (!data || !data?.data?.[fileName] || data?.data?.[fileName]?.length === 0) {
        toast.error("No data to export");
      } else {
        generateExcelFile([...data?.data?.[fileName]], `${fileName}`,{
          limitFields:['stage']
        });
        toast.success("Exported successfully");
      }
      setStartExporting(false);
    }
  }, [isSuccess, data, isLoading, isFetching, startExporting]);
  return (
    <button
      className="flex gap-2 items-center bg-[#F3F3F3] dark:bg-primaryLight p-2 rounded-md border border-main-1"
      onClick={() => {
        if (!isLoading && !isFetching && !isUninitialized) {
          if (data) {
            refetch();
          } else {
            setStartExporting(true);
          }
        } else {
          setStartExporting(true);
        }
      }}
    >
      {isLoading || isFetching ? (
        <span className="loaderReport export"></span>
      ) : (
        <ImageIcon
          Icon={ExportIcon}
          width={32}
          height={32}
          className="min-w-[32px]"
        />
      )}
    </button>
  );
}

export default ExportButton;
