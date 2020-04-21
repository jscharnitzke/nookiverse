
```js
import { theme } from '../themes/nookiverse.theme.tsx';
import { ThemeProvider } from '@material-ui/styles';

const handleLoginClick = () => console.log('Logged in');
const handleRegisterClick = () => console.log('Registered');

<ThemeProvider theme={theme}>
    <GuestProfileControls handleLoginClick={handleLoginClick} handleRegisterClick={handleRegisterClick} />
</ThemeProvider>
```
