import dictionary from "../../../../dictionary/dictionary.json";
export const initialState = {
  user: {},
  status: "idle",
  clubs: [],
  selectedClub: 0,
  id: "",
  notification: true,
  timeFormat: 12,
  lang: "en",
  darkMode: localStorage.getItem("theme") === "dark" ? true : false,
  auth: false,
  loading: true,
  error: null, //loading || success || failure

  // dictionary: dictionary,
};
export const bookingInitialState = {
  id:0,
  calenderOpen:false,

}
