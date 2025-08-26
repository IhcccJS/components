import React from 'react';
import { TourContext } from './context';

function TourList(props) {
  const { group, onClick } = props;

  const { tourList = {}, setOpen } = React.useContext(TourContext);

  return (
    <div>
      {(tourList[group] || []).map((item) => (
        <div title={item.description} key={item.key}>
          <a
            onClick={() => {
              setOpen(item.key);
              onClick?.();
            }}
          >
            {item.label}
          </a>
        </div>
      ))}
    </div>
  );
}

export default TourList;
