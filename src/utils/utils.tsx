import { clsx, type ClassValue } from "clsx";
import { toast } from "react-toastify";
import { twMerge } from "tailwind-merge";
import { useSelector } from "react-redux";
import dictionary from "../dictionary/dictionary.json";
import { UserSliceType } from "../lib/redux/slices/userSlice";
import { RootState, store } from "../lib/redux/store";
import localDictionary from "../dictionary/dictionary.json";
import { FORM_ROUTES } from "../constants";
import { baseURL } from "../Api/apis";

interface Court {
  id: number;
  name: string;
}

interface VenueData {
  line_number: number;
  id: number;
  day: string;
  date: string;
  start_time: string;
  end_time: string;
  court_ids: Court[];
}

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
   export const compareTime =(time1: string, time2: string): boolean =>{
    const [h1, m1] = time1.split(":").map(Number);
    const [h2, m2] = time2.split(":").map(Number);

    if (h1 !== h2) {
        return h1 > h2;
    }
    return m1 >= m2;
}
export function swap(arr: any, index1: number, index2: number) {
  let temp = arr[index1];
  arr[index1] = arr[index2];
  arr[index2] = temp;
}

export function isNowBeforeDeadline(
  startTime: string,
  hoursToAdd: number
): boolean {
  let parsedDate: Date | null = null;

  // Try MM/DD/YYYY HH:mm:ss
  const usFormat = /^\d{2}\/\d{2}\/\d{4} \d{2}:\d{2}:\d{2}$/;
  const intlFormat = /^\d{2} \w{3} \d{4} at \d{2}:\d{2}$/;

  if (usFormat.test(startTime)) {
    parsedDate = new Date(startTime);
  } else if (intlFormat.test(startTime)) {
    const converted = startTime.replace(" at ", " ");
    parsedDate = new Date(converted);
  }

  if (!parsedDate || isNaN(parsedDate.getTime())) {
    throw new Error("Invalid date format");
  }

  const deadline = new Date(parsedDate.getTime() - hoursToAdd * 60 * 60 * 1000);
  const now = new Date();

  return now <= deadline;
}
export function getHoursSince(dateStr: string) {
  let parsedDate;

  // Try known formats manually
  if (dateStr.includes("/") && dateStr.includes(":")) {
    // Format: "MM/DD/YYYY HH:MM:SS"
    const [datePart, timePart] = dateStr.split(" ");
    const [month, day, year] = datePart.split("/").map(Number);
    const [hours, minutes, seconds] = timePart.split(":").map(Number);
    parsedDate = new Date(year, month - 1, day, hours, minutes, seconds);
  } else if (dateStr.includes("at")) {
    // Format: "11 Jul 2025 at 17:30"
    parsedDate = new Date(dateStr.replace(" at ", " "));
  } else {
    // Try native Date parsing as fallback
    parsedDate = new Date(dateStr);
  }
  //@ts-ignore
  if (isNaN(parsedDate)) {
    throw new Error("Unrecognized or invalid date format: " + dateStr);
  }

  const now = new Date();
  //@ts-ignore
  const diffMs = now - parsedDate;
  return diffMs / (1000 * 60 * 60); // milliseconds to hours
}

// Example usage:
// const d1 = "05/24/2025 22:00:00";
// console.log(getHoursSince(d1)); // Outputs number of hours between d1 and now

