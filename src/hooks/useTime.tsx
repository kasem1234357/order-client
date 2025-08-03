type timeOptions = {
    timeZone?:TimeZones,
    hour12?:boolean,
    formatMatcher?:"best fit" | "basic" | undefined,
    weekday?: "narrow"| "short"| "long",
    era?:"narrow"| "short"| "long",
    year?: "numeric"|"2-digit",
    month?:"numeric"|"2-digit"|"narrow"| "short"| "long",
    day?:"numeric"|"2-digit",
    hour?:"numeric"|"2-digit",
    minute?:"numeric"|"2-digit",
    second?:"numeric"|"2-digit",
    timeZoneName?:"short"|"long"
}
type langShortcut =  "ar-SA"| "bn-BD"| "bn-IN"| "cs-CZ"| "da-DK"| "de-AT"| "de-CH"| "de-DE"| "el-GR"| "en-AU"| "en-CA"| "en-GB"| "en-IE"| "en-IN"| "en-NZ"| "en-US"| "en-ZA"| "es-AR"| "es-CL"| "es-CO"| "es-ES"| "es-MX"| "es-US"| "fi-FI"| "fr-BE"| "fr-CA"| "fr-CH"| "fr-FR"| "he-IL"| "hi-IN"| "hu-HU"| "id-ID"| "it-CH"| "it-IT"| "ja-JP"| "ko-KR"| "nl-BE"| "nl-NL"| "no-NO"| "pl-PL"| "pt-BR"| "pt-PT"| "ro-RO"| "ru-RU"| "sk-SK"| "sv-SE"| "ta-IN"| "ta-LK"| "th-TH"| "tr-TR"| "zh-CN"| "zh-HK"| "zh-TW"
const useTime = ()=>{
    const getSafeDate = (dateString:string) => {
  const date = new Date(dateString || '')
  return  date
};
  const getDateinLang = (lang?:langShortcut,options:timeOptions = {},date:string|null=null)=>{
    const dateValue = date || ''; // Handle falsy `date` input
const safeDateStr = getSafeDate(dateValue); // Get date string from helper

// Create a Date object using a robust parser
let dateObj;
if (!safeDateStr) {
  // Handle empty date case
  return '';
  //@ts-ignore
} else if (/^\d{4}-\d{2}-\d{2}$/.test(safeDateStr)) {
  // Format YYYY-MM-DD (Safari requires T00:00:00 for reliability)
  dateObj = new Date(`${safeDateStr}T00:00:00`);
} else {
  // Try parsing other formats (ISO, timestamps, etc.)
  dateObj = new Date(safeDateStr);
}
    return dateObj.toLocaleDateString(lang,options)
  }

const getTimeInLang = (
  lang?: string, 
  options: Intl.DateTimeFormatOptions = {}, 
  date: string | Date | null = null
) => {
  // 1. Create a reliable date parser
  const parseDate = (input: string | Date): Date => {
    if (input instanceof Date) return input;
    
    // Handle Safari's strict YYYY-MM-DD format requirement
    if (/^\d{4}-\d{2}-\d{2}$/.test(input)) {
      return new Date(`${input}T00:00:00`);
    }
    
    // Fallback to standard parsing for other formats
    const parsed = new Date(input);
    return isNaN(parsed.getTime()) ? new Date() : parsed;
  };

  // 2. Determine date source with proper fallbacks
  let parsedDate: Date;
  if (date instanceof Date) {
    parsedDate = date;
  } else if (typeof date === 'string') {
    parsedDate = parseDate(date);
  } else {
    parsedDate = new Date(); // Current date when null/unsupported
  }

  // 3. Clone options and remove fixed timezone
  const safeOptions = { ...options };
  delete safeOptions.timeZone;

  // 4. Return formatted time string
  return parsedDate.toLocaleTimeString(lang, safeOptions);
};
const getTime =()=>{
    return {
        hour:new Date().getHours()% 12 || 12,
        minute:new Date().getMinutes(),
        seconds:new Date().getSeconds()
    }
}
return {
    getDateinLang,
    getTimeInLang,
    getTime
}
}
export default useTime

/** 
 * 
 * 
 * 
 * 
 * 
 **/


