import React from 'react';
import { useThrottleFn } from 'ahooks';
import { getScrollParent } from './get-scroll-parent';

function isWindow(element) {
  return element === window;
}

const LazyRender = React.forwardRef(function LazyRender(
  { disabled, threshold, onEnter, children, ...restProps },
  ref,
) {
  const signleMode = React.useRef(!!children).current;
  const elementRef = React.useRef(ref);
  const [inView, setInView] = React.useState(disabled);

  const [scrollParent, setScrollParent] = React.useState();

  const [flag, setFlag] = React.useState({});
  const nextFlagRef = React.useRef(flag);

  const { run: check } = useThrottleFn(
    async () => {
      if ((signleMode && inView) || disabled) return;
      if (nextFlagRef.current !== flag) return;
      const element = elementRef.current;
      if (!element) return;
      if (!element.offsetParent) return;
      const parent = getScrollParent(element);
      if (!parent) return;
      setScrollParent(parent);
      const rect = element.getBoundingClientRect();
      const elementTop = rect.top;
      const current = isWindow(parent)
        ? window.innerHeight
        : parent.getBoundingClientRect().bottom;
      if (current >= elementTop - threshold) {
        const nextFlag = {};
        nextFlagRef.current = nextFlag;
        setInView(true);
        onEnter && onEnter();
        setFlag(nextFlag);
      }
    },
    {
      wait: 100,
      leading: true,
      trailing: true,
    },
  );

  React.useEffect(() => {
    check();
  });

  React.useEffect(() => {
    const element = elementRef.current;
    if (!element) return;
    if (!scrollParent) return;
    function onScroll() {
      check();
    }
    scrollParent.addEventListener('scroll', onScroll);
    return () => {
      scrollParent.removeEventListener('scroll', onScroll);
    };
  }, [scrollParent]);

  return (
    <div ref={elementRef} {...restProps}>
      {inView || disabled ? children : void 0}
    </div>
  );
});

LazyRender.defaultProps = {
  disabled: false,
  threshold: 250,
};

export default LazyRender;
