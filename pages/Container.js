// import { createStackNavigator } from '@react-navigation/stack';
// import { NavigationContainer } from '@react-navigation/native';
// import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
// import { Ionicons } from "@expo/vector-icons";
// import { useTheme } from "native-base";
// import { setAuthToken } from './config/api';
// import { useEffect, useState } from 'react';
// import AsyncStorage from '@react-native-async-storage/async-storage';

// // pages
// import Index from './Index';
// import Register from './Register';
// import Login from './Login';
// import Home from './Home';
// import History from './History';
// import Profile from './Profile';
// import Transfer from './Transfer';

// const Stack = createStackNavigator();

// //Create Bottom Tab Navigation
// const Tab = createBottomTabNavigator();

// function MyTab() {
//   // Init Theme
//   const theme = useTheme();

//   return (
//     <Tab.Navigator initialRouteName='Home' screenOptions={({ route }) => ({headerMode: "screen", headerTintColor: "white", headerStyle: { backgroundColor: '#228b22', borderBottomColor: '#fffaf0', borderWidth:1 },tabBarIcon: ({ focused, color, size }) => {
//           let iconName;
//           if(route.name === "Home") {
//             iconName = focused ? "ios-home" : "ios-home-outline";
//           } else if (route.name === "History") {
//             iconName = focused ? "ios-receipt" : "ios-receipt-outline";
//           } else if (route.name === "Profile") {
//             iconName = focused ? "ios-person" : "ios-person-outline";
//           } 
//           return <Ionicons name={iconName} size={size} color={color} />
//         },
//         tabBarActiveTintColor: theme.colors.primary["2000"],
//         tabBarInactiveTintColor: "gray",
//       })}
//     >
//       <Tab.Screen name="Home" component={Home} />
//       <Tab.Screen name="History" component={History} />
//       <Tab.Screen name="Profile" component={Profile} />
//     </Tab.Navigator>
//   );
// }

// const Container = () => {

//   const [login, setLogin] = useState(false)

//   const CheckLogin = async () => {
//     try {
//       const response = await AsyncStorage.getItem("token")
//       // console.log(response)
//       if(response){
//         setLogin(true)
//         setAuthToken(response)
//       } else {
//         setLogin(false)
//       }
//     } catch (err){
//       console.log(err)
//     }
//   }

//   useEffect(() => {
//     CheckLogin()
//   }, [])

//   return (
//     <NavigationContainer>
//       <Stack.Navigator initialRouteName="Index">
//         {login === false ? (
//           <>
//             <Stack.Screen name="Index" component={Index} options={{headerShown: false }} />
//             <Stack.Screen name="Register" component={Register} options={{headerShown: false }} />
//             <Stack.Screen name="Login" component={Login} options={{headerShown: false }} />
//             {/* <Stack.Screen name="Login" component={() => <Login CheckLogin={CheckLogin}/>} options={{headerShown: false }} /> */}
//           </>
//         ) : ( 
//           <>
//             <Stack.Screen name="MyTab" component={MyTab} options={{headerShown: false }} />
//             <Stack.Screen name="Home" component={Home} options={{headerShown: true }} />
//             <Stack.Screen name="History" component={History} options={{headerShown: true }} />
//             <Stack.Screen name="Profile" component={Profile} options={{headerShown: true }} />
//             <Stack.Screen name="Transfer" component={Transfer} options={{headerShown: true }} />
//           </>
//         )}
//       </Stack.Navigator>
//     </NavigationContainer>
//   );
// }

// export default Container