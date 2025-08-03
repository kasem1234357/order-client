import { useSelector } from "react-redux";
import { UserSliceType } from "../lib/redux/slices/userSlice";
import dictionary from "../dictionary/dictionary.json";
type DictionaryType = typeof dictionary;
export function useGetDictionary(): any {
  const serverDictionary: DictionaryType = useSelector(
    (state: { user: UserSliceType }) => state.user.dictionary
  );

  const mergeDictionaries = (
    server: DictionaryType,
    local: DictionaryType = dictionary
  ): any => {
    // console.log('server',server);
    // console.log('local',local);
    let Dict = JSON.parse(JSON.stringify(local));
    if(server){
        for(const key of Object.keys(server)){
          //@ts-ignore
              Dict[key] = {
              //@ts-ignore
                ...local[key],
                //@ts-ignore
                ...server[key],
            }

        }
        // console.log('Dict',Dict);
        
    }
      return Dict
    // if (!server) return local;

    // return server;
  };

  return mergeDictionaries(serverDictionary, dictionary);
}
