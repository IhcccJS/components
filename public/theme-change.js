let darkState = null;

function changeTheme(dark) {
  if (darkState === dark) return;
  darkState = dark;
  document.documentElement.setAttribute('data-theme', darkState ? 'default-dark' : 'default-light');
}

setInterval(() => {
  changeTheme(document.documentElement.getAttribute('data-prefers-color') === 'dark');
}, 500);
