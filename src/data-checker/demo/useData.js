import React from 'react';
import { delay } from '@ihccc/utils';

let i = 0;
function useData() {
  const [data, setData] = React.useState([]);
  const [loading, setLoading] = React.useState(false);

  const load = async () => {
    i++;
    setLoading(true);
    await delay(2000);
    setLoading(false);
    setData(
      i % 2 === 0
        ? []
        : [
            {
              name: '张三',
              username: 'abc',
              phone: '1213',
              sex: '0',
              enable: '1',
            },
          ],
    );
  };

  React.useEffect(() => {
    load();
  }, []);

  return { data, loading, load };
}

export default useData;
