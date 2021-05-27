// import { toTitleCase } from "./messages";
import { toTitleCase } from "./message.constants";
import { PATTERN } from "./patterns";

export const PATTERN_ERRORS = (pattern, key) => {
  if (pattern == PATTERN.email) {
    return `Please enter a valid ${key.toLowerCase()}`;
  }
  if (pattern == PATTERN.password) {
    return `${toTitleCase(key)} can not contain blank spaces`;
  }
  if (pattern == PATTERN.name) {
    return `Please enter a valid ${key.toLowerCase()}`;
  }

  if (pattern == PATTERN.phone) {
    return `${toTitleCase(key)} must contain only digits`;
  }
  if (pattern == PATTERN.price) {
    return `${toTitleCase(key)} must be numeric`;
  }
  if (pattern == PATTERN.passwordMetrics) {
    return `${toTitleCase(
      key
    )}  must contain at least  1 number, 1 uppercase character`;
  }
};
