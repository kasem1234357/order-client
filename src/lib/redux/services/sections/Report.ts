 import { Api } from "../Api";

 export const ReportEndpoints = Api.injectEndpoints({
    endpoints: (builder) => ({
       getIncomeReport: builder.query({
        query: ({club_id,from='',to=''})=>`/club/income?club_id=${club_id}&first_range=${from}&second_range=${to}`,
        providesTags:['report']
       }),
       getOccupationRate: builder.query({
        query: ({from='',to='',club_id=0})=>`/club/occ_rate?first_range=${from}&second_range=${to}&club_id=${club_id}`,
        providesTags:['report']
       }),
       getReportTable: builder.query({
        query: ({from='',to='',club_id=0})=>`/club/table_report?first_range=${from}&second_range=${to}&club_id=${club_id}`,
        providesTags:['report']
       }),
       getHeatMap: builder.query({
           query: ({from='',to='',last,club_id=0})=>`/club/heat_map?from_date=${from}&to_date=${to}&${last>0?`last=${last}`:''}&club_id=${club_id}`,
        providesTags:['report']
       }),
       getUtilizationReport:builder.query({
         query:({type='weekly',from='',current_month='',to=''})=>type === 'weekly'?`/club/utilization/weekly?first_date=${from}&last_date=${to}`:`/club/utilization/monthly?current_month=${current_month}`,
         providesTags:['report']
       }),
       getRevenueReport:builder.query({
         query:({type='weekly',from='',current_month='',to=''})=>type === 'weekly'?`/club/revenue/weekly?first_date=${from}&last_date=${to}`:`/club/revenue/monthly?current_month=${current_month}`,
         providesTags:['report']
       })
      


    })
 })

 export const {
    useGetIncomeReportQuery,
    useGetOccupationRateQuery,
    useGetReportTableQuery,
    useGetHeatMapQuery,
    useGetUtilizationReportQuery,
    useGetRevenueReportQuery
 } = ReportEndpoints