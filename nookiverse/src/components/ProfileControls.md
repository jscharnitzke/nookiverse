
```js
import { theme } from '../themes/nookiverse.theme.tsx';
import { ThemeProvider } from '@material-ui/styles';

<ThemeProvider theme={theme}>
    <h1>Profile Controls for guests</h1>
    <ProfileControls isLoggedIn={false} />
    <h1>Profile Controls for existing members</h1>
    <ProfileControls isLoggedIn={true} />
</ThemeProvider>
```
