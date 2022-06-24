import Validate from "validate.js";

export const requiredValidation = {
  presence: {
    allowEmpty: false,
    message: "is required.",
  },
};

export function textValidation(length) {
  return {
    presence: {
      allowEmpty: false,
      message: "is required.",
    },
    length: {
      maximum: length,
    },
  };
}

export function numberValidation() {
  return {
    presence: {
      allowEmpty: false,
      message: "is required.",
    },
    // length: {
    //   maximum: 6,
    // },
    format: {
      pattern: "[0-9]+",
      flag: "i",
      message: "can only contain number",
    },
  };
}

export function numberRangeValidation(num1, num2) {
  return {
    presence: {
      allowEmpty: false,
      message: "is required.",
    },
    numericality: {
      onlyInteger: true,
      greaterThanOrEqualTo: num1,
      lessThanOrEqualTo: num2,
      message: "must be between 0-100",
    },
  };
}

export function number2Validation(length) {
  return {
    presence: {
      allowEmpty: false,
      message: "is required.",
    },
    length: {
      minimum: length,
      maximum: length,
    },
  };
}

export function dateValidation() {
  return {
    presence: {
      allowEmpty: false,
      message: "is required.",
    },
    datetime: {
      dateOnly: true,
      earliest: "1970-01-01",
      latest: new Date().toISOString().slice(0, 10),
      message: "Invalid Date range !",
    },
  };
}

export function dateValidation2() {
  return {
    presence: {
      allowEmpty: false,
      message: "is required.",
    },
    datetime: {
      dateOnly: true,
      // earliest: "1970-01-01",
      earliest: new Date().toISOString().slice(0, 10),
      message: "Invalid Date range !",
    },
  };
}

export function passwordtValidation(min, max) {
  return {
    presence: {
      allowEmpty: false,
      message: "is required.",
    },
    length: {
      minimum: min,
      maximum: max,
    },
  };
}

export const emailValidation = {
  presence: {
    allowEmpty: false,
    message: "is required",
  },
  format: {
    pattern:
      // eslint-disable-next-line no-useless-escape
      /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i,
    flags: "i",
    message: "is not valid Email",
  },
  length: {
    maximum: 40,
  },
};

export const gstValidation = {
  presence: {
    allowEmpty: false,
    message: "is required",
  },
  format: {
    pattern:
      // eslint-disable-next-line no-useless-escape
      /\d{2}[A-Z]{5}\d{4}[A-Z]{1}[A-Z\d]{1}[Z]{1}[A-Z\d]{1}/,
    flags: "i",
    message: "is not valid GST NO",
  },
};

export const phoneNoValidation = {
  presence: {
    allowEmpty: false,
    message: "is required.",
  },
  length: {
    minimum: 10,
    maximum: 10,
  },
  format: {
    pattern: "[0-9]+",
    flag: "i",
    message: "can only contain number",
  },
};

// only allow 10 digits
export function phoneNoLenght(e, name) {
  if (e.target.name === name && String(e.target.value).length > 10) {
    return true;
  }
}

export function dateSchema() {
  return Validate.extend(Validate.validators.datetime, {
    parse: function (value, options) {
      return new Date(value).valueOf();
    },
    // Input is a unix timestamp
    format: function (value, options) {
      return new Date(value);
    },
  });
}
