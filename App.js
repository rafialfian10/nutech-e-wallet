import { QueryClient, QueryClientProvider } from 'react-query';
import { NativeBaseProvider, extendTheme } from "native-base";
import { UserContextProvider } from './pages/Context/UserContext';
import { NavigationContainer } from '@react-navigation/native';

// pages
import Container from './pages/Container';

// function app
export default function App() {
  
    // client
    const Client = new QueryClient();

    // theme
    const theme = extendTheme();
  
    return (
      <UserContextProvider>
        <NavigationContainer>
          <QueryClientProvider client={Client}>
            <NativeBaseProvider theme={theme}>
                <Container/>
            </NativeBaseProvider>
          </QueryClientProvider>
        </NavigationContainer>
      </UserContextProvider>
    );
}




