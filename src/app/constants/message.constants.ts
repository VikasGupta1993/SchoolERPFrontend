export const MESSAGES = {
  ERROR: {
    $401: "Your session is expired, please login again.",
    $404: "Resource not found",
    $500: "Something went wrong, Please try again later!",
    $504: "Slow internet connection",
    UNKNOWN: "Something went wrong on server"
  },
  NAVIGATION: {
    NOT_FOUND: "Navigation error occured"
  },
  OFFLINE: "You are offline, please connect to internet and retry"
};

export const TOAST_MESSAGES = {

  OLD_PASSWORD_INCORRECT: "Old password entered is incorrect.",
  POLLING_DELETE : "Polling Deleted Successfully!",
  VERSION_UPDATE: "Version Updated Successfully!",
  VERSION_DELETE: "Version Deleted Successfully!",
  ERROR_DELETE: "Error Deleted Successfully!",
  PASSWORD_NOT_MATCH: "Password doesnot Match.",
  EMAIL_SENT: "Email sent successfully .",
  ADMIN_NOT_FOUND: "Admin not found with specified email.",
  PROFILE_UPDATE_SUCCESS: "Profile Updated Successfully !",
  PASSWORD_UPDATE_SUCCESS: "Password Updated Successfully !",
  TIMEOUT_ERROR: "Timeout Error",
  NO_USER: "User not found!",
  CATEGORY_SELECT: 'You cannot select more than 5 categories!',
  MEMBER_SELECT: 'You cannot select more than 4 Team Members!',
  NO_CHANGES: "Please change a value to update.",
  FAQ_DELETE: "FAQ Deleted successfully",
  UPDATE_CONTENT: "Content Updated Successfully",
  ADD_CONTENT: "Content Added Successfully",
  S3_BUCKET_ERROR: 'Network Failure or Sync up your system clock',

};

export const VALIDATION_MESSAGES = {
  'confirm password': {
    matchPassword: 'Confirm password is not matched with password'
  }
};
export const POPUP_MESSAGES = {
  ADD_WATCH_LIST:'are you sure want to add in watchlist',
  ResendOtp:'Are you sure you want to send OTP again?',
  ok: 'Ok',
  close: 'Close',
  confrim: 'Confirmation',
  no: 'No',
  yes: 'Yes',
  cancel: 'Cancel',
  save: 'Save',
  passwordResetTitle: 'Reset Password',
  passwordResetLink: 'Password reset link has been sent to registered email id . Please follow the link to reset password .',
  profileEdited: 'Profile has been Edited successfully.',
  passwordChanged: 'Password has been changed successfully.',
  passwordChangedTitle: 'Change Password',
  invalidResetPasswordLink: 'Reset password link is expired',
  logout: 'Logout',
  Import: 'Import',
  logoutSuccessfully: 'Admin Logout Successfully!',
  logoutConfirmation: 'Do you wish to logout?',
  // tslint:disable-next-line: max-line-length
  forgotPasswordTitle: 'Forgot Your Password? Don\'t worry send us your registered email address and we will send yousteps to reset your password.',
  importFile: 'Are you sure you want to import selected file?',
};

// export const invalidImageError = (format = 'jpeg/png') => `Only ${format} images are allowed`;

// export const invalidFileSize = (size = 4) => `File size can not be more than ${size} MB`;

// export const COMMON_MESSAGES = {
//   ADDED: (type) => toTitleCase(type) + ' has been added successfully',
//   UPDATED: (type) => toTitleCase(type) + ' has been updated successfully',
//   BLOCKED: {
//     confirm: (type) => `Do you want to block this ${type.toLowerCase()}?`,
//     success: (type) => `${toTitleCase(type)} has been blocked successfully`
//   },
//   ACTIVE: {
//     confirm: (type) => `Do you want to unblock this ${type.toLowerCase()}?`,
//     success: (type) => `${toTitleCase(type)} has been unblocked successfully`
//   },
//   DELETED: {
//     confirm: (type) => `Do you want to delete this ${type.toLowerCase()}?`,
//     success: (type) => `${toTitleCase(type)} has been deleted successfully`
//   }
// };

// export const SOMETHING_WENT_WRONG = 'Something went wrong , Please try again later.';