export const checkSelectedCourts = (
  selectedCourts: Record<string, Court[]>,
  data: VenueData[],
  setSelectedCourts: any,
  setSelectedCourtsLength: any,
  setValue: any
): void => {
  const selectedCourtsCopy = { ...selectedCourts };
  setSelectedCourtsLength(0);
  Object.keys(selectedCourtsCopy).forEach((venueId) => {
    const courts = selectedCourtsCopy[venueId];
    // Check if the current venue's selected courts array is empty
    if (courts.length === 0) {
      delete selectedCourtsCopy[venueId];
      return;
    }

    // Find the corresponding venue data
    const venueData = data.find((d) => d.id.toString() === venueId);
    if (!venueData) {
      // If no data found for the venue, delete the entry
      delete selectedCourtsCopy[venueId];
      return;
    }

    // Filter the courts to keep only those present in venueData.court_ids
    const filteredCourts = courts.filter((selectedCourt) =>
      venueData.court_ids.some((court) => court.id === selectedCourt.id)
    );

    // Update or delete the venue entry based on filtered courts
    if (filteredCourts.length === 0) {
      delete selectedCourtsCopy[venueId];
    } else {
      selectedCourtsCopy[venueId] = filteredCourts;
    }
  });
  setSelectedCourts(selectedCourtsCopy);
  setValue("available_courts", selectedCourtsCopy);
  Object.keys(selectedCourtsCopy).forEach((venueId) => {
    const courts = selectedCourtsCopy[venueId];
    //@ts-ignore
    setSelectedCourtsLength((prev) => prev + courts.length);
  });
};
export function addMinutesToTime(
  timeStr: string,
  minutes: number | string
): string {
  // Split the time string into hours and minutes
  let [hours, mins] = timeStr.split(":").map(Number);

  // Create a Date object with a reference date
  let date = new Date();
  date.setHours(hours, mins, 0, 0);

  // Add minutes
  //@ts-ignore
  date.setMinutes(date.getMinutes() + parseInt(minutes));

  // Format the result as HH:MM
  let newHours = date.getHours().toString().padStart(2, "0");
  let newMinutes = date.getMinutes().toString().padStart(2, "0");

  return `${newHours}:${newMinutes}`;
}
export function getMinutesBetweenTimes(
  startTime: string,
  endTime: string
): number {
  // Parse start and end times
  let [startHours, startMinutes] = startTime.split(":").map(Number);
  let [endHours, endMinutes] = endTime.split(":").map(Number);

  // Convert to total minutes
  let startTotalMinutes = startHours * 60 + startMinutes;
  let endTotalMinutes = endHours * 60 + endMinutes;

  // Return the difference
  return endTotalMinutes - startTotalMinutes;
}

export const convertTo12HourFormat = (time: string) => {
  const [hours, minutes] = time.split(":").map(Number);
  const period = hours >= 12 ? "PM" : "AM";
  const hours12 = hours % 12 || 12; // 12-hour format conversion
  const formattedTime = `${hours12}:${String(minutes).padStart(
    2,
    "0"
  )} ${period}`;
  return formattedTime;
};

export const convertToBase64 = async (imageUrls: string[]) => {
  const base64Images = await Promise.all(
    imageUrls.map(async (image) => { 
      if (image.startsWith("data:image")) {
        // Already a Base64 string
        
        return image;
      } else {
        // Fetch the image and convert it to Base64
        const response = await fetch(image);
        const blob = await response.blob();
        return new Promise<string>((resolve, reject) => {
          const reader = new FileReader();
          reader.onloadend = () => resolve(reader.result as string);
          reader.onerror = reject;
          reader.readAsDataURL(blob);
        });
      }
    })
  );
  return base64Images;
};

export const toastMessage = (pendingMessage = "Pending ...") => {
  return {
    pending: pendingMessage,
    success: {
      render({ data }: any) {
        return data?.message || "Successful.";
      },
    },
    error: {
      render({ data }: any) {
        console.log(data);
        if (data?.response) {
          return data?.response?.data?.message || "An error occurred";
        }
        return data?.data?.message || "An error occurred";
      },
    },
  };
};
export function convertObjectToArray(obj: any) {
  return Object.keys(obj).map((key) => {
    return {
      type: key,
      ...obj[key],
    };
  });
}
export const ImgIcon = (src: any, width?: number, height?: number) => {
  return (
    <img loading="lazy"
      width={width || 42}
      color="#1E1850"
      height={height || 42}
      alt="coache"
      src={src}
    />
  );
};

export const getImageDimensions = (
  file: File
): Promise<{ width: number; height: number }> => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    const reader = new FileReader();

    reader.onloadend = () => {
      img.onload = () => {
        resolve({ width: img.width, height: img.height });
      };
      img.onerror = reject; // Handle image load error
      img.src = reader.result as string;
    };

    reader.onerror = reject; // Handle file read error
    reader.readAsDataURL(file);
  });
};

export const ImageSizeAndDimensionChecker = (
  imgWidth: number,
  imgHeight: number,
  validWidth: number,
  validHeight: number,
  imgSize: number,
  checkDimension = false
) => {
  if (checkDimension && (imgWidth > validWidth || imgHeight > validHeight)) {
    toast.error(`image Dimension ${imgWidth} * ${imgHeight} are not valid`);
    return false;
  }

  if (imgSize > 5000000) {
    toast.error("image size is bigger than 5MB");
    return false;
  }
  return true;
};

