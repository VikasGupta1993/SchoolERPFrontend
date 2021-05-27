export const PATTERN = {
  email: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
  password: /^[^\s]+$/,
  // name: /(.|\s)*\S(.|\s)*/,
  name: /^[^-`@~\s][a-zA-Z0-9\s-]+$/,
  alphaNumericString: /^[a-zA-Z0-9\.]*$/,
  phone: "^[0-9]+$",
  price: /(^[0][1-9]+)|([1-9]\d*)+$/,
  removeHTML: /<[^>]*>/g,
  url: /(.|\s)*\S(.|\s)*/,
  passwordMetrics: /^(?=.*?[A-Z])(?=.*?[0-9]).*$/,
  onlyChar: /^[a-z A-Z\s]*$/,
  multipleEmails: /^(\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]{2,4}\s*?,?\s*?)+$/,
};

export const PASSWORD_METRICS = {
  oneDigit: new RegExp("[0-9]"),
  oneLower: new RegExp("(?=.*[a-z])"),
  oneUpper: new RegExp("(?=.*[A-Z])"),
  lengthEight: new RegExp("[a-zA-Z0-9]{8,}"),
  oneSpecial: new RegExp('[!@#$%^&*(),.?":{}|<>]'),
};
