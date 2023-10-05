export const adminCheck = (userId: string | null) => {
  return userId === process.env.ADMIN_ID;
};
