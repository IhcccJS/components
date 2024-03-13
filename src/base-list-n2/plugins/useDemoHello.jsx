function useDemoHello(instance, props) {
  console.log('hello update!');

  return {
    head: (
      <div>
        <span>hello {props.name}</span>
      </div>
    ),
  };
}

export default useDemoHello;
