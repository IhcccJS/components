import React from 'react';
import useUnmountedRef from 'ahooks/lib/useUnmountedRef';
import debounce from 'lodash/debounce';
import clsx from 'clsx';

const LayoutContext = React.createContext({});

function PageResize(props) {
  const {
    className,
    header,
    align = 'both',
    designWidth = 1920,
    designHeight = 1080,
    resizeDelay = 1000,
    children,
    style,
    contentStyle,
  } = props;
  const [scale, setScale] = React.useState([1, 1]);
  const [zoom, setZoom] = React.useState(1);
  const unmountedRef = useUnmountedRef();

  const onPageResize = React.useCallback(
    debounce(() => {
      const zoomSize = window.devicePixelRatio > 1 ? 1 / window.devicePixelRatio : 1;
      setZoom(zoomSize);
      const rw = document.body.clientWidth || window.screen.width;
      const rh = document.body.clientHeight || window.screen.height;
      let scale = [1, 1];
      if (align === 'width') {
        scale = [rw / designWidth, 1];
      } else if (align === 'height') {
        scale = [1, rh / designHeight];
      } else if (align === 'both') {
        scale = [rw / designWidth, rh / designHeight];
      } else if (align === 'auto') {
        if (rw / designWidth < rh / designHeight) {
          scale = [rw / designWidth, 1];
        } else {
          scale = [1, rh / designHeight];
        }
      }
      if (window.devicePixelRatio > 1) {
        scale[0] *= window.devicePixelRatio;
        scale[1] *= window.devicePixelRatio;
      }
      // scale[0] = decimal(scale[0], 4);
      // scale[1] = decimal(scale[1], 4);
      setScale(scale);
    }, resizeDelay),
    [],
  );

  React.useEffect(() => {
    if (unmountedRef.current) return;
    onPageResize();

    window.addEventListener('resize', onPageResize);
    return () => {
      window.removeEventListener('resize', onPageResize);
    };
  }, []);

  return (
    <LayoutContext.Provider value={{}}>
      <div
        className={clsx('bc-page-resize-body', className)}
        style={{
          ...style,
          // width: window.screen.width,
          // height: window.screen.height,
        }}
      >
        <div
          className="bc-page-resize-container"
          style={{
            ...contentStyle,
            width: designWidth,
            height: designHeight,
            transform: `scale(${scale[0]}, ${scale[1]})`,
            zoom,
          }}
        >
          {header}
          {children}
        </div>
      </div>
    </LayoutContext.Provider>
  );
}

PageResize.LayoutContext = LayoutContext;

export default PageResize;