// export const toTitleCase = (str) => {
//   return str.replace(
//     /\w\S*/g,
//     // tslint:disable-next-line: only-arrow-functions
//     function (txt) {
//       return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
//     }
//   );
// };

export const MAP_LOCATION_ERROR = 'Oops! Something went wrong. Please select location';
export const DATA_NOT_FOUND = 'Data not found';


export const FILTER_STATUS_TYPE = [
  { name: 'Daily', value: 'DAILY' },
  { name: 'Weekly', value: 'WEEKLY' },
  { name: 'Overall', value: 'OVERALL' }
]

export const DAYS_LIST = (IN_NUMBER = true) => [
  { name: 'Monday', value: IN_NUMBER ? 1 : 'Mon' },
  { name: 'Tuesday', value: IN_NUMBER ? 2 : 'Tue' },
  { name: 'Wednesday', value: IN_NUMBER ? 3 : 'Wed' },
  { name: 'Thursday', value: IN_NUMBER ? 4 : 'Thu' },
  { name: 'Friday', value: IN_NUMBER ? 5 : 'Fri' },
  { name: 'Saturday', value: IN_NUMBER ? 6 : 'Sat' },
  { name: 'Sunday', value: IN_NUMBER ? 7 : 'Sun' }
]



// export const VALIDATION_MESSAGES = {
//   END_SCHEDULE:
//     "Cannot send the notification as delivery time has already passed. Please edit it.",
// };

// export const TOAST_MESSAGES = {
//   FILE_TYPE_ERROR: "You can upload only pdf, docx,  jpg, png files",
//   FILE_SIZE_ERROR: "File size should be less than or equal to 25 Mb",
// };

// export const POPUP_MESSAGES = {
//   ok: "Ok",
//   close: "Close",
//   confrim: "Confirmation",
//   no: "No",
//   yes: "Yes",
//   cancel: "Cancel",
//   save: "Save",
//   sendNow: "Send Now",
//   deleteNow: "Delete Now",
//   passwordResetTitle: "Reset Password",
//   BLOCK: "Block",
//   UNBLOCK: "Unblock",
//   passwordResetLink:
//     "Password reset link has been sent to registered email id . Please follow the link to reset password .",
//   passwordChanged: "Password has been changed successfully.",
//   logout: "Confirmation",
//   deliveryConfirmation: "Confirm Delivery",
//   deleteConfirmation: "Delete Notification",
//   deleteUserTitle: "Delete User",
//   unblockTitle: "Active User",
//   unblockMessage: "Are you sure you want to Activate this user?",
//   unblockButton: "Activate",
//   blockTitle: "Deactivated User",
//   blockMessage: "Are you sure you want to Deactivate this user?",
//   blockButton: "Deactivate",
//   deleteNotification:
//     "Are you sure you want to delete this notification? Once deleted you will not be able to recover it.",
//   deleteUser:
//     "Are you sure you want to delete this user? Once deleted you will need not be able to undo this action.",
//   logoutConfirmation: "Are you sure you want to logout?",
//   sendNowMessage:
//     "This notification will be sent immediately to selected audience. You will not be able to edit this notification once sent.",
//   forgotPasswordTitle:
//     "Forgot Your Password? Don't worry send us your registered email address and we will send yousteps to reset your password.",
//   deleteProperty: "Are you sure you want to delete this?",

//   BLOCK_USER: "Are you sure you want to block this user?",
//   UNBLOCK_USER: "Are you sure you want to unblock this user?",
//   BLOCK_CONTENT: "Are you sure you want to lock this ?",
//   UNBLOCK_CONTENT: "Are you sure you want to unlock this ?",
//   SEND_REPORT: "Are you sure you want to send report ?",
//   DELTE_DOC_REPO: "Are you sure you want to delete this document repository ?",
// };
export const CHANGE_STATUS_DOC_REPO = (status: boolean) =>
  status
    ? "Are you sure you want to lock this document repository ?"
    : "Are you sure you want to unlock this document repository ?";
export const invalidImageError = (format = "jpeg/png") =>
  `Only ${format} images are allowed`;
export const invalidFileSize = (size = 5) =>
  `File size can not be more than ${size} MB`;

