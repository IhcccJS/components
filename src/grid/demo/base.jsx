import React from 'react';
import { Grid } from '@ihccc/components';
import Block from './block';

const list = [
  { key: '1', element: <Block index={1} /> },
  { key: '2', element: <Block index={2} /> },
  { key: '3', element: <Block index={3} />, colSpan: 2 },
  { key: '4', element: <Block index={4} />, colSpan: 2 },
  { key: '5', element: <Block index={5} />, colSpan: 2, rowSpan: 2 },
  { key: '6', element: <Block index={6} />, colSpan: 2 },
  { key: '7', element: <Block index={7} />, colSpan: 2 },
  { key: '8', element: <Block index={8} /> },
  { key: '9', element: <Block index={9} />, colSpan: 2 },
  { key: 'a', element: <Block index={10} /> },
  { key: 'b', element: <Block index={11} />, colSpan: 3 },
  { key: 'c', element: <Block index={12} />, colSpan: 3 },
];

function Demo() {
  return (
    <React.Fragment>
      <h2>通常用法</h2>
      <Grid column={6} gap="8px" cellPadding="8px">
        <Grid.Item>
          <Block index={1} />
        </Grid.Item>
        <Grid.Item>
          <Block index={2} />
        </Grid.Item>
        <Grid.Item colSpan={2}>
          <Block index={3} />
        </Grid.Item>
        <Grid.Item colSpan={2}>
          <Block index={4} />
        </Grid.Item>
        <Grid.Item colSpan={2} rowSpan={2}>
          <Block index={5} />
        </Grid.Item>
        <Grid.Item colSpan={2}>
          <Block index={6} />
        </Grid.Item>
        <Grid.Item colSpan={2}>
          <Block index={7} />
        </Grid.Item>
        <Grid.Item>
          <Block index={8} />
        </Grid.Item>
        <Grid.Item colSpan={2}>
          <Block index={9} />
        </Grid.Item>
        <Grid.Item>
          <Block index={10} />
        </Grid.Item>
        <Grid.Item colSpan={3}>
          <Block index={11} />
        </Grid.Item>
        <Grid.Item colSpan={3}>
          <Block index={12} />
        </Grid.Item>
      </Grid>

      <h2>数据渲染、边框</h2>
      <Grid border template={list} column={6} cellPadding="8px" style={{ marginTop: 16 }} />
    </React.Fragment>
  );
}

export default Demo;
