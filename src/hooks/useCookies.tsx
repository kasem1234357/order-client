import { log } from "console";

type options = {
    path?: string;
    domain?: string;
    expires?: Date;
    secure?: boolean;
    httpOnly?: boolean;
    sameSite?: "strict" | "lax" | "none";
    "Max-Age"?: number;
    "Comment"?: string;

}

const useCookies = ()=>{
   const setCookies = (key: string, value: any, options?: {} | options, expireByDays?: number): void => {
  let opt = ``;
  let expires: string | undefined;

  if (options) {
    Object.keys(options).forEach((k) => {
      opt += `${k}=${options[k as keyof typeof options]};`;
    });
  }

  if (expireByDays) {
    const expirationDate = new Date(Date.now() + expireByDays * 86400000);
    expires = 'expires=' + expirationDate.toUTCString();
  }

  document.cookie = `${key}=${value}; ${opt} ${expires ? expires : ""}`;
};
  const getCookies = (key:string):string=>{
    let name = key;
  let decodedCookie = decodeURIComponent(document.cookie);

  let ca = decodedCookie.split(';');
 if(key === ''){
  return ''
 }
  
  return ca[0].split('=')[0].trim().indexOf(name) >-1 ? ca[0].substring(name.length+1):''
  }
  const deleteCookies =(name:string,paths?:string[])=>{
    document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
    if(paths){
      paths.forEach(path=>{
        document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=${path};`;
      })
    }
  }
  const clearCookies = (paths?:string[]) => {
    const cookies = document.cookie.split(";"); // Get all cookies as a string array
    cookies.forEach((cookie) => {
      const [name] = cookie.split("="); // Extract the cookie name
      document.cookie = `${name.trim()}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
      if(paths){
        paths.forEach(path=>{
          document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=${path};`;
        })
      }
    });
  }
  return {
    clearCookies,
    deleteCookies,
    getCookies,
    setCookies
  }
}
export default useCookies