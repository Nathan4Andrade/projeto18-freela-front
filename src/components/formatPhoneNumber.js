export default function formatPhoneNumber(phoneNumber) {
  if (phoneNumber) {
    const formattedPhoneNumber =
      phoneNumber.length === 10
        ? `(${phoneNumber.slice(0, 2)}) ${phoneNumber.slice(
            2,
            6
          )}-${phoneNumber.slice(6)}`
        : `(${phoneNumber.slice(0, 2)}) ${phoneNumber.slice(
            2,
            7
          )}-${phoneNumber.slice(7)}`;

    return formattedPhoneNumber;
  }
}
