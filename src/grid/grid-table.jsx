import React from 'react';

// https://grid.layoutit.com/
function Grid({ template, column, option = {}, onItemClick }) {
  const tableItems = React.useMemo(() => {
    let row = 0;
    let col = 0;
    const colReset = {};
    return template.reduce((tr, item, index) => {
      col += item.colSpan || 1;

      if (col > column) {
        row += 1;
        // if (colReset[row] >= column) row += 1;
        col = (colReset[row] || 0) + (item.colSpan || 1);
      }

      if (item.rowSpan > 1) {
        for (let index = 1; index < item.rowSpan; index++) {
          let r = row + index;
          if (!colReset[r]) colReset[r] = 0;
          colReset[r] += item.colSpan || 1;
        }
      }

      if (!tr[row]) tr[row] = [];
      tr[row].push({ ...item, index });

      return tr;
    }, []);
  }, [template, column]);

  return (
    <table className="grid-table" style={{ '--size': `${option.size}px`, '--gap': `${option.gap}px` }}>
      <tbody>
        {tableItems.map((row, r) => (
          <tr key={'' + r}>
            {row.map((item) => (
              <td
                className="grid-item"
                colSpan={item.colSpan}
                rowSpan={item.rowSpan}
                // style={{ height: option.size * (item.rowSpan || 1) }}
                onClick={() => onItemClick(item.index)}
                key={item.key}
              >
                <span className="no">{item.key}</span>
                <span className="info">colSpan : {item.colSpan || 1}</span>
                <span className="info">rowSpan : {item.rowSpan || 1}</span>
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default Grid;
