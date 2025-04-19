import './ThemeSwitcher.css';

export default function ThemeSwitcher() {
  const switchTheme = () => {
    const theme = document.body.dataset.theme === 'blue' ? 'green' : 'blue';
    document.body.dataset.theme = theme;
  };

  return (
    <button className="theme-switcher" onClick={switchTheme}>
      🎨 Switch Theme
    </button>
  );
}
