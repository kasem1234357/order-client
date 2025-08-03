
export const checkRole = (eventType:"read"|"write"|"create"|"delete"|"none",sections:string[],roles:any[]) => {
    const itemEventType = eventType;
    let isAllowed = true;
    if(eventType === 'none'){
      return true
    }
    
    sections.forEach((section)=>{
      //@ts-ignore
         const sectionRoles = roles?.find((role)=>role?.section?.toLowerCase() === section?.toLowerCase())
         
         
         if(sectionRoles){
          
          
          
          
             if(sectionRoles[itemEventType as keyof typeof sectionRoles] === false){
           
              
               isAllowed = false;
             }
         }

    })
    return isAllowed;


}