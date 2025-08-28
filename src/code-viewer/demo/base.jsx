import { CodeViewer } from '@ihccc/components';

import hljs from 'highlight.js/lib/core';
// import json from 'highlight.js/lib/languages/json';
// import css from 'highlight.js/lib/languages/css';
import js from 'highlight.js/lib/languages/javascript';
// import xml from 'highlight.js/lib/languages/xml';
// import sql from 'highlight.js/lib/languages/sql';
import 'highlight.js/styles/atom-one-dark.min.css';
// import 'highlight.js/styles/github-dark-dimmed.min.css';

// hljs.registerLanguage('json', json);
// hljs.registerLanguage('css', css);
hljs.registerLanguage('js', js);
// hljs.registerLanguage('xml', xml);
// hljs.registerLanguage('sql', sql);

const code = `import { PointLayer, Scene } from '@antv/l7';
import { GaodeMap } from '@antv/l7-maps';

const scene = new Scene({
  id: 'map',
  map: new GaodeMap({
    style: 'light',
    center: [121.435159, 31.256971],
    zoom: 14.89,
    minZoom: 10,
  }),
});
scene.on('loaded', () => {
  fetch('https://gw.alipayobjects.com/os/basement_prod/893d1d5f-11d9-45f3-8322-ee9140d288ae.json')
    .then((res) => res.json())
    .then((data) => {
      const pointLayer = new PointLayer({})
        .source(data, {
          parser: {
            type: 'json',
            x: 'longitude',
            y: 'latitude',
          },
        })
        .shape('name', [
          'circle',
          'triangle',
          'square',
          'pentagon',
          'hexagon',
          'octogon',
          'hexagram',
          'rhombus',
          'vesica',
        ])
        .size('unit_price', [10, 25])
        .active(true)
        .color('name', ['#5B8FF9', '#5CCEA1', '#5D7092', '#F6BD16', '#E86452'])
        .style({
          opacity: 0.3,
          strokeWidth: 2,
        });

      scene.addLayer(pointLayer);
    });
});
`;

function Demo() {
  return <CodeViewer lang="js" value={code} style={{ height: 480, overflow: 'auto' }} />;
}

export default Demo;
