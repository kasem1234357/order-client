import React, { useState } from 'react'
import { useGetDictionary } from '../hooks/useGetDictionary';
import { coulmnsType, DictionaryType } from '../types';
import { useSearchParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { UserSliceType } from '../lib/redux/slices/userSlice';
import { useGetAllClubRolesQuery, useGetAllMaterialQuery } from '../lib/redux/services/Api';
import { useDebounce } from '../hooks/useDebounce';
import RowsPerPageSelect from '../components/global/RowsPerPageSelect';
import Pagination from '../components/global/Pagination';
import Header from '../components/material/Header';
import MaterialTable from '../components/material/MaterialTable';
import SkeletonTable from '../components/skeletons/SkeletonTable';

type Props = {}
const renderTable = (props: any) => {
  if (props.isLoading || props.isFetching) {
    return <SkeletonTable />;
  }
  // if (props.isError) {

  //   return <div>error</div>;
  // }
  return (
    <MaterialTable
      data={props.data}
      columns={props.columns}
      clubId={props.clubId}
      limitedFields={props.limitedFields}
      setOpenModal={props.setOpenModal} selectedCalenderSlot={props.selectedCalenderSlot}  setSelectedCalenderSlot={props.setSelectedCalenderSlot}
    />
  );
};
function Material({}: Props) {
const { Auth, inputs, courts, shared, coaches }: DictionaryType =
    useGetDictionary();
  const [currentPage, setCurrentPage] = useState(1);
  const [limitedFields, setLimitedFields] = useState<string[]>([]);
 const [openModel,setOpenModal] = useState<boolean>(false)
    const [selectedCalenderSlot,setSelectedCalenderSlot] = useState<any>(null)
  const [filter, setFilter] = useState<Object>({});
  const [limit, setLimit] = useState(10);
  const handleRowsChange = (value: number) => {
    setLimit(value);
  };

  const columns: coulmnsType = [
    {
      title: 'اسم المادة',
      tag: "name",
    },
    // {
    //   title:
    //   coaches["coaches_table"]["Players"],
    //   tag: "players",
    // },
    // {
    //   title:
    //   coaches["public_coaches_table"]["level"] ,
    //   tag: "players_level",
    // },
    // {
    //   title:
    //   coaches["coaches_table"]["price_per_hour"],
    //   tag: "owner_price",
    // },
    {
      title:'رقم فاتورة الشراء',
      tag: "invoiceNumber",
    },
    {
      title: 'مصدر المادة',
      tag: "materialResourceType",
    },
    {
      title: 'جراماج',
      tag: "gramage",
    },
     {
      title: 'الطول',
      tag: "length",
    },
     {
      title: 'العرض',
      tag: "width",
    },
     {
      title: 'الوزن',
      tag: "weight",
    },
    {
      title: 'نوع المواد',
      tag: "materialType",
    },
    {
      title:"اسم المستودع",
      tag:"storage"
    }
  ];
  const [searchParams] = useSearchParams();
  const [search, setSearch] = useState("");
  const clubId = useSelector(
    (state: { user: UserSliceType }) => state.user.selectedClub
  );
  const { data, isLoading, isError, error, refetch, isFetching } =
    useGetAllMaterialQuery({
     
      name: useDebounce(search),
      limit: limit,
      currentPage,
      ...filter,
    });
  return (
    <section className="w-full flex flex-col gap-4 overflow-hidden min-h-[600px]">
      <Header
        data={data?.materials}
        id={clubId}
        setSearch={setSearch}
        setFilter={setFilter}
        filter={filter}
        search={search}
        setLimitedFields={setLimitedFields}
         setOpenModal={setOpenModal}
        selectedCalenderSlot={selectedCalenderSlot} 
        setSelectedCalenderSlot={setSelectedCalenderSlot}
      />
      {/* table section */}

      {renderTable({
        isLoading: isLoading,
        isFetching: isFetching,
        isError: isError,
        data: data,
        columns: columns,
        limitedFields: limitedFields,
         setOpenModal:setOpenModal,
         selectedCalenderSlot:selectedCalenderSlot,
         setSelectedCalenderSlot:setSelectedCalenderSlot,
        clubId: clubId,
      })}
      <div className=" flex flex-row justify-between items-center w-full pb-4">
        <RowsPerPageSelect
          options={[10, 25, 50, 100]}
          value={limit}
          onChange={handleRowsChange}
          total={data?.total}
        />

        <div className="w-full flex justify-end items-end">
          <Pagination
            className="pagination-bar"
            currentPage={currentPage}
            totalCount={data ? data?.total : []}
            pageSize={limit}
            onPageChange={(page: any) => setCurrentPage(page)}
          />
        </div>
      </div>

    </section>
  );
}


export default Material