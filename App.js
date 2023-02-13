import { QueryClient, QueryClientProvider } from 'react-query';
import { Drawer, NativeBaseProvider, useTheme } from "native-base";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { Ionicons } from "@expo/vector-icons";
import { UserContextProvider, UserContext } from './src/context/userContext';
import { useEffect, useState, useContext } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';
import Spinner from "react-native-loading-spinner-overlay";

// setAuthToken
import { setAuthToken, API } from "./src/config/api";

// pages
import Index from './src/Index';
import Register from './src/Register';
import Login from './src/Login';
import Home from './src/Home';
import History from './src/History';
import Profile from './src/Profile';
import Transfer from './src/Transfer';


//Create Bottom Tab Navigation & stack navigator
const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

// function tab 
function MyTab() {
  // Init Theme
  const theme = useTheme();

  return (
    <Tab.Navigator initialRouteName='Home' screenOptions={({ route }) => ({headerMode: "screen", headerTintColor: "white", headerStyle: { backgroundColor: '#228b22', borderBottomColor: '#fffaf0', borderWidth:1 },tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          if(route.name === "Home") {
            iconName = focused ? "ios-home" : "ios-home-outline";
          } else if (route.name === "History") {
            iconName = focused ? "ios-receipt" : "ios-receipt-outline";
          } else if (route.name === "Profile") {
            iconName = focused ? "ios-person" : "ios-person-outline";
          } 
          return <Ionicons name={iconName} size={size} color={color} />
        },
        tabBarActiveTintColor: theme.colors.primary["2000"],
        tabBarInactiveTintColor: "gray",
      })}
    >
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="History" component={History} />
      <Tab.Screen name="Profile" component={Profile} />
    </Tab.Navigator>
  );
}

export default function App() {
  
  // const [state, dispatch] = useContext(UserContext);
  // console.log(state)
  
  // client
  const Client = new QueryClient();
  
  //state login
  const [login, setLogin] = useState(false);
  // const [isLoading, setIsLoading] = useState(true);
  
  const checkLogin = async () => {
    try {
      const token = await AsyncStorage.getItem("token");
     
      if(token){
        setLogin(true);
        setAuthToken(token);
        const response = await API.get('/getProfile');
        let payload = response.data.data;
        payload.token = AsyncStorage.token
        
      } else {
        setLogin(false)
      }
    } catch (err){
      console.log("Error on authentication:", err);
    }
  }

  async function isAsyncTokenExist() {
    await AsyncStorage.getItem("token");
    checkLogin();
  }

  useEffect(() => {
      isAsyncTokenExist();
  }, []);
  
    return (
      <NavigationContainer>
        <QueryClientProvider client={Client}>
          <NativeBaseProvider>
            <UserContextProvider>
              {
              // isLoading ? (
              //     <Spinner size="large" visible={isLoading} textContent={'Loading...'} overlayColor="rgba(0, 0, 0, 0.25)" />
              //   ) :
                  login === false ? (
                    <Stack.Navigator>
                      <Stack.Screen name="Index" component={Index} options={{headerShown: false }} />
                      <Stack.Screen name="Register" component={Register} options={{headerShown: false }} />
                      <Stack.Screen name="Login" component={Login} options={{headerShown: false }} />
                    </Stack.Navigator >
                   
                ) : (
                    <Stack.Navigator>
                      <Stack.Screen name="MyTab" component={MyTab} options={{headerShown: false }} />
                      <Stack.Screen name="Home" component={Home} options={{headerShown: true }} />
                      <Stack.Screen name="History" component={History} options={{headerShown: true }} />
                      <Stack.Screen name="Profile" component={Profile} options={{headerShown: true }} />
                      <Stack.Screen name="Transfer" component={Transfer} options={{headerShown: true }} />
                    </Stack.Navigator>
                )
              }
            </UserContextProvider>
          </NativeBaseProvider>
        </QueryClientProvider>
      </NavigationContainer>
    );
}