export const formatDate = (date: Date, lang = "en") => {
  const options = { day: "numeric", month: "short", year: "numeric" };

  return date.toLocaleDateString(
    lang == "ar" ? "ar-EG-u-nu-latn" : "en-GB",
    //@ts-ignore
    options
  ); // e.g., "1 Jan 2025 or  ٢٤ أبريل 2025
};

export const splitDateTimeString = (dateTimeStr: string, lang = "en") => {
  const parts = dateTimeStr.split(" ");
  if (parts.length !== 5) {
    throw new Error("Invalid date format");
  }

  parts[3] = lang === "en" ? "at" : "الساعة";

  // Create a Date object from the input string for month formatting
  // Note: This assumes the input format is "DD MMM YYYY at HH:mm"
  const [day, monthStr, year] = parts;
  const tempDate = new Date(`${monthStr} ${day} ${year}`);

  if (isNaN(tempDate.getTime())) {
    throw new Error("Invalid date components");
  }

  return {
    day: parts[0], // "29"
    month: formatDate(tempDate, lang).split(" ")[1], // Get just the month part
    year: parts[2], // "2025"
    at: parts[3], // "at"
    time: parts[4], // "00:00"
  };
};

export const hasOverlappingHours = (workingHours: any) => {
  // Group working hours by day
  const groupedByDay: { [key: number]: { from: number; to: number }[] } = {};
  workingHours.forEach(({ days, hour_from, hour_to }: any) => {
    const from = parseInt(hour_from.replace(":", ""), 10);
    const to = parseInt(hour_to.replace(":", ""), 10);

    days.forEach((day: number) => {
      if (!groupedByDay[day]) groupedByDay[day] = [];
      groupedByDay[day].push({ from, to });
    });
  });

  // Check for overlapping intervals
  for (const day in groupedByDay) {
    const intervals = groupedByDay[day];
    intervals.sort((a, b) => a.from - b.from); // Sort by start time

    for (let i = 0; i < intervals.length - 1; i++) {
      if (intervals[i].to > intervals[i + 1].from) {
        return true; // Overlap found
      }
    }
  }

  return false; // No overlaps
};

export const resizeImage = (
  image: any,
  maxWidth: number,
  maxHeight: number,
  quality: number = 1
): Promise<string> => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.src = image;

    img.onload = () => {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");

      if (!ctx) {
        reject(new Error("Could not get canvas context"));
        return;
      }

      let newWidth = img.width;
      let newHeight = img.height;

      if (img.width > maxWidth || img.height > maxHeight) {
        const aspectRatio = img.width / img.height;

        if (img.width > img.height) {
          newWidth = maxWidth;
          newHeight = maxWidth / aspectRatio;
        } else {
          newHeight = maxHeight;
          newWidth = maxHeight * aspectRatio;
        }

        if (newHeight > maxHeight) {
          newHeight = maxHeight;
          newWidth = newHeight * aspectRatio;
        }
        if (newWidth > maxWidth) {
          newWidth = maxWidth;
          newHeight = newWidth / aspectRatio;
        }
      }

      canvas.width = newWidth;
      canvas.height = newHeight;

      ctx.drawImage(img, 0, 0, newWidth, newHeight);

      //const resizedImageUrl = canvas.toDataURL("image/jpeg", quality);
      const resizedImageUrl = canvas.toDataURL("image/jpeg", quality);
      resolve(resizedImageUrl);
    };

    img.onerror = (error) => {
      reject(new Error("Failed to load image"));
    };
  });
};

export const decreaseImageSize = (
  image: any,
  quality: number = 0.7
): Promise<string> => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.src = image;

    img.onload = () => {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");

      if (!ctx) {
        reject(new Error("Could not get canvas context"));
        return;
      }

      canvas.width = img.width;
      canvas.height = img.height;

      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

      const reducedSizeImageUrl = canvas.toDataURL("image/jpeg", quality);
      resolve(reducedSizeImageUrl);
    };

    img.onerror = (error) => {
      reject(new Error("Failed to load image"));
    };
  });
};
interface TimeSlotOptions {
  /** Interval between slots in minutes */
  step?: number;
  /** Start time in HH:mm format */
  min?: string;
  /** End time in HH:mm format */
  max?: string;
  /** Time format (12 or 24 hours) */
  format?: 12 | 24;
}

