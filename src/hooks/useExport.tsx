import { useState } from "react";
import {utils,writeFile, readFile,} from "xlsx";
const useExport =()=>{
  const unvalidKey:string[] =[]
  const [importedData,setImportedData]=useState({})
  
  const convertArrayToString = (key:string,item:any,data:any,i:number)=>{
    
     if(item.hasOwnProperty('length')){
      
       if(i === 0){
        
         const state = item.every((el:any) => typeof(el) !=='object')
         if(!state) {
          
           unvalidKey.push(key)
           return item
         }
         else{
          
           return item.join(', ')
       }
       }else if(unvalidKey.indexOf(key) === -1){
        
         return item.join(', ')
       }
      
     }else{
       for(let dataItem of Object.keys(item)){
         data[key+' => '+dataItem] = item[dataItem]
       }
       delete data[key]
     }
  }
  const  generateExcelFile=(data:any,fileName:string,option:{limitFields?:string[]}={})=>{
    const processedData = JSON.parse(JSON.stringify(data));

    for(let i=0;i<processedData.length;i++){
      if(option?.limitFields){
        for(let item of option.limitFields){
          delete processedData[i][item];
        }
      } 
        for(let dataItem of Object.keys(processedData[i])){
            if(processedData[i][dataItem] !== null &&typeof processedData[i][dataItem] === 'object'){

              processedData[i][dataItem] = convertArrayToString(dataItem,processedData[i][dataItem],processedData[i],i)
            }
            if(processedData[i][dataItem] === undefined){
              delete processedData[i][dataItem]
            }
        }
        

    }
  
    const worksheet = utils.json_to_sheet(processedData);
    
    const workbook = utils.book_new();
    utils.book_append_sheet(workbook, worksheet, "Sheet1");
    writeFile(workbook, `${fileName}.xlsx`);
  }
  const importExcelFile =(e:any,callback?:(data:any)=>void)=>{
    e.preventDefault();
    if (e.target.files) {
      let jsonFile ={}
      const name = e.target.files[0].name;
        const reader = new FileReader();
        reader.readAsArrayBuffer(e.target.files[0]);
        reader.onload = (e) => {
          //@ts-ignore
            const data:any = e.target.result;
            const workbook = readFile(data, { type: "array" });
            const sheetName = workbook.SheetNames[0];
            const worksheet = workbook.Sheets[sheetName];
            const json = utils.sheet_to_json(worksheet);
            let refactoringData:{[key:string]:any} =[];
            const fieldsToRefactor:string[] = []
//@ts-ignore
            for(let originalKey of Object.keys(json[0])){
              if(originalKey.indexOf(' => ') !== -1){
                fieldsToRefactor.push(originalKey)
              }
            }
            refactoringData = json.map((item:any)=>{
                    for(let field of fieldsToRefactor){
                      const key = field.split(' => ')[0]
                      const dataItem = field.split(' => ')[1]
                      item[key] = {
                        ...item[key],
                        [dataItem]:item[field]
                      }
                      delete item[field]
                    }
                    return item


            })
            
            setImportedData({data:refactoringData,fileName:name})
            callback && callback(refactoringData)
            
            
           
        };
         
    }
    
  }
  const reset = ()=>{
    setImportedData({})
  }
      return{
        generateExcelFile,
        importExcelFile,
        importedExcelFile:importedData,
        reset
      }
}
export default useExport