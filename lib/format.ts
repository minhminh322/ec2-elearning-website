export const formatPrice = (price: number) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(price);
};

export const formatTime = (seconds: number) => {
  return Math.ceil(seconds / 60);
};
