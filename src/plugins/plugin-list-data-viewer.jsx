import React from 'react';
import { createJSONEditor } from 'vanilla-jsoneditor';
import { definePlugin } from '@/components/@comp/create-component';
function filterUnchangedProps(props, prevProps) {
  return Object.fromEntries(Object.entries(props).filter(([key, value]) => value !== prevProps[key]));
}

function SvelteJSONEditor(props) {
  const refContainer = React.useRef(null);
  const refEditor = React.useRef(null);
  const refPrevProps = React.useRef(props);

  React.useEffect(() => {
    refEditor.current = createJSONEditor({
      target: refContainer.current,
      props,
    });

    return () => {
      if (refEditor.current) {
        refEditor.current.destroy();
        refEditor.current = null;
      }
    };
  }, []);

  React.useEffect(() => {
    if (refEditor.current) {
      const changedProps = filterUnchangedProps(props, refPrevProps.current);
      refEditor.current.updateProps(changedProps);
      refPrevProps.current = props;
    }
  }, [props]);

  return <div className="vanilla-jsoneditor-react" ref={refContainer}></div>;
}

export default definePlugin({
  name: 'listJsonDataViewer',
  priority: 'CONTENT',
  props: [],
  main(instance, _props) {
    // const { jsonDataViewer = {} } = props;

    const { request } = instance.getPlugin('request');

    const jsonDataString = React.useMemo(() => {
      return { json: request.data, text: null };
    }, [request.data]);

    const content = (
      <SvelteJSONEditor
        content={jsonDataString}
        onChange={(e) => {
          try {
            const data = JSON.parse(e.text);
            request.setData(data);
          } catch (error) {}
        }}
      />
    );

    return { children: content };
  },
});
