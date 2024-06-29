//   validation

export const formvalidation = {
  cardNumber: {
    required: {
      value: true,
      message: "Card number is required",
    },
    minLength: {
      value: 16,
      message: "Card number must be 16 digits",
    },
    maxLength: {
      value: 16,
      message: "Card number must be 16 digits",
    },
  },
  accountHolderName: {
    required: {
      value: true,
      message: "Account holder name is required",
    },
  },
  cvv: {
    required: {
      value: true,
      message: "CVV is required",
    },
    minLength: {
      value: 3,
      message: "CVV must be 3 digits",
    },
    maxLength: {
      value: 3,
      message: "CVV must be 3 digits",
    },
  },
  expiryDate: {
    required: {
      value: true,
      message: "Expiry date is required",
    },
  },
  // expiryDate: {
  //   required: {
  //     value: true,
  //     message: "Expiry date is required",
  //   },
  //   pattern: {
  //     value: /^(0[1-9]|1[0-2])\/(20\d{2})$/,
  //     message: "Expiry date must be in the format MM/YYYY",
  //   },
  // },
  email: {
    required: {
      value: true,
      message: "Email is required",
    },
  },
  amount: {
    required: {
      value: true,
      message: "Amount is required",
    },
  },
};

export const formvalidation3 = {
  otp: {
    required: {
      value: true,
      message: " Enter You OTP ",
    },
    minLength: {
      value: 4,
      message: "number must be 6 digits",
    },
    maxLength: {
      value: 6,
      message: "number must be 6 digits",
    },
  },
};

export const formvalidation2 = {
  pin: {
    required: {
      value: true,
      message: " Enter You PIN ",
    },
    minLength: {
      value: 4,
      message: "number must be atleast 4 digits",
    },
    maxLength: {
      value: 8,
      message: "number must be 8 digits",
    },
  },
};

export const formvalidation4 = {
  city: {
    required: {
      value: true,
      message: "City is required",
    },
  },
  address: {
    required: {
      value: true,
      message: "Address is required",
    },
  },
  state: {
    required: {
      value: true,
      message: "State is required",
    },
  },

  country: {
    required: {
      value: true,
      message: "Country is required",
    },
  },

  zipcode: {
    required: {
      value: true,
      message: "Zipcode is required",
    },
  },
};
