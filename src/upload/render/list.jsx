function Base({ children }) {
  return <div>{children}</div>;
}

function Trigger() {
  return <Base>+</Base>;
}

function Preview() {
  return <Base>文件</Base>;
}

export { Trigger, Preview };
