type formatType = {
  index: number;
  name: string;
};
type globalInfo = {
  currentDay: { index: number; name: string; dayIndexOfTheWeek: number };
  currentMonth: formatType;
  currentYear: number;
  dayIndex: number;
  monthIndex: number;
  dayIndexOfTheWeek: number;
  startDayOfTheMonth: formatType;
  daysOfTheMonth: number;
};
type names = {
  short: {
    [key: string]: { days: string[]; months: string[] };
  };
  long: {
    [key: string]: { days: string[]; months: string[] };
  };
};
const Names: names = {
  short: {
    En: {
      days: ["San", "Mon", "Tus", "Wed", "Thu", "Fri", "Sat"],
      months: [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ],
    },
  },
  long: {
    En: {
      months: [
        "January ",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September ",
        "October",
        "November",
        "December",
      ],
      days: [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
      ],
    },
  },
};
const months: string[] = [
  "January ",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September ",
  "October",
  "November",
  "December",
];
const days: string[] = ["San", "Mon", "Tus", "Wed", "Thu", "Fri", "Sat"];

const MONTH_NAMES = {
  en: {
    short: [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ],
    long: [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ],
  },
  ar: {
    short: [
      "يناير",
      "فبراير",
      "مارس",
      "أبريل",
      "مايو",
      "يونيو",
      "يوليو",
      "أغسطس",
      "سبتمبر",
      "أكتوبر",
      "نوفمبر",
      "ديسمبر",
    ],
    long: [
      "يناير",
      "فبراير",
      "مارس",
      "أبريل",
      "مايو",
      "يونيو",
      "يوليو",
      "أغسطس",
      "سبتمبر",
      "أكتوبر",
      "نوفمبر",
      "ديسمبر",
    ],
  },
};

const useCalender = () => {
  const data = {
    year: new Date().getFullYear(),
    month: new Date().getMonth(),
    day: new Date().getDate(),
    dayIndexOfTheWeek: new Date().getDay(),
  };
  const nameFormat = (
    index: number,
    name: "months" | "days",
    lang: string = "En",
    type: "short" | "long" = "long"
  ): string => {
    return Names[type as keyof typeof Names][lang as keyof typeof String][name][
      index as number
    ];
  };
  function getMonthName(
    index: number,
    lang: string = "En",
    type: "short" | "long" = "long"
  ): string {
    const langData =
      MONTH_NAMES[lang as keyof typeof MONTH_NAMES] || MONTH_NAMES.en;
    return langData[type][index];
    //return nameFormat(index, "months", lang, type);
  }
  function getDayName(
    index: number,
    lang: string = "En",
    type: "short" | "long" = "long"
  ): string {
    return nameFormat(index, "days", lang, type);
  }
  function numberDaysInMonth(year: number, month: number): number {
    let numberDaysInMonth = new Date(year, month + 1, 0).getDate();

    return numberDaysInMonth;
  }
  function numberDaysInPreviosMonth(year: number, month: number): number {
    if (month == 0) {
      return numberDaysInMonth(year - 1, 11);
    }
    return numberDaysInMonth(year, month - 1);
  }
  function dayOfTheMonth(year: number, month: number): formatType {
    let dayOfTheMonth = new Date(year, month).getDay();

    return {
      index: dayOfTheMonth,
      name: days[dayOfTheMonth],
    };
  }
  const fullDate: string = `${data.year}-${data.month}-${data.day}`;

  const globalInfo = (lang = "En", type = "short"): globalInfo => {
    const currentDay = {
      index: data.day,
      name: Names[type as keyof typeof Names][lang as keyof typeof String][
        "days"
      ][data.dayIndexOfTheWeek],
      dayIndexOfTheWeek: data.dayIndexOfTheWeek,
    };

    return {
      currentDay,
      currentMonth: {
        index: data.month,
        name: Names[type as keyof typeof Names][lang as keyof typeof String][
          "months"
        ][data.month],
      },
      currentYear: data.year,
      dayIndex: data.day,
      monthIndex: data.month,
      dayIndexOfTheWeek: data.dayIndexOfTheWeek,
      startDayOfTheMonth: dayOfTheMonth(data.year, data.month),
      daysOfTheMonth: numberDaysInMonth(data.year, data.month),
    };
  };
  const stepBackward = (dayIndex: number, monthIndex: number, year: number) => {
    console.log(dayIndex);
    
    if (dayIndex === 1 && monthIndex !== 0) {
      const getMonthsDaysInPreviousMonth = numberDaysInPreviosMonth(
        year,
        monthIndex
      );
      return {
        dayIndex: getMonthsDaysInPreviousMonth,
        monthIndex: monthIndex - 1,
        year: year,
      };
    }else if(dayIndex < 1 && monthIndex !== 0){
const getMonthsDaysInPreviousMonth = numberDaysInPreviosMonth(
        year,
        monthIndex
      );
      return {
        dayIndex: getMonthsDaysInPreviousMonth +(dayIndex-1),
        monthIndex: monthIndex - 1,
        year: year,
      };
    } else if (dayIndex === 1 && monthIndex === 0) {
      const getMonthsDaysInPreviousMonth = numberDaysInPreviosMonth(
        year - 1,
        monthIndex
      );
      return {
        dayIndex: getMonthsDaysInPreviousMonth,
        monthIndex: 11,
        year: year - 1,
      };
    } else if (dayIndex < 1 && monthIndex === 0) {
      const getMonthsDaysInPreviousMonth = numberDaysInPreviosMonth(
        year - 1,
        monthIndex
      );
      return {
        dayIndex: getMonthsDaysInPreviousMonth - (dayIndex+1),
        monthIndex: 11,
        year: year - 1,
      };
    }
    
    return {
      dayIndex: dayIndex - 1,
      monthIndex: monthIndex,
      year: year,
    };
  };
  const stepForward = (dayIndex: number, monthIndex: number, year: number) => {
    if (dayIndex === numberDaysInMonth(year, monthIndex)) {
      if (monthIndex === 11) {
        return {
          dayIndex: 1,
          monthIndex: 0,
          year: year + 1,
        };
      } else {
        return {
          dayIndex: 1,
          monthIndex: monthIndex + 1,
          year: year,
        };
      }
    } else if (dayIndex >numberDaysInMonth(year, monthIndex)){
       if (monthIndex === 11) {
        return {
          dayIndex: dayIndex-(numberDaysInMonth(year, monthIndex)-1),
          monthIndex: 0,
          year: year + 1,
        };
      } else {
        return {
          dayIndex: dayIndex-(numberDaysInMonth(year, monthIndex)-1),
          monthIndex: monthIndex + 1,
          year: year,
        };
      }
    }  else {
      return {
        dayIndex: dayIndex + 1,
        monthIndex: monthIndex,
        year: year,
      };
    }
  };

  return {
    numberDaysInMonth,
    dayOfTheMonth,
    getDayName,
    getMonthName,
    fullDate,
    months,
    days,
    Names,
    currentYear: data.year,
    currentMonth: {
      index: data.month,
      name: months[data.month],
    },
    currentDay: {
      index: data.day,
      name: days[data.dayIndexOfTheWeek],
      dayIndexOfTheWeek: data.dayIndexOfTheWeek,
    },
    numberDaysInPreviosMonth,
    globalInfo,
    stepBackward,
    stepForward,
  };
};
export default useCalender;