export const COMMON_MESSAGES = {
  ADDED: (type) => toTitleCase(type) + " has been added successfully",
  UPDATED: (type) => toTitleCase(type) + " has been updated successfully",
  BLOCKED: {
    confirm: (type) => `Do you want to block this ${type.toLowerCase()}?`,
    success: (type) => `${toTitleCase(type)} has been blocked successfully`,
  },

  ACTIVE: {
    confirm: (type) => `Do you want to unblock this ${type.toLowerCase()}?`,
    success: (type) => `${toTitleCase(type)} has been unblocked successfully`,
  },
  INACTIVE: {
    confirm: (type) => `Do you want to inactivate this ${type.toLowerCase()}?`,
    success: (type) => `${toTitleCase(type)} has been inactivated successfully`,
  },
  ACTIVATED: {
    confirm: (type) => `Do you want to activate this ${type.toLowerCase()}?`,
    success: (type) => `${toTitleCase(type)} has been activated successfully`,
  },

  DEACTIVE: {
    confirm: (type) => `Do you want to deactivate this ${type.toLowerCase()}?`,
    success: (type) => `${toTitleCase(type)} has been deactivated successfully`,
  },
  DELETED: {
    confirm: (type) => `Do you want to delete this ${type.toLowerCase()}?`,
    success: (type) => `${toTitleCase(type)} has been deleted successfully`,
  },
  VERIFY: {
    confirm: (type) => `Do you want to verify this ${type.toLowerCase()}?`,
    success: (type) => `${toTitleCase(type)} has been verified successfully`,
  },
};

export const SOMETHING_WENT_WRONG =
  "Something went wrong , Please try again later.";
export const IS_AGREE = "Please accept terms & conditions before you proceed.";
export const SAME_PASS_ERROR =
  "Your old password & new password can't be the same";
export const S3_BUCKET_ERROR = "Network Failure or Sync up your system clock";
export const INVALID_ID_ERROR = "Invalid ID";
export const MIN_RECORD = "Please select atleast one record to delete";

export const toTitleCase = (str) => {
  return str.replace(/\w\S*/g, function (txt) {
    return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
  });
};

export const toLowerCase = (str) => {
  return str.replace(/\w\S*/g, (txt) => {
    return txt.charAt(0).toLowerCase() + txt.substr(1).toLowerCase();
  });
};

export const DATE_TYPES = {
  SHORT_TIME: "h:mm a",
  MEDIUM_DATE: "MMM d, yyyy",
  FULL_DATE: "EE, MMM d, yyyy",
  VALIDITY_TIME: "MMM d, y - hh:mm:ss a",
  DATE_WITH_TIME: "MMM d, y - hh:mm a",
};

export const HOUSE_TYPE = [
  { name: "Flat / Apartment", value: 0 },
  { name: "House", value: 1 },
  { name: "Bungalow", value: 2 },
  { name: "Commercial Unit", value: 3 },
  { name: "Other", value: 4 },
];

export const DETACHEMENT_TYPE = [
  { name: "N / A", value: 0 },
  { name: "Detached", value: 1 },
  { name: "Semi Detached", value: 2 },
  { name: "Terrace", value: 3 },
  { name: "Link Detached", value: 4 },
  { name: "End Terrace", value: 5 },
];

export const METER_TYPE = [
  { name: "Gas Meter Reading", value: 0 },
  { name: "Electric Meter Reading", value: 1 },
  { name: "Water Meter Reading", value: 2 },
  { name: "Heat Meter Reading", value: 3 },
  { name: "Oil Meter Reading", value: 4 },
  { name: "Aircon Meter Reading", value: 5 },
  { name: "Other Meter Reading", value: 6 },
  { name: "Stopcock", value: 7 },
  { name: "Fuse Box", value: 8 },
];

export const MANUALS_RECEIPTS = [
  { name: "Manuals", value: 1 },
  { name: "Receipts", value: 2 },
  { name: "Other Documents", value: 3 },
];

export const MANUALS_RECEIPTS_TYPE = [
  { name: "Boiler", value: 0 },
  { name: "Oven", value: 1 },
  { name: "Hob", value: 2 },
  { name: "Toaster", value: 3 },
  { name: "Kettle", value: 4 },
  { name: "Cooker Hood", value: 5 },
  { name: "Washing Machine", value: 6 },
];
