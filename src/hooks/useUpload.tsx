import { useState } from "react";
function getType(name:string){
   return name.slice(name.lastIndexOf('.')+1,name.length)
}
const useUpload = () => {
  const [path, setPath] = useState("");
  const [fileData, setData] = useState("");
  const [ext,setExt] = useState('');
  const [name,setName] = useState('');
  const [type,setType] = useState('');
  const [size,setSize] = useState(0)
  //@ts-ignore
  const uploadData = (e,callBack?:(result:any,formData)=>void) => {
    e.preventDefault();
    const reader = (readFile:any) =>
      new Promise((resolve,) => {
        const fileReader = new FileReader();
        fileReader.onload = () => resolve(fileReader.result);
        fileReader.readAsDataURL(readFile);
      });
    if (e.target.files) {
        setName(e.target.files[0].name)
       reader(e.target.files[0]).then((result) => {
        
        
        
        callBack && callBack(result,e.target.files[0])
        //@ts-ignore
        setData(result)
        setSize(parseFloat(((e.target.files[0].size)/(1024*1024)).toFixed(2)))
        setType(e.target.files[0].type)
        setExt(getType(e.target.files[0].name))

      });
    }
    return ({})
  };
  const reset = ()=>{
    setData('')
    setExt('')
    setName('')
    setSize(0)
    setPath('')
    setType('')
  }
  return {
    path,
    fileData,
    imgName:name,
    type,
    size,
    ext,
    uploadData,
    reset
  };
};
export default useUpload