import React from 'react';

const eventLink = (opts) => {
  const { max } = opts || {};
  return function render(value, record, index) {
    return (
      <a
      // onClick={this.action && this.action?.event?.(this, { value, record, index })}
      >
        {this.get(['tip', max])(value)}
      </a>
    );
  };
};

export default eventLink;
