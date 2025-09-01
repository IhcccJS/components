import React from 'react';

export const ConfigContext = React.createContext({
  icons: {},
  location: window.location,
  history: {},
  // link: {},
  actionColumn: {},
});
