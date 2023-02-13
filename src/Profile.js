import { Text, Box, Image, View, Menu, Pressable } from 'native-base';
import { StyleSheet, Modal, TextInput, TouchableOpacity } from 'react-native';
import { useQuery } from 'react-query';
import { useState, useContext } from 'react';
import { useQueryClient } from "react-query";
import { UserContext } from './context/userContext';
import AsyncStorage from '@react-native-async-storage/async-storage';

// api
import { API } from './config/api';

const Profile = ({navigation}) => {

    const [state, dispatch] = useContext(UserContext);
    console.log(state)

    const client = useQueryClient();

    // state modal
    const [modalVisible, setModalVisible] = useState(false);

    // get profile
    let { data: getProfile, refetch: refetchProfile} = useQuery('getProfileCache', async () => {
        const response = await API.get(`/getProfile`);
        return response.data.data;
    });

    // update profile
    const [form, setForm] = useState({
        first_name: "",
        last_name: "",
      });
  
      // state error
      const [error, setError] = useState({
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
      const handleUpdateProfile = async () => {
          try {
            const config = {
                headers: {
                  'Content-Type': 'application/json',
                  "Bearer Token": "Bearer " + AsyncStorage.getItem("Token"),
                },
            };
  
            const messageError = {
                first_name: "",
                last_name: "",
            }
  
            // validasi form first name
            if (form.first_name === "") {
                messageError.first_name = "First name must be filled out";
            } else {
                messageError.first_name = "";
            }
  
            // validasi form last name
            if (form.last_name === "") {
              messageError.last_name = "Last name must be filled out";
            } else {
                messageError.last_name = "";
            }
  
            if (messageError.first_name === "" && messageError.last_name === "") {
                const body = JSON.stringify(form);
  
                 // update profile
                const response = await API.post('/updateProfile', body, config);
                console.log(response.data.status)
                
                if(response.data.status === 0) {
                    alert(response.data.message);
                    setModalVisible(false);
                    setForm({
                        first_name: "",
                        last_name: "",
                    })
                }
                
                refetchProfile();

                } else {
                    setError(messageError);
                }
          } catch (err) {
              console.log(err);
          }
      }

    // handle logout
    const handleLogout = () => {
        AsyncStorage.removeItem("token");
        navigation.reset({
            index: 0,
            routes: [{ name: 'Login' }],
        });
        client.clear()
        alert("Logout successfully");
    }

    return (
        <View style={styles.container}>
            <Box style={styles.profileContainer}>
                <Menu w="190" trigger={triggerProps => { return <Pressable {...triggerProps} style={styles.hamburger}>
                    <Image source={require('../assets/hamburger.png')} style={styles.photo} alt=""/></Pressable>;}}>
                    <TouchableOpacity style={[styles.button, styles.buttonOpen]} onPress={() => setModalVisible(true)}>
                        <Text style={styles.textStyle}>Update profile</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.buttonLogout} onPress={() => {navigation.navigate("Index"); handleLogout();}}>
                        <Text style={styles.textStyle}>Logout</Text>
                    </TouchableOpacity>
                </Menu>
                <Box style={styles.contentProfile}>
                    <Box style={styles.contentName}>
                        <Text style={styles.firstName}>{getProfile?.first_name}</Text>
                        <Text style={styles.lastName}>{getProfile?.last_name}</Text>
                    </Box>
                    <Box style={styles.contentPhoto}>
                        <Image source={require('../assets/admin.png')} style={{width: '100%', height: '100%'}}  alt=''/>
                    </Box>
                </Box>
               
                <Box style={styles.contentDataProfile}>
                    <Box style={styles.subContentDataProfile}>
                        <Text style={styles.textKey}>First Name : </Text>
                        <Text style={styles.textvalue}>{getProfile?.first_name}</Text>
                    </Box>
                    <Box style={styles.subContentDataProfile}>
                        <Text style={styles.textKey}>Last Name : </Text>
                        <Text style={styles.textvalue}>{getProfile?.last_name}</Text>
                    </Box>
                    <Box style={styles.subContentDataProfile}>
                        <Text style={styles.textKey}>Email : </Text>
                        <Text style={styles.textvalue}>{getProfile?.email}</Text>
                    </Box>
                </Box>
                {/* Modal */}
                <Box style={styles.contentModalProfile}>
                    <View style={styles.centeredView}>
                        <Modal animationType="slide" transparent={true} visible={modalVisible} onRequestClose={() => { Alert.alert('Modal has been closed.'); setModalVisible(!modalVisible);}}>
                            <View style={styles.centeredView}>
                                <View style={styles.modalView}>
                                
                                    <TextInput style={styles.textInput} placeholder={getProfile?.first_name} onChangeText={(value) => handleChange("first_name", value)} value={form.first_name}/>
                                    {error.first_name && <Text style={{width:'100%', alignSelf:'center', color:'red'}}>{error.first_name}</Text>}

                                    <TextInput style={styles.textInput} placeholder={getProfile?.last_name}  onChangeText={(value) => handleChange("last_name", value)} value={form.last_name}/>
                                    {error.last_name && <Text style={{width:'100%', alignSelf:'center', color:'red'}}>{error.last_name}</Text>}

                                    <Box style={styles.btn}>
                                        <TouchableOpacity style={[styles.buttonModal, styles.buttonClose]} onPress={handleUpdateProfile}>
                                        <Text style={styles.textStyle}>Update</Text>
                                        </TouchableOpacity>

                                        <TouchableOpacity style={[styles.buttonModal, styles.buttonClose]} onPress={() => setModalVisible(!modalVisible)}>
                                        <Text style={styles.textStyle}>Cancel</Text>
                                        </TouchableOpacity>
                                    </Box>
                                </View>
                            </View>
                        </Modal>
                    </View>
                </Box>
            </Box>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        height: '100%',
        backgroundColor: 'white',
    },
    hamburger: {
        position: 'absolute',
        right: 5,
        top: 5,
        zIndex: 100,
    },
    profileContainer: {
        width: '100%',
    },
    contentProfile: {
        width: '100%',
        height: 120,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        justifyContent: 'center',
        backgroundColor: '#228b22',
    },
    contentName: {
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 80,
    },
    firstName:{
        fontSize: 22,
        fontWeight: 'bold',
        color: 'white',
        alignSelf: 'center',
        margin: 5,
    },
    lastName:{
        fontSize: 22,
        color: 'white',
        fontWeight: 'bold',
        alignSelf: 'center',
        margin: 5,
    },
    contentPhoto: {
        width: 80,
        height: 80,
        position: 'relative',
        left: 20,
        borderRadius: 40,
        backgroundColor: 'black',
        overflow: 'hidden',
        backgroundColor: '#87cefa',
    },
    contentDataProfile: {
        width: '90%',
        alignSelf: 'center',
        marginTop: 70,
    },
    subContentDataProfile: {
        display: 'flex',
        flexDirection: 'row',
        marginBottom: 15,
        borderColor: 'white',
        borderBottomColor: '#a9a9a9',
        borderWidth: 2,
    },
    textKey: {
        fontSize: 14,
        fontWeight: '700'
    },
    textvalue: {
        fontSize: 14,
        fontWeight: '500',
        color: '#a9a9a9',
    },
    // Modal
    contentModalProfile: {
        width: '50%',
        height: 100,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 50,
    },
    centeredView: {
        width: '80%',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center'
    },
    modalView: {
        width: '100%',
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 35,
        alignItems: 'flex-end',
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    button: {
        width: 160,
        alignSelf: 'center',
        borderRadius: 15,
        marginTop:10,
        padding: 10,
        marginHorizontal: 5,
        elevation: 2,
    },
    buttonLogout: {
        width: 160,
        alignSelf: 'center',
        borderRadius: 15,
        marginTop:10,
        padding: 10,
        marginHorizontal: 5,
        backgroundColor: '#3cb371',
    },
    buttonOpen: {
        backgroundColor: '#3cb371',
    },
    buttonClose: {
        backgroundColor: '#3cb371',
    },
    buttonModal: {
        width: 80,
        borderRadius: 10,
        marginTop:10,
        padding: 10,
        marginHorizontal: 5,
        elevation: 2,
        backgroundColor: '#3cb371'
    },
    textStyle: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    modalText: {
        marginBottom: 15,
        textAlign: 'center',
    },
    textInput: {
        width: '100%',
        height: 50,
        paddingLeft: 10,
        marginBottom: 10,
        borderWidth: 2,
        borderColor: 'white',
        borderBottomColor: '#3cb371',
    },
    btn: {
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-end',
        marginTop: 20,
    }
})

export default Profile