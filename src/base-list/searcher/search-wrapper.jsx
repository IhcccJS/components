import React from 'react';
// import { EllipsisOutlined } from '@ant-design/icons';
// import { usePreset } from '../hooks';
import Wrapper from '../wrapper';

function SearchWrapper(props) {
  const { children } = props;

  return (
    <Wrapper className="bc-search-form bc-search-space bc-wrapper-style">
      {children}
    </Wrapper>
  );
}

// function QueryButtons(props) {
//   const { data, onItem } = props;

//   return (
//     <div className="bc-fast-query-list">
//       {data.map((item) => (
//         <div
//           className="bc-fast-query-item"
//           onClick={() => onItem(item.value)}
//           key={item.key}
//         >
//           {item.label}
//         </div>
//       ))}
//     </div>
//   );
// }

// function SearchWrapper(props) {
//   const { preset, onItemQuery, children } = props;

//   if (!preset) {
//     return (
//       <Wrapper className="bc-search-form bc-search-space bc-wrapper-style">
//         {children}
//       </Wrapper>
//     );
//   }

//   const [visible, setVisible] = React.useState(false);
//   const { data } = usePreset(preset);

//   return (
//     <Wrapper className="bc-search-panel bc-search-space">
//       <div
//         className={('bc-searh-content', {
//           'bc-buttons-visible': visible,
//         })}
//       >
//         <div className="bc-search-buttons bc-wrapper-style">
//           <span>预设参数：</span>
//           <QueryButtons data={data} onItem={onItemQuery} />
//         </div>
//         <div className="bc-search-form bc-wrapper-style">{children}</div>
//       </div>
//       <span
//         className="bc-fast-query-button"
//         onClick={() => setVisible(!visible)}
//       >
//         <EllipsisOutlined />
//       </span>
//     </Wrapper>
//   );
// }

export default SearchWrapper;
