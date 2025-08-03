import {useState} from 'react'
const useMultiSelect = ()=>{
    const [selectors, setSelectors] = useState <Array<any>>([]);
    
    /**
     * @desc This function using to find an item inside selectors.
     * TODO: this function will return the index of item of found else will return `0`
     * @param { any } item
     * @return { number }
     */
    const searchForItem = (item: any,externalSelectors?:Array<any>): number => {
      let index: number = -1;
       const currentSelectors = externalSelectors || selectors;
      // If the item is an object, perform a deep comparison
      if (typeof item === "object" && item !== null) {
        currentSelectors.some((el, indexEl) => {
          const keys1 = Object.keys(item);
          const keys2 = Object.keys(el);
    
          // If the objects have different keys, skip this element
          if (keys1.length !== keys2.length) {
            return false;
          }
    
          // Check if all keys and their values are equal
          const isMatch = keys1.every((key) => el[key] === item[key]);
    
          if (isMatch) {
            index = indexEl;
            
            
            // Update the index to the current index
            return true; // Stop further iteration
          }
    
          return false; // Continue to the next element
        });
      } else {
        // If the item is not an object, use a direct comparison
        index = currentSelectors.indexOf(item);
      }
      return index;
    };
    
  
    /**
     * @desc This function using to add new item to selectors
     * @param { any } item
     * @return { void }
     */
    const addItem = (item: object): void => {
      
          searchForItem(item ) <0 && setSelectors(prev => [...prev,item])
    }
  
    /**
     * @desc This function using to remove an item from selectors array
     * @param { any } item
     * @return { void }
     */
    const removeItem = (item: any): void => {
      const isset = searchForItem(item);
      isset >= 0 && setSelectors((prev: Array<any>) => prev.filter((_selector: any, index: number) => index !== isset));
    }
  
    /**
     * @desc This function using to set a array of items.
     * @param { Array<any> } items
     * @return { void }
     */
    const addArrayItems = (items: Array<any>): void => {
      items.forEach(item => {
        addItem(item);
      });
    }
  
    return {
      selectors,
      addItem,
      removeItem,
      searchForItem,
      setSelectors,
      addArrayItems
    }
}

export default useMultiSelect