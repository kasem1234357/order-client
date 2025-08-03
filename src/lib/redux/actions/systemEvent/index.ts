
import { UserSliceType } from "../../slices/userSlice";

import { currentPremission2 } from "../../../../constants";

export const system_layout_actions = {
  selectClub: (state: UserSliceType, action: { payload: number }) => {
    state.selectedClub = action.payload;
    
    const isEnabled = localStorage.getItem('isEnabledRules');
    if(isEnabled === 'true'){
      //@ts-ignore
    const currentPremission = state.user?.clubs_roles_list?.find((item) => item.club_id === action.payload)?.permissions;
    state.currentPremission = currentPremission || [];
    }else{
      
      state.currentPremission = currentPremission2
    } 
    
  },
  setUser: (state: UserSliceType, action: { payload: any }) => {

    state.user ={ 
      ...state.user,
      ...action.payload};
  },
  setPremission: (state: UserSliceType, action: { payload: any }) => {
    
    state.currentPremission = currentPremission2;
  },
  changePremission: (state: UserSliceType, action: { payload: any }) => {
    const clubId = action.payload.club_id;
    //@ts-ignore
    const clubName = state.user?.clubs?.find((item)=>item.club_id === clubId)?.club_name
    //@ts-ignore
    // const currentPremission = state.user?.clubs_roles_list?.find((item) => item.club_name === clubName)?.permissions;
    // state.currentPremission = currentPremission || [];
   
    state.currentPremission = currentPremission2
  },
  setStage: (state: UserSliceType, action: { payload: any }) => {
    state.stage = action.payload;
  },
  setStatus: (state: UserSliceType, action: { payload: any }) => {
    state.status = action.payload;
  },
  setClubs: (state: UserSliceType, action: { payload: any }) => {
    state.clubs = action.payload;
  },
  addClub: (state: UserSliceType, action: { payload: any }) => {
    state.clubs.push(action.payload);
  },
  removeClub: (state: UserSliceType, action: { payload: any }) => {
    state.clubs = state.clubs.filter((club: any) => club.id !== action.payload);
  },
  setDictonary: (state: UserSliceType, action: { payload: any }) => {
    state.dictionary = action.payload;
  },
  setTimeFormat: (state: UserSliceType, action: { payload: any }) => {
    state.timeFormat = action.payload;
  },
  setLang: (state: UserSliceType, action: { payload: any }) => {
    state.lang = action.payload;
  },
  // setId: (state, action) => {
  //   state.user.id = action.payload;
  // },
  // setNotification: (state, action) => {
  //   state.user.notification = action.payload;
  // },
  // setDarkMode: (state, action) => {
  //   state.user.darkMode = action.payload;
  // },
  // setAuth: (state, action) => {
  //   state.user.auth = action.payload;
  // },
  // setLoading: (state, action) => {
  //   state.user.loading = action.payload;
  // },
  // setError: (state, action) => {
  //   state.user.error = action.payload;
  // },
};
