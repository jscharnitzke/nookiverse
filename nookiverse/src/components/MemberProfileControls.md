
```js
import { theme } from '../themes/nookiverse.theme.tsx';
import { ThemeProvider } from '@material-ui/styles';

const handleLogoutClick = () => console.log('Logged out');

<ThemeProvider theme={theme}>
    <MemberProfileControls handleLogoutClick={handleLogoutClick} />
</ThemeProvider>
```
