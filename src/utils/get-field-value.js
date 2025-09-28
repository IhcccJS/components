function getValue(valuePropName, event) {
  if (event && event.target && typeof event.target === 'object' && valuePropName in event.target) {
    return event.target[valuePropName];
  }
  return event;
}

export default getValue;
