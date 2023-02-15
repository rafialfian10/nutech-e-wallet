// component
import { StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import { Text, Box, Image, View, ScrollView} from 'native-base';
import React, { useState } from 'react';
import { useQuery } from 'react-query';
import { LinearGradient } from 'expo-linear-gradient';

// api
import { API } from './Config/Api';

const Register = ({navigation}) => {

  // state form
    const [form, setForm] = useState({
      email: "",
      password: "",
      first_name: "",
      last_name: "",
    });

    // state error
    const [error, setError] = useState({
      email: "",
      password: "",
      first_name: "",
      last_name: "",
    })

    // handle change
    const handleChange = (name, value) => {
      setForm({
      ...form,
      [name]: value,
      })
    };

    // handle submit category
    const handleSubmit =  async () => {
      try {
          // konfigurasi file
          const config = {
              headers: {
                'Content-Type': 'application/json',
              },
          };

          const messageError = {
              email: "",
              password: "",
              first_name: "",
              last_name: "",
          }

          // validasi form name
          if (form.first_name === "") {
              messageError.first_name = "First name must be filled out";
          } else {
              messageError.first_name = ""
          }

          if (form.last_name === "") {
            messageError.last_name = "Last name must be filled out";
          } else {
              messageError.last_name = ""
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

          if (messageError.first_name === "" && messageError.last_name === "" && messageError.email === "" && messageError.password === "") {
              const body = JSON.stringify(form)

               // Insert trip data
              const response = await API.post('/registration', body, config);
              // refetchCategories()
              alert("Register successfully")
              navigation.navigate('Login'); 
              } else {
                  setError(messageError)
              }
        } catch (err) {
            console.log(err)
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
            <Text style={styles.title}>Register</Text>
            <ScrollView>
              <Box>
                      <TextInput style={styles.textInput} placeholder="Email" onChangeText={(value) => handleChange("email", value)} value={form.email}/>
                      {error.email && <Text style={{width:'75%', alignSelf:'center', color:'red', marginBottom: 50}}>{error.email}</Text>}

                      <TextInput style={styles.textInput} secureTextEntry={true} placeholder="Password" onChangeText={(value) => handleChange("password", value)} value={form.password}/>
                      {error.password && <Text style={{width:'75%', alignSelf:'center', color:'red', marginBottom: 50}}>{error.password}</Text>}

                      <TextInput style={styles.textInput} placeholder="First Name" onChangeText={(value) => handleChange("first_name", value)} value={form.first_name}/>
                      {error.first_name && <Text style={{width:'75%', alignSelf:'center', color:'red', marginBottom: 50}}>{error.first_name}</Text>}

                      <TextInput style={styles.textInput} placeholder="Last Name" onChangeText={(value) => handleChange("last_name", value)} value={form.last_name}/>
                      {error.last_name && <Text style={{width:'75%', alignSelf:'center', color:'red', marginBottom: 50}}>{error.last_name}</Text>}
          
                  <TouchableOpacity onPress={handleSubmit} style={styles.button}>
                    <Text style={styles.text}>Register</Text>
                  </TouchableOpacity>
                  <Text style={styles.textRegister}>Joined us before?<Text onPress={() => navigation.navigate("Login")} style={styles.linkRegister}> Login</Text></Text>
              </Box>
            </ScrollView>
        </LinearGradient>
      </View>
    )
}

const styles = StyleSheet.create({
  container: {
    flex: 10,
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
      fontWeight:'800',
  }
});

export default Register