const showFormattedDate = (date, type) => {
  const options = {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  };
  return new Date(date).toLocaleDateString(type, options);
};

export { showFormattedDate };
