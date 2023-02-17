import { Text, Box, View, Image } from 'native-base';
import { StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useState, useContext } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { UserContext } from './Context/UserContext';

// api
import { API, setAuthToken } from './Config/Api';

const Login = ({navigation}) => {

    const [state, dispatch] = useContext(UserContext);

    // state form
    const [form, setForm] = useState({
        email: "",
        password: "",
    });
  
    // state error
    const [error, setError] = useState({
        email: "",
        password: "",
    })
  
    // handle change
    const handleChange = (name, value) => {
            setForm({
            ...form,
            [name]: value,
        })
    };
  
    // handle submit category
    const handleSubmit = async () => {
        try {
            const config = {
                headers: {
                  'Content-Type': 'application/json',
                },
            };
  
            const messageError = {
                email: "",
                password: "",
            }
  
            // validasi form email
            if (form.email === "") {
              messageError.email = "Email must be filled out";
            } else {
                messageError.email = ""
            }
  
            // validasi form password
            if (form.password === "") {
                messageError.password = "Password must be filled out";
            } else {
                messageError.password = ""
            }
  
            if (messageError.email === "" && messageError.password === "") {
                const body = JSON.stringify(form)
    
                const response = await API.post('/login', body, config);

                if(response.data.status === 0) {
                    await AsyncStorage.setItem("token", response.data.data.token);
                    console.log(response.data.message);
                    dispatch({
                        type: 'LOGIN_SUCCESS',
                        payload: response.data.data,
                    });
                    setAuthToken(response.data.data.token);
                    alert("Login Succesfully");
                    navigation.navigate("Home");
                }
            } else {
                setError(messageError)
            }
          } catch (err) {
              console.log(err)
              alert("email belum terdaftar atau username atau password salah)")
          }
    }
    return (
        <View style={styles.container}>
            <LinearGradient colors={['#3cb371', '#98fb98', '#e0ffff']} style={styles.container} start={{ x: 1, y: 0 }} end={{ x: 1, y: 1 }}>
                <Box style={styles.contentImage}>
                    <Image source={require('../assets/wallet.png')} style={styles.imageWallet} alt=""/>
                    <Image source={require('../assets/logo.png')} style={styles.image} alt=""/>
                </Box>
                <Text style={styles.desc}>Wallet</Text>
                    <Box>
                        <Text style={styles.title}>Login</Text >
                        <TextInput style={styles.textInput} placeholder="Email" onChangeText={(value) => handleChange("email", value)} value={form.email}/>

                        <TextInput style={styles.textInput} placeholder="Password" secureTextEntry={true} onChangeText={(value) => handleChange("password", value)} value={form.password}/>

                        <TouchableOpacity style={styles.button}>
                            <Text style={styles.text} onPress={handleSubmit}>Login</Text>
                        </TouchableOpacity>
                        <Text style={styles.textRegister}>New Users?<Text onPress={() => navigation.navigate("Register")} style={styles.linkRegister}> Register</Text></Text>
                    </Box>
            </LinearGradient>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    contentImage: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 120,
    },
    image: {
        marginHorizontal: 0,
        marginBottom: 40,
    },
    imageWallet: {
        width: 120,
        height: 120,
        marginBottom: 40,
    },
    desc: {
        width: 180,
        fontSize: 20,
        fontWeight: '800',
        alignSelf: 'flex-end',
        textAlign: 'left',
        marginTop: -90,
        marginBottom:100,
        color: '#3B3B3B',
        marginRight: 50,
    },
    title: {
        width: 300,
        height: 50,
        display: 'flex',
        lineHeight: 50,
        alignSelf: 'center',
        fontSize: 25, 
        fontWeight: 'bold', 
        marginBottom:15,
        color: '#808080',
    },
    textInput: {
        alignSelf: 'center',
        width: 300, 
        height: 50, 
        backgroundColor: '#fffff0', 
        borderRadius: 25, 
        paddingLeft: 20, 
        marginBottom: 10,
        justifyContent: 'center',
    },
    button: {
        width: 300, 
        height: 50, 
        alignSelf: 'center',
        backgroundColor: '#3cb371',
        padding: 10,
        borderRadius: 50,
        marginTop: 20,
        marginBottom: 10,
    },
    text: {
        color: 'white',
        fontWeight: '800',
        textAlign: 'center',
    },
    textRegister: {
        textAlign:'center'
    },
    linkRegister: {
        color:'#3cb371',
        fontWeight:'700',
    }
});

export default Login