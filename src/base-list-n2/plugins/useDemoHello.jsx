function useDemoHello(instance, props) {
  return {
    head: (
      <div>
        <span>hello {props.name}</span>
      </div>
    ),
  };
}

export default useDemoHello;
