export const formatPrice = (price: number) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(price);
};

export const formatTime = (seconds: number) => {
  return Math.ceil(seconds / 60);
};

export const arrayToString = (arr: string[]) => {
  const string = arr
    .map((element) => {
      if (Array.isArray(element) && element.length === 0) {
        return "[]";
      } else {
        return element.toString();
      }
    })
    .join(", ");
  return "[" + string + "]";
};
