const separate = (obj, names) => {
  const pick = {};
  const unpick = {};
  if (!obj) return [pick, unpick];
  if (!names) return [pick, obj];
  const match = Array.isArray(names) ? (k) => names.includes(k) : (k) => k in names;
  for (const key in obj) {
    (match(key) ? pick : unpick)[key] = obj[key];
  }
  return [pick, unpick];
};

export default separate;