export const createTimeSlots = (
  options: TimeSlotOptions
): { label: string; value: string }[] => {
  const { step = 15, min = "00:00", max = "24:00", format = 24 } = options;

  // Validate input parameters
  if (step <= 0 || step > 1440) throw new Error("Invalid step value (1-1440)");

  // Convert times to minutes since midnight
  const toMinutes = (time: string): number => {
    const [hours, minutes] = time.split(":").map(Number);
    if (hours < 0 || hours > 24 || minutes < 0 || minutes >= 60) {
      throw new Error(`Invalid time format: ${time}`);
    }
    return hours * 60 + minutes;
  };

  const minMinutes = toMinutes(min);
  const maxMinutes = toMinutes(max);

  if (maxMinutes && minMinutes > maxMinutes)
    toast.error("Min time must be before max time");

  // Generate time slots
  const slots: { label: string; value: string }[] = [];
  let current = minMinutes;

  while (current <= maxMinutes) {
    const hours = Math.floor(current / 60);
    const minutes = current % 60;

    // Format time according to specified format
    let timeStringLabel: string;
    let timeStringValue: string;
    if (format === 12) {
      const period = hours >= 12 ? "PM" : "AM";
      const twelveHour = hours % 12 || 12; // Convert 0 to 12 for 12-hour format
      timeStringLabel = `${twelveHour}:${minutes
        .toString()
        .padStart(2, "0")} ${period}`;
      timeStringValue = `${hours.toString().padStart(2, "0")}:${minutes
        .toString()
        .padStart(2, "0")}`;
    } else {
      timeStringLabel = `${hours.toString().padStart(2, "0")}:${minutes
        .toString()
        .padStart(2, "0")}`;
      timeStringValue = `${hours.toString().padStart(2, "0")}:${minutes
        .toString()
        .padStart(2, "0")}`;
    }

    slots.push({ label: timeStringLabel, value: timeStringValue });
    current += step;
  }

  return slots;
};
export const checkPath = (path: string) => {
  let isValid = false;
  const path_list = path.split("/");
  FORM_ROUTES.forEach((route) => {
    const route_path = route.split("/");
    const result = route_path.every((value, index) => {
      if (value === "*") {
        return true;
      }
      if (value === path_list[index]) {
        return true;
      }
    });

    if (result) {
      isValid = true;
      return;
    }
  });
  return isValid;
};
export const daysEnum = {
  0: 6,
  1: 0,
  2: 1,
  3: 2,
  4: 3,
  5: 4,
  6: 5,
};
export const getWeeklyDays = (
  date: any,
  dayIndex: number,
  currentDay: any,
  numberDaysInPreviosMonth: any,
  getMonthName: any,
  numberDaysInMonth: any
) => {
  let slotDate = "";
  const orderDay = dayIndex;

  if (
    //@ts-ignore
    daysEnum[new Date(date.year, date.month, date.day).getDay()] >= orderDay
  ) {
    let month;
    let year;
    let day;
    //@ts-ignore
    if (
      Math.abs(
        //@ts-ignore
        orderDay - daysEnum[new Date(date.year, date.month, date.day).getDay()]
      ) >= date.day
    ) {
      if (date.month === 0) {
        //@ts-ignore
        day =
          numberDaysInMonth(date.year - 1, 11) -
          (Math.abs(
            orderDay -
              //@ts-ignore
              daysEnum[new Date(date.year, date.month, date.day).getDay()]
          ) -
            date.day);
        month = getMonthName(11, "En", "short");
        year = date.year - 1;
      } else {
        //@ts-ignore
        day =
          numberDaysInPreviosMonth(date.year, date.month) -
          (Math.abs(
            orderDay - //@ts-ignore
              daysEnum[new Date(date.year, date.month, date.day).getDay()]
          ) -
            date.day);
        month = getMonthName(date.month - 1, "En", "short");
        year = date.year;
      }
    } else {
      //@ts-ignore
      day =
        date.day -
        Math.abs(
          orderDay - //@ts-ignore
            daysEnum[new Date(date.year, date.month, date.day).getDay()]
        );
      month = getMonthName(date.month, "En", "short");
      year = date.year;
    }
    slotDate = `${day} ${month} ${year}`;
  } else {
    let day;
    let month;
    let year;
    //@ts-ignore
    if (
      Math.abs(
        //@ts-ignore
        orderDay - daysEnum[new Date(date.year, date.month, date.day).getDay()]
      ) +
        date.day >
      numberDaysInMonth(date.year, date.month)
    ) {
      if (date.month === 11) {
        //@ts-ignore
        day =
          Math.abs(
            orderDay -
              //@ts-ignore
              daysEnum[new Date(date.year, date.month, date.day).getDay()]
          ) +
          date.day -
          numberDaysInMonth(date.year, date.month);
        month = getMonthName(0, "En", "short");
        year = date.year + 1;
      } else {
        //@ts-ignore
        day =
          Math.abs(
            orderDay -
              //@ts-ignore
              daysEnum[new Date(date.year, date.month, date.day).getDay()]
          ) +
          date.day -
          numberDaysInMonth(date.year, date.month);
        month = getMonthName(date.month + 1, "En", "short");
        year = date.year;
      }
    } else {
      //@ts-ignore
      day =
        date.day +
        Math.abs(
          orderDay -
            //@ts-ignore
            daysEnum[new Date(date.year, date.month, date.day).getDay()]
        );
      month = getMonthName(date.month, "En", "short");
      year = date.year;
    }
    slotDate = `${day} ${month} ${year}`;
  }
  // if(currentDay.dayIndexOfTheWeek > orderDay){
  //     const deff = Math.abs(new Date(date.year,date.month,date.day).getDay() - orderDay)
  //     console.log(deff);
  //     if(deff >= date.day){
  //         const getPreviousMonthLength =date.month===0?numberDaysInPreviosMonth(date.year-1,11): numberDaysInPreviosMonth(date.year,date.month)
  //         console.log(deff,getPreviousMonthLength);
  //         console.log(getPreviousMonthLength - (deff - date.day));
  //          slotDate = `${getPreviousMonthLength - (deff - date.day)} ${date.month===0?getMonthName(11, "En", "short"):getMonthName(date.month-1, "En", "short")} ${date.year}`

  //     }else{
  //         slotDate = `${date.day - deff} ${getMonthName(date.month, "En", "short")} ${date.year}`
  //     }

  // }else if(currentDay.dayIndexOfTheWeek < orderDay){
  //     const deff = Math.abs(new Date(date.year,date.month,date.day).getDay() - orderDay)
  //     const dayInTheMonth= numberDaysInMonth(date.year,date.month)
  //     console.log(date.day);
  //     console.log((deff + date.day) > dayInTheMonth);

  //     if((deff + date.day) > dayInTheMonth){
  //         const getNextMonthLength =date.month===11?numberDaysInPreviosMonth(date.year+1,0): numberDaysInPreviosMonth(date.year,date.month+1)
  //         slotDate = `${getNextMonthLength - (deff + date.day - dayInTheMonth)} ${getMonthName(date.month+1, "En", "short")} ${date.year}`
  //     }else{
  //         slotDate = `${date.day + deff} ${date.month===11?getMonthName(0, "En", "short"):getMonthName(date.month, "En", "short")} ${date.year}`
  //     }

  // }else{
  //     slotDate = `${date.day} ${getMonthName(date.month, "En", "short")} ${date.year}`
  // }
  return slotDate.replace("Sept", "Sep");
};

