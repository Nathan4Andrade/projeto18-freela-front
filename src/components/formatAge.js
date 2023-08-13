export default function formatAge(months) {
  const years = Math.floor(months / 12);
  const remainingMonths = months % 12;

  if (years === 0) {
    return `${remainingMonths} meses`;
  } else if (remainingMonths === 0) {
    return `${years} ano${years === 1 ? "" : "s"}`;
  } else {
    return `${years} ano${years === 1 ? "" : "s"} e ${remainingMonths} mes${
      remainingMonths === 1 ? "" : "es"
    }`;
  }
}
