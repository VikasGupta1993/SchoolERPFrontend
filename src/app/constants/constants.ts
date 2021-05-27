export const PAGE_OPTIONS = {
  page: 1,
  limit: 10,
};

export const COMMON_PATH = {
  LIST: "list",
  ADD: "add",
  DETAILS: "details",
};

export const PANO_FILE_CONFIG = {
  accept: "image/jpeg,image/png",
  maxSize: 25,
};

export const MY_FORMATS = {
  parse: {
    dateInput: "ll",
  },
  display: {
    dateInput: "ll",
    monthYearLabel: "MMM YYYY",
    dateA11yLabel: "ll",
    monthYearA11yLabel: "MMMM YYYY",
  },
};

export const DATE_FORMATS = {
  DATE_WITH_TIME: "d MMMM y h:mm a",
  NOTIFY_DATE: "d MMMM y h:mm",
  ONLY_DATE: "d MMMM y",
  ONLY_TIME: "h:mma",
};

export enum NOTIFICATION_MODULE {
  DELETE = "DELETE",
  IMMEDIATELY = "IMMEDIATELY",
  SEND_LATER = "SEND_LATER",
  TIME_END = "TIME_END",
}

export const NOTIFICATION_MODULE_POPUP_MESSAGE = {
  [NOTIFICATION_MODULE.IMMEDIATELY]: {
    title: "Confirm Delivery",
    message:
      "This notification will be sent immediately to selected audience. You will not be able to edit this notification once sent.",
    confirmButtonText: "Send Now",
    cancelButtonText: "Cancel",
  },
  [NOTIFICATION_MODULE.SEND_LATER]: {
    title: "SEND_LATER",
    message: "SEND_LATER",
    confirmButtonText: "SEND LATER",
    cancelButtonText: "CANCEL",
  },
  [NOTIFICATION_MODULE.TIME_END]: {
    title: "TIME_END",
    message: "TIME_END",
    confirmButtonText: "OKAY",
    cancelButtonText: "CANCEL",
  },
};

export const NOTIFICATION_TABS = [
  { name: "Drafts" },
  { name: "Sent" },
  { name: "Upcoming" },
];

export const POPUP_MESSAGE = (entity, POPUP_MESSAGE_TYPE) => {
  switch (POPUP_MESSAGE_TYPE) {
    case "add":
      return `${entity} added successfully`;
    case "delete":
      return `${entity} has been successfully deleted`;
    case "edit":
      return `${entity}  updated successfully  `;
  }
};