export interface PlayersSplit {
  current: string; // "0"
  max: string; // "16"
  suffix?: string; // "Players" (optional)
}

export const splitPlayersString = (playersStr: string): PlayersSplit => {
  // Split by '/' first
  const [currentMax, suffix] = playersStr.split(/(?=\s)/); // Split at space but keep the space
  const [current, max] = currentMax.split("/");

  return {
    current: current.trim(),
    max: max.trim(),
    suffix: suffix?.trim(),
  };
};
export const getTeamPosition =(teamId:number,nextStageData:any,test:any={})=>{

        if(nextStageData?.team_line_ids[0]?.team_id?.id === teamId){
          return 0
        }else{
          return 1
        }
          
          
          
}
export const isInTheFirst = (teamId:number,nextStageData:any,test:any={})=>{
  console.log(teamId);
  console.log(nextStageData);
  
  console.log(nextStageData?.team_line_ids);
  
        if(nextStageData?.team_line_ids[0]?.team_id?.id === teamId){
          return true
        }else{
          return false
        }
          
          
          
}
export const EmailValidate =
  /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.(com|org|net|info|biz|xyz|online|site|tech|store|app|dev|blog|cloud|space|design|art|live|media|news|agency|digital|guru|club|pro|edu|gov|mil|int|jobs|museum|aero|coop|post|travel|us|uk|ca|au|de|fr|es|it|nl|ru|cn|jp|in|br|kr|ae|za|ch|se|no|fi|dk|be|pl|cz|mx|ar|co|sg|hk|nz|io|ai|tv|me|test|example|invalid|localhost|cc)$/i;

export function toBoolean(value: string | boolean | undefined | null): boolean {
  return value === true || value === "true";
}
