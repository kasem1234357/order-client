import { useGetDictionary } from "../hooks/useGetDictionary";
import { stateType } from "../types";

export const useStateType = () => {
  const { home } = useGetDictionary();

  return {
    // available: {
    //   title: home.available_slots_for_booking,
    //   color: "rgb(52, 199, 89)",
    //   blurColor: "rgb(52, 199, 89, 0.1)",
    // },
    booked: {
      title: home.booked,
      color: "rgb(239, 70, 38)",
      blurColor: "rgb(239, 70, 38, 0.1)",
    },
    out: {
      title: home.out_of_working_hours,
      color: "#CCCCCC",
      blurColor: "#CCCCCC",
    },
    // draft: {
    //   title: home.draft,
    //   color: "rgb(203, 219, 42)",
    //   blurColor: "rgb(203, 219, 42, 0.1)",
    // },
  } as stateType;
};
export const fieldsNames = [
  {
    fieldName:'price',
    tag:'price'
  },
  {
    fieldName:'client Name',
    tag:'clientName'
  },
  {
    fieldName:'Order Number',
    tag:'OrderNumber'
  },
   {
    fieldName:'width',
    tag:'width'
  },
  {
    fieldName:'length',
    tag:'length'
  },
  {
    fieldName:'weight',
    tag:'weight'
  },
  {
    fieldName:'Order Date',
    tag:'OrderDate'
  },
  {
    fieldName:'Created By',
    tag:'CreatedBy'
  },
  {
    fieldName:'invoice Date',
    tag:'invoiceDate'
  },
  {
    fieldName:'invoice Number',
    tag:'invoiceNumber'
  },
  {
    fieldName:'delivery Date',
    tag:'deliveryDate'
  },
  {
    fieldName:'delivery Number',
    tag:'deliveryNumber'
  },

]
export const currentPremission2 = [
  {
    section: "Chat",
    read: true,
    create: true,
    write: true,
    delete: true,
  },
  { section: "Report", read: true, create: true, write: true, delete: true },
  {
    section: "Home",
    read: true,
    create: true,
    write: true,
    delete: true,
  },
  {
    section: "Booking",
    read: true,
    create: true,
    write: true,
    delete: true,
  },
  {
    section: "Coaching",
    read: true,
    create: true,
    write: true,
    delete: true,
  },
  {
    section: "Club Admins",
    read: true,
    create: true,
    write: true,
    delete: true,
  },
  {
    section: "Pricing",
    read: true,
    create: true,
    write: true,
    delete: true,
  },
  {
    section: "Coaches",
    read: true,
    create: true,
    write: true,
    delete: true,
  },
  {
    section: "Courts",
    read: true,
    create: true,
    write: true,
    delete: true,
  },
  {
    section: "Events",
    read: true,
    create: true,
    write: true,
    delete: true,
  },
  {
    section: "Organization",
    read: true,
    create: true,
    write: true,
    delete: true,
  },
  {
    section: "Payments",
    read: true,
    create: true,
    write: true,
    delete: true,
  },
  {
    section: "Payment Methods",
    read: true,
    create: true,
    write: true,
    delete: true,
  },
  {
    section: "Club Customers",
    read: true,
    create: true,
    write: true,
    delete: true,
  },
  {
    section: "POS",
    read: true,
    create: true,
    write: true,
    delete: true,
  },
  {
    section: "Extras",
    read: true,
    create: true,
    write: true,
    delete: true,
  },
  {
    section: "Help Center",
    read: true,
    create: true,
    write: true,
    delete: true,
  },
  {
    section: "Message",
    read: true,
    create: true,
    write: true,
    delete: true,
  },
  {
    section: "Notifications",
    read: true,
    create: true,
    write: true,
    delete: true,
  },
  {
    section: "Profile",
    read: true,
    create: true,
    write: true,
    delete: true,
  },
  {
    section: "Home",
    read: true,
    create: true,
    write: true,
    delete: true,
  },
  {
    section: "Booking",
    read: true,
    create: true,
    write: true,
    delete: true,
  },
  {
    section: "Coaching",
    read: true,
    create: true,
    write: true,
    delete: true,
  },
  {
    section: "Club Admins",
    read: true,
    create: true,
    write: true,
    delete: true,
  },
  {
    section: "Pricing",
    read: true,
    create: true,
    write: true,
    delete: true,
  },
  {
    section: "Coaches",
    read: true,
    create: true,
    write: true,
    delete: true,
  },
  {
    section: "Courts",
    read: true,
    create: true,
    write: true,
    delete: true,
  },
  {
    section: "Events",
    read: true,
    create: true,
    write: true,
    delete: true,
  },
  {
    section: "Organization",
    read: true,
    create: true,
    write: true,
    delete: true,
  },
  {
    section: "Payments",
    read: true,
    create: true,
    write: true,
    delete: true,
  },
  {
    section: "Payment Methods",
    read: true,
    create: true,
    write: true,
    delete: true,
  },
  {
    section: "Club Customers",
    read: true,
    create: true,
    write: true,
    delete: true,
  },
  {
    section: "POS",
    read: true,
    create: true,
    write: true,
    delete: true,
  },
  {
    section: "Extras",
    read: true,
    create: true,
    write: true,
    delete: true,
  },
  {
    section: "Help Center",
    read: true,
    create: true,
    write: true,
    delete: true,
  },
  {
    section: "Message",
    read: true,
    create: true,
    write: true,
    delete: true,
  },
  {
    section: "Notifications",
    read: true,
    create: true,
    write: true,
    delete: true,
  },
  {
    section: "Profile",
    read: true,
    create: true,
    write: true,
    delete: true,
  },
  {
    section: "Roles",
    read: true,
    create: true,
    write: true,
    delete: true,
  },
  {
    section: "Public Coaching",
    read: true,
    create: true,
    write: true,
    delete: true,
  },
  {
    section: "Private Coaching",
    read: true,
    create: true,
    write: true,
    delete: true,
  },
  {
    section: "Game With Coach",
    read: true,
    create: true,
    write: true,
    delete: true,
  },
  {
    section: "Leagues",
    read: true,
    create: true,
    write: true,
    delete: true,
  },
  {
    section: "Tournaments",
    read: true,
    create: true,
    write: true,
    delete: true,
  },
  {
    section: "Academy",
    read: true,
    create: true,
    write: true,
    delete: true,
  },
  {
    section:"Erp",
    read:true,
    create: false,
    write: false,
    'delete': false
  }
]
export const CURRENCY = () => {
  const currency = localStorage.getItem("currency") || "SY";
  return currency;
};
export const MOBILE_VIEW_ENDPOINT = 700
export const COUNTRY = [
  {
    value: "AF",
    label: "Afghanistan",
  },
  {
    value: "AL",
    label: "Albania",
  },
  {
    value: "DZ",
    label: "Algeria",
  },
  {
    value: "AS",
    label: "American Samoa",
  },
  {
    value: "AD",
    label: "Andorra",
  },
  {
    value: "AO",
    label: "Angola",
  },
  {
    value: "AI",
    label: "Anguilla",
  },
  {
    value: "AQ",
    label: "Antarctica",
  },
  {
    value: "AG",
    label: "Antigua and Barbuda",
  },
  {
    value: "AR",
    label: "Argentina",
  },
  {
    value: "AM",
    label: "Armenia",
  },
  {
    value: "AW",
    label: "Aruba",
  },
  {
    value: "AU",
    label: "Australia",
  },
  {
    value: "AT",
    label: "Austria",
  },
  {
    value: "AZ",
    label: "Azerbaijan",
  },
  {
    value: "BS",
    label: "Bahamas",
  },
  {
    value: "BH",
    label: "Bahrain",
  },
  {
    value: "BD",
    label: "Bangladesh",
  },
  {
    value: "BB",
    label: "Barbados",
  },
  {
    value: "BY",
    label: "Belarus",
  },
  {
    value: "BE",
    label: "Belgium",
  },
  {
    value: "BZ",
    label: "Belize",
  },
  {
    value: "BJ",
    label: "Benin",
  },
  {
    value: "BM",
    label: "Bermuda",
  },
  {
    value: "BT",
    label: "Bhutan",
  },
  {
    value: "BO",
    label: "Bolivia",
  },
  {
    value: "BQ",
    label: "Bonaire, Sint Eustatius and Saba",
  },
  {
    value: "BA",
    label: "Bosnia and Herzegovina",
  },
  {
    value: "BW",
    label: "Botswana",
  },
  {
    value: "BV",
    label: "Bouvet Island",
  },
  {
    value: "BR",
    label: "Brazil",
  },
  {
    value: "IO",
    label: "British Indian Ocean Territory",
  },
  {
    value: "BN",
    label: "Brunei Darussalam",
  },
  {
    value: "BG",
    label: "Bulgaria",
  },
  {
    value: "BF",
    label: "Burkina Faso",
  },
  {
    value: "BI",
    label: "Burundi",
  },
  {
    value: "KH",
    label: "Cambodia",
  },
  {
    value: "CM",
    label: "Cameroon",
  },
  {
    value: "CA",
    label: "Canada",
  },
  {
    value: "CV",
    label: "Cape Verde",
  },
  {
    value: "KY",
    label: "Cayman Islands",
  },
  {
    value: "CF",
    label: "Central African Republic",
  },
  {
    value: "TD",
    label: "Chad",
  },
  {
    value: "CL",
    label: "Chile",
  },
  {
    value: "CN",
    label: "China",
  },
  {
    value: "CX",
    label: "Christmas Island",
  },
  {
    value: "CC",
    label: "Cocos (Keeling) Islands",
  },
  {
    value: "CO",
    label: "Colombia",
  },
  {
    value: "KM",
    label: "Comoros",
  },
  {
    value: "CG",
    label: "Congo",
  },
  {
    value: "CK",
    label: "Cook Islands",
  },
  {
    value: "CR",
    label: "Costa Rica",
  },
  {
    value: "HR",
    label: "Croatia",
  },
  {
    value: "CU",
    label: "Cuba",
  },
  {
    value: "CW",
    label: "Curaçao",
  },
  {
    value: "CY",
    label: "Cyprus",
  },
  {
    value: "CZ",
    label: "Czech Republic",
  },
  {
    value: "CI",
    label: "Côte d'Ivoire",
  },
  {
    value: "CD",
    label: "Democratic Republic of the Congo",
  },
  {
    value: "DK",
    label: "Denmark",
  },
  {
    value: "US",
    label: "United States",
  },
  {
    value: "MX",
    label: "Mexico",
  },
  {
    value: "UK",
    label: "United Kingdom",
  },
  {
    value: "FR",
    label: "France",
  },
  {
    value: "DE",
    label: "Germany",
  },
  {
    value: "IN",
    label: "India",
  },
  {
    value: "JP",
    label: "Japan",
  },
  {
    value: "ZA",
    label: "South Africa",
  },
  {
    value: "IT",
    label: "Italy",
  },
  {
    value: "ES",
    label: "Spain",
  },
  {
    value: "AE",
    label: "United Arab Emirates",
  },
  {
    value: "SA",
    label: "Saudi Arabia",
  },
  {
    value: "QA",
    label: "Qatar",
  },
  {
    value: "KW",
    label: "Kuwait",
  },
  {
    value: "OM",
    label: "Oman",
  },
  {
    value: "JO",
    label: "Jordan",
  },
  {
    value: "LB",
    label: "Lebanon",
  },
  {
    value: "SY",
    label: "Syria",
  },
  {
    value: "IQ",
    label: "Iraq",
  },
  {
    value: "IR",
    label: "Iran",
  },
  {
    value: "YE",
    label: "Yemen",
  },
  {
    value: "TR",
    label: "Turkey",
  },
  {
    value: "PS",
    label: "Palestine",
  },
  {
    value: "EG",
    label: "Egypt",
  },
];
const NUMBER_OF_PLAYERS_TYPE = {
  1:'private',
  2:'2_players',
}
export const ORDER_ENUM = [
  { value: 1, label: "Primary" },
  { value: 2, label: "Second" },
  { value: 3, label: "Third" },
  { value: 4, label: "Fourth" },
  { value: 5, label: "Fifth" },
  { value: 6, label: "Sixth" },
  { value: 7, label: "Seventh" },
  { value: 8, label: "Eighth" },
  { value: 9, label: "Ninth" },
  { value: 10, label: "Tenth" },
];
const STAGES = [
  "adding_players",
  "generating_groups",
  "matches_view",
  "matches_scores",
];
// for dynamic path put * instead of the dynamic section
export const FORM_ROUTES = [
  "/coaching/Academy/new",
  "/coaching/Academy/*/*",
  "/competitive/leagues/new/step1",
  "/competitive/leagues/new/step2",
  "/competitive/tournaments/new/step1",
  "/competitive/tournaments/new/step2",
  "/competitive/tournaments/edit/step1/*",
  "/competitive/tournaments/edit/step2/*",
  "/competitive/tournaments/duplicate/step1/*",
  "/competitive/tournaments/duplicate/step2/*",
  "/competitive/leagues/duplicate/step1/*",
  "/competitive/leagues/duplicate/step2/*",
  "/competitive/leagues/edit/step1/*",
  "/competitive/leagues/edit/step2/*",
  "/friendly/*/new/step1/*",
  "/friendly/*/new/step2/*",
  "/club-settings/organization/*",
  "/friendly/*/edit/step1/*",
  "/friendly/*/edit/step2/*",
  "/friendly/*/duplicate/step1/*",
  "/friendly/*/duplicate/step2/*",
  "/club-settings/membership/new",
  "/club-settings/customer/new",
];
