import { create } from "domain";
export const forms_layout_actions = {
   addLeagueInfo: (state:any, action:{payload:any}) => {
    state.league ={ ...state.league, ...action.payload };
  },
  reset: (state:any) => {
    state.league = {};
  },
};