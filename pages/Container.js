
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import { Drawer, useTheme } from "native-base";
import { useEffect, useState, useContext } from 'react';
import { UserContext } from './Context/UserContext';
import { createStackNavigator } from '@react-navigation/stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
// import Spinner from "react-native-loading-spinner-overlay";

// setAuthToken
import { setAuthToken, API } from './Config/Api';

// pages
import Index from "./Index";
import Register from './Register';
import Login from './Login';
import Home from './Home';
import History from './History';
import Profile from './Profile';
import Transfer from './Transfer';

// Create bottom tab & stack navigator
const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

function MyTab() {
  // Init Theme
  const theme = useTheme();

  return (
    <Tab.Navigator initialRouteName="Home" screenOptions={({ route }) => ({headerMode: "screen", headerTintColor: "white", headerStyle: { backgroundColor: '#228b22', borderBottomColor: '#fffaf0', borderWidth:1 },tabBarIcon: ({ focused, color, size }) => {
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

// function container (routes)
const Container = () => {

    const [state, dispatch] = useContext(UserContext);

    //state login
    const [login, setLogin] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    
    const checkLogin = async () => {
        try {
            const token = await AsyncStorage.getItem("token");
            if(token){
                setLogin(true);
                setAuthToken(token);

                // get profile
                const response = await API.get(`/getProfile`);
                
                let payload = response.data.data;
                payload.token = token
                // console.log(payload)
          
                dispatch({
                  type: 'USER_SUCCESS',
                  payload: payload,
                });
                setIsLoading(false);
            } else {
              setLogin(false);
            }
        } catch (err){
            dispatch({
                type: "AUTH_ERROR",
                payload: {},
            });
            setIsLoading(false);
            console.log(err);
        }
    }

    async function isAsyncTokenExist() {
        await AsyncStorage.getItem("token");
        checkLogin();
    }

    useEffect(() => {
      checkLogin();
      isAsyncTokenExist();
    }, []);

    return (
      <>
        {
        // isLoading === false ? (
        //   <Spinner size="large" visible={isLoading} textContent={'Loading...'} overlayColor="rgba(0, 0, 0, 0.25)" />
        // ) : 
        state.isLogin === true ? (
          <Stack.Navigator>
            <Stack.Screen name='MyTab' component={MyTab} options={{headerShown: false }} />
            <Stack.Screen name='Transfer' component={Transfer} options={{headerShown: true }}/>
          </Stack.Navigator>
        ) : (
          <Stack.Navigator>
            <Stack.Screen name='Index' component={Index} options={{headerShown: false }} />
            <Stack.Screen name='Login' component={Login} options={{headerShown: false }} />
            <Stack.Screen name='Register' component={Register} options={{headerShown: false }} />
          </Stack.Navigator>
        )}
      </>
    );
}

export default Container