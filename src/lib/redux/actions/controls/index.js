//import observable from "../../../utils/notification";
export const controls_layout_actions = {
  openShareModel: (state) => {
    state.ShareModelOpen = true;
  },
  closeShareModel: (state) => {
   state.ShareModelOpen = false
  },
  setInviteLink: (state, action) => {
    state.shareModelInfo = {
      ...state.shareModelInfo,
      link: action.payload
    }
  },
  openSideBar:(state) => {
   state.isOpenSidebar = true
  },
  closeSideBar:(state) => {
   state.isOpenSidebar = false
  },
  toggleSideBar:(state) => {
   state.isOpenSidebar = !state.isOpenSidebar
  },
  updatePathQueue:(state,action)=>{
    console.log(action);
    
    if(action.type === 'back'){
      
      state.pathQueue = state.pathQueue.slice(0,state.pathQueue.length-1)
    }else{
      if(state.pathQueue.length > 0){
        console.log(state.pathQueue[state.pathQueue.length-1]);
        
        if(state.pathQueue[state.pathQueue.length-1]  === action.payload.url){
          state.pathQueue = state.pathQueue
        }else{
           state.pathQueue = [...state.pathQueue,action.payload.url]
        }
        
      }else{
         state.pathQueue = [action.payload.url]
      }
      
    }
  }
  // updateDarkMode: (state, action) => {
  //   state.darkMode = action.payload;
  //   localStorage.setItem('theme',state.darkMode?'dark':"light")
  //   const msg = action.payload ? "dark mode activated" : "light mode activated";
  //   observable.notify({ type: "info", msg });
  // },
  // toggleDarkMode: (state) => {
  //   state.darkMode = !state.darkMode;
  //   localStorage.setItem('theme',state.darkMode?'dark':"light")
  //   const msg = state.darkMode ? "dark mode activated" : "light mode activated";
  //   observable.notify({ type: "info", msg });
  // },
};
export const controls_booking_actions = {
  openCalender: (state) => {
    state.calenderOpen = true;
  },
  setBookingId: (state, action) => {
    state.id = action.payload.bookingId;
  }
}
