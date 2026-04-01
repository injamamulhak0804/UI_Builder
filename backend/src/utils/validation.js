export const isvalidateZentoraData = (data) => {
  if (!data.name) return false;
  if (!data.email) return false;
  return true;
};