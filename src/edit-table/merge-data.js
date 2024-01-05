function mergeData(target, source) {
  const result = [...target];
  if (!source) return result;

  for (const key in source) {
    const newRow = Object.assign({}, result[key], source[key]);
    if (key < 0) {
      result.unshift(newRow);
    } else if (key < result.length) {
      result[key] = newRow;
    } else {
      result.push(newRow);
    }
  }

  return result;
}

export default mergeData;