type TimeZones = | "Europe/Andorra"| "Asia/Dubai"| "Asia/Kabul"| "Europe/Tirane"| "Asia/Yerevan"| "Antarctica/Casey"| "Antarctica/Davis"| "Antarctica/DumontDUrville"| "Antarctica/Mawson"| "Antarctica/Palmer"| "Antarctica/Rothera"| "Antarctica/Syowa"| "Antarctica/Troll"| "Antarctica/Vostok"| "America/Argentina/Buenos_Aires"| "America/Argentina/Cordoba"| "America/Argentina/Salta"| "America/Argentina/Jujuy"| "America/Argentina/Tucuman"| "America/Argentina/Catamarca"| "America/Argentina/La_Rioja"| "America/Argentina/San_Juan"| "America/Argentina/Mendoza"| "America/Argentina/San_Luis"| "America/Argentina/Rio_Gallegos"| "America/Argentina/Ushuaia"| "Pacific/Pago_Pago"| "Europe/Vienna"| "Australia/Lord_Howe"| "Antarctica/Macquarie"| "Australia/Hobart"| "Australia/Currie"| "Australia/Melbourne"| "Australia/Sydney"| "Australia/Broken_Hill"| "Australia/Brisbane"| "Australia/Lindeman"| "Australia/Adelaide"| "Australia/Darwin"| "Australia/Perth"| "Australia/Eucla"| "Asia/Baku"| "America/Barbados"| "Asia/Dhaka"| "Europe/Brussels"| "Europe/Sofia"| "Atlantic/Bermuda"| "Asia/Brunei"| "America/La_Paz"| "America/Noronha"| "America/Belem"| "America/Fortaleza"| "America/Recife"| "America/Araguaina"| "America/Maceio"| "America/Bahia"| "America/Sao_Paulo"| "America/Campo_Grande"| "America/Cuiaba"| "America/Santarem"| "America/Porto_Velho"| "America/Boa_Vista"| "America/Manaus"| "America/Eirunepe"| "America/Rio_Branco"| "America/Nassau"| "Asia/Thimphu"| "Europe/Minsk"| "America/Belize"| "America/St_Johns"| "America/Halifax"| "America/Glace_Bay"| "America/Moncton"| "America/Goose_Bay"| "America/Blanc-Sablon"| "America/Toronto"| "America/Nipigon"| "America/Thunder_Bay"| "America/Iqaluit"| "America/Pangnirtung"| "America/Atikokan"| "America/Winnipeg"| "America/Rainy_River"| "America/Resolute"| "America/Rankin_Inlet"| "America/Regina"| "America/Swift_Current"| "America/Edmonton"| "America/Cambridge_Bay"| "America/Yellowknife"| "America/Inuvik"| "America/Creston"| "America/Dawson_Creek"| "America/Fort_Nelson"| "America/Vancouver"| "America/Whitehorse"| "America/Dawson"| "Indian/Cocos"| "Europe/Zurich"| "Africa/Abidjan"| "Pacific/Rarotonga"| "America/Santiago"| "America/Punta_Arenas"| "Pacific/Easter"| "Asia/Shanghai"| "Asia/Urumqi"| "America/Bogota"| "America/Costa_Rica"| "America/Havana"| "Atlantic/Cape_Verde"| "America/Curacao"| "Indian/Christmas"| "Asia/Nicosia"| "Asia/Famagusta"| "Europe/Prague"| "Europe/Berlin"| "Europe/Copenhagen"| "America/Santo_Domingo"| "Africa/Algiers"| "America/Guayaquil"| "Pacific/Galapagos"| "Europe/Tallinn"| "Africa/Cairo"| "Africa/El_Aaiun"| "Europe/Madrid"| "Africa/Ceuta"| "Atlantic/Canary"| "Europe/Helsinki"| "Pacific/Fiji"| "Atlantic/Stanley"| "Pacific/Chuuk"| "Pacific/Pohnpei"| "Pacific/Kosrae"| "Atlantic/Faroe"| "Europe/Paris"| "Europe/London"| "Asia/Tbilisi"| "America/Cayenne"| "Africa/Accra"| "Europe/Gibraltar"| "America/Godthab"| "America/Danmarkshavn"| "America/Scoresbysund"| "America/Thule"| "Europe/Athens"| "Atlantic/South_Georgia"| "America/Guatemala"| "Pacific/Guam"| "Africa/Bissau"| "America/Guyana"| "Asia/Hong_Kong"| "America/Tegucigalpa"| "America/Port-au-Prince"| "Europe/Budapest"| "Asia/Jakarta"| "Asia/Pontianak"| "Asia/Makassar"| "Asia/Jayapura"| "Europe/Dublin"| "Asia/Jerusalem"| "Asia/Kolkata"| "Indian/Chagos"| "Asia/Baghdad"| "Asia/Tehran"| "Atlantic/Reykjavik"| "Europe/Rome"| "America/Jamaica"| "Asia/Amman"| "Asia/Tokyo"| "Africa/Nairobi"| "Asia/Bishkek"| "Pacific/Tarawa"| "Pacific/Enderbury"| "Pacific/Kiritimati"| "Asia/Pyongyang"| "Asia/Seoul"| "Asia/Almaty"| "Asia/Qyzylorda"| "Asia/Qostanay"| "Asia/Aqtobe"| "Asia/Aqtau"| "Asia/Atyrau"| "Asia/Oral"| "Asia/Beirut"| "Asia/Colombo"| "Africa/Monrovia"| "Europe/Vilnius"| "Europe/Luxembourg"| "Europe/Riga"| "Africa/Tripoli"| "Africa/Casablanca"| "Europe/Monaco"| "Europe/Chisinau"| "Pacific/Majuro"| "Pacific/Kwajalein"| "Asia/Yangon"| "Asia/Ulaanbaatar"| "Asia/Hovd"| "Asia/Choibalsan"| "Asia/Macau"| "America/Martinique"| "Europe/Malta"| "Indian/Mauritius"| "Indian/Maldives"| "America/Mexico_City"| "America/Cancun"| "America/Merida"| "America/Monterrey"| "America/Matamoros"| "America/Mazatlan"| "America/Chihuahua"| "America/Ojinaga"| "America/Hermosillo"| "America/Tijuana"| "America/Bahia_Banderas"| "Asia/Kuala_Lumpur"| "Asia/Kuching"| "Africa/Maputo"| "Africa/Windhoek"| "Pacific/Noumea"| "Pacific/Norfolk"| "Africa/Lagos"| "America/Managua"| "Europe/Amsterdam"| "Europe/Oslo"| "Asia/Kathmandu"| "Pacific/Nauru"| "Pacific/Niue"| "Pacific/Auckland"| "Pacific/Chatham"| "America/Panama"| "America/Lima"| "Pacific/Tahiti"| "Pacific/Marquesas"| "Pacific/Gambier"| "Pacific/Port_Moresby"| "Pacific/Bougainville"| "Asia/Manila"| "Asia/Karachi"| "Europe/Warsaw"| "America/Miquelon"| "Pacific/Pitcairn"| "America/Puerto_Rico"| "Asia/Gaza"| "Asia/Hebron"| "Europe/Lisbon"| "Atlantic/Madeira"| "Atlantic/Azores"| "Pacific/Palau"| "America/Asuncion"| "Asia/Qatar"| "Indian/Reunion"| "Europe/Bucharest"| "Europe/Belgrade"| "Europe/Kaliningrad"| "Europe/Moscow"| "Europe/Simferopol"| "Europe/Kirov"| "Europe/Astrakhan"| "Europe/Volgograd"| "Europe/Saratov"| "Europe/Ulyanovsk"| "Europe/Samara"| "Asia/Yekaterinburg"| "Asia/Omsk"| "Asia/Novosibirsk"| "Asia/Barnaul"| "Asia/Tomsk"| "Asia/Novokuznetsk"| "Asia/Krasnoyarsk"| "Asia/Irkutsk"| "Asia/Chita"| "Asia/Yakutsk"| "Asia/Khandyga"| "Asia/Vladivostok"| "Asia/Ust-Nera"| "Asia/Magadan"| "Asia/Sakhalin"| "Asia/Srednekolymsk"| "Asia/Kamchatka"| "Asia/Anadyr"| "Asia/Riyadh"| "Pacific/Guadalcanal"| "Indian/Mahe"| "Africa/Khartoum"| "Europe/Stockholm"| "Asia/Singapore"| "America/Paramaribo"| "Africa/Juba"| "Africa/Sao_Tome"| "America/El_Salvador"| "Asia/Damascus"| "America/Grand_Turk"| "Africa/Ndjamena"| "Indian/Kerguelen"| "Asia/Bangkok"| "Asia/Dushanbe"| "Pacific/Fakaofo"| "Asia/Dili"| "Asia/Ashgabat"| "Africa/Tunis"| "Pacific/Tongatapu"| "Europe/Istanbul"| "America/Port_of_Spain"| "Pacific/Funafuti"| "Asia/Taipei"| "Europe/Kiev"| "Europe/Uzhgorod"| "Europe/Zaporozhye"| "Pacific/Wake"| "America/New_York"| "America/Detroit"| "America/Kentucky/Louisville"| "America/Kentucky/Monticello"| "America/Indiana/Indianapolis"| "America/Indiana/Vincennes"| "America/Indiana/Winamac"| "America/Indiana/Marengo"| "America/Indiana/Petersburg"| "America/Indiana/Vevay"| "America/Chicago"| "America/Indiana/Tell_City"| "America/Indiana/Knox"| "America/Menominee"| "America/North_Dakota/Center"| "America/North_Dakota/New_Salem"| "America/North_Dakota/Beulah"| "America/Denver"| "America/Boise"| "America/Phoenix"| "America/Los_Angeles"| "America/Anchorage"| "America/Juneau"| "America/Sitka"| "America/Metlakatla"| "America/Yakutat"| "America/Nome"| "America/Adak"| "Pacific/Honolulu"| "America/Montevideo"| "Asia/Samarkand"| "Asia/Tashkent"| "America/Caracas"| "Asia/Ho_Chi_Minh"| "Pacific/Efate"| "Pacific/Wallis"| "Pacific/Apia"| "Africa/Johannesburg"