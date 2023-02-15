import { StyleSheet, TextInput, Modal, SafeAreaView, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { Text, Box, Image, View, Button } from 'native-base';
import  React, { useState } from 'react';
import { useQuery } from 'react-query';
import AsyncStorage from '@react-native-async-storage/async-storage';

// api
import { API } from './Config/Api';

const Transfer = ({navigation}) => {

     // state active button
     const [activeButton, setActiveButton] = useState({
        active: null,
    });

    // state modal
    const [modalVisible, setModalVisible] = useState(false);

    // state topup
    const [form, setForm] = useState({
        amount: '',
    });
  
    // state error
    const [error, setError] = useState({
        amount: '',
    })
  
    // handle change
    const handleChange = (name, value) => {
        setForm({
            ...form,
            [name]: value,
        })

        setActiveButton({active:null})
    };

    // handle topup
    const handleTransfer = async () => {
        try {
          const config = {
              headers: {
                'Content-Type': 'application/json',
                "Bearer Token": "Bearer " + AsyncStorage.getItem("Token"),
              },
          };

          const messageError = {
              amount: '',
          }

        //   validasi form topup
        if(form.amount === "") {
            messageError.amount = "Amount must be filled out";
        } else if (form.amount < 10000) {
            messageError.amount = "can't be less than 10000";
        } else {
            messageError.amount = "";
        }

          if (messageError.amount === '') {
              const body = JSON.stringify(form);

            // update profile
            const response = await API.post('/transfer', body, config);
              
            if(response.data.status === 0) {
                console.log(response.data.message);
                setModalVisible(true);
                setActiveButton({active:null});    
                setForm({amount: null});
                setError({amount: null});
                refetchBalanceTransfer();
            }

            } else {
                setError(messageError);
            }
        } catch (err) {
            console.log(err);
        }
    }

    // get saldo
    let { data: balance, refetch: refetchBalanceTransfer} = useQuery('balanceTransferCache', async () => {
        const response = await API.get(`/balance`);
        return response.data.data;
    });

    return (
        <View style={styles.container}>
            <SafeAreaView>
                <Box style={styles.contentTitleTransfer}>
                    <Text style={styles.title}>Transfer</Text>
                </Box>
                <ScrollView>
                        <Box style={styles.contentTransfer}>
                            <Text style={styles.textRecent}>Recent</Text>
                            <Box style={styles.contenContact}>
                                <Image source={require('../assets/saitama.png')} style={styles.photo} alt=''/>
                                <Box>
                                    <Text style={styles.textName}>Saitama</Text>
                                    <Text style={styles.textPhone}>085880250963</Text>
                                </Box>
                            </Box>
                            <Text style={styles.textRecent}>Set Amount</Text>
                            <Text style={styles.textInfoTransfer}>How much would you like to tansfer?</Text>

                            <Box style={styles.contentAmout}>
                                    <Button  style={activeButton.active === 0 ? styles.btnActive : styles.buttonTransfer} onPress={() => {setActiveButton({ active: 0 }); setForm({amount: 50000})}}>
                                        <Text style={styles.textTransfer}>Rp. 50.000</Text>
                                    </Button>
                                    <Button  style={activeButton.active === 1 ? styles.btnActive : styles.buttonTransfer} onPress={() => {setActiveButton({ active: 1 }); setForm({amount: 100000})}}>
                                        <Text style={styles.textTransfer}>Rp. 100.000</Text>
                                    </Button>
                                    <Button style={activeButton.active === 2 ? styles.btnActive : styles.buttonTransfer} onPress={() => {setActiveButton({ active: 2 }); setForm({amount: 200000})}}>
                                        <Text style={styles.textTransfer}>Rp. 200.000</Text>
                                    </Button>
                                    <Button style={activeButton.active === 3 ? styles.btnActive : styles.buttonTransfer} onPress={() => {setActiveButton({ active: 3 }); setForm({amount: 300000})}}>
                                        <Text style={styles.textTransfer}>Rp. 300.000</Text>
                                    </Button>
                                    <Button style={activeButton.active === 4 ? styles.btnActive : styles.buttonTransfer} onPress={() => {setActiveButton({ active: 4 }); setForm({amount: 400000})}}>
                                        <Text style={styles.textTransfer}>Rp. 500.000</Text>
                                    </Button>
                                    <Button style={activeButton.active === 5 ? styles.btnActive : styles.buttonTransfer} onPress={() => {setActiveButton({ active: 5 }); setForm({amount: 1000000})}}>
                                        <Text style={styles.textTransfer}>Rp. 1000.000</Text>
                                    </Button>
                                   
                                    <TextInput style={styles.textInput} placeholder='Set transfer amount' keyboardType="numeric" onChangeText={(value) => handleChange("amount", value)} value={form}/>
                                    {error.amount && <Text style={{width:'100%', alignSelf:'center', color:'red'}}>{error.amount}</Text>}
                            </Box>

                            <TouchableOpacity style={styles.buttonTransfer2} onPress={handleTransfer}>
                                <Text style={styles.textStyle}>Transfer</Text>
                            </TouchableOpacity>
                        </Box>
                       
                        <View style={styles.centeredView}>
                            <Modal animationType="slide" transparent={true} visible={modalVisible} onRequestClose={() => { Alert.alert('Modal has been closed.'); setModalVisible(!modalVisible);}}>
                                <View style={styles.centeredView}>
                                    <View style={styles.modalView}>
                                        <Box style={styles.contentCheck}>
                                            <Image source={require('../assets/check.png')} style={{width: '100%', height:'100%'}} alt=''/>
                                        </Box>
                                        <Text style={styles.textStatus}>Transfer Success</Text>
                                        <Text style={styles.textInfoStatus}>Your transfer has been successfully done.</Text>
                                        <Box style={styles.btn}>
                                            <TouchableOpacity style={[styles.buttonModal, styles.buttonClose]} onPress={() => {navigation.navigate('Home'); setModalVisible(!modalVisible)}}>
                                                <Text style={styles.textStyle}>Done</Text>
                                            </TouchableOpacity>
                                        </Box>
                                    </View>
                                </View>
                            </Modal>
                        </View>
                </ScrollView>
            </SafeAreaView>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        height: '100%',
        backgroundColor: 'white',
    },
    contentTitleTransfer: {
        width: '100%',
        height: 120,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        justifyContent: 'center',
        backgroundColor: '#228b22',
    },
    title: {
        width: '100%',
        lineHeight: 25,
        textAlign: 'center',
        fontSize: 25, 
        fontWeight: 'bold', 
        color: 'white',
    },
    contentTransfer: {
        width: '100%',
    },
    textRecent: {
        width: '90%',
        alignSelf: 'center',
        marginTop: 15,
        marginBottom: 5,
        lineHeight: 25,
        fontSize: 22,
        fontWeight: 'bold', 
    },
    textInfoTransfer: {
        width: '90%',
        alignSelf: 'center',
        lineHeight: 25,
        marginBottom: 20,
        fontSize: 14,
        fontWeight: 'bold', 
        color: '#a9a9a9',
    },
    contenContact: {
        width: '90%',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        alignSelf: 'center',
        marginVertical: 15,
    },
    photo:{
        width: 60,
        height: 60, 
        borderRadius: 50,
        marginRight: 20,
    },
    textName: {
        fontSize: 16,
        fontWeight: '700',
    },
    textPhone: {
        fontSize: 12,
        fontWeight: 'bold',
        color: '#a9a9a9',
    },
    contentAmout: {
        width: '90%',
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        alignSelf: 'center',
    },
    buttonTransfer: {
        width: '30%',
        marginBottom: 15,
        padding: 0,
        borderRadius: 10,
        backgroundColor: '#3cb371',
    },
    textTransfer: {
        width: '100%',
        margin: 0,
        fontSize: 12,
        color: 'white',
        fontWeight: 'bold',
    },
    textInput: {
        width: '100%', 
        height: 50, 
        alignSelf: 'center',
        backgroundColor: 'white', 
        paddingLeft: 20,
        marginTop: 10, 
        borderWidth: 2,
        borderColor: 'white',
        borderBottomColor: '#3cb371',
    },
    buttonTransfer2: {
        width: '90%',
        alignSelf: 'center',
        borderRadius: 15,
        marginTop: 40,
        padding: 10,
        marginHorizontal: 5,
        backgroundColor: '#3cb371',
    },
    textStyle: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    // Modal
    centeredView: {
        width: '95%',
        height: '90%',
        flex: 0.9,
        marginTop: 100,
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        borderRadius: 35,
        backgroundColor: '#008000'
    },
    modalView: {
        width: '90%',
        height: '90%',
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 25,
        alignItems: 'flex-end',
        shadowColor: '#000',
        shadowOffset: {
          width: 2,
          height: 2,
        },
        shadowOpacity: 0.75,
        shadowRadius: 4,
        elevation: 5,
    },
    contentCheck: {
        width: 142,
        height: 130,
        marginTop: 30,
        alignSelf:'center',
        backgroundColor: 'white',
        overflow: 'hidden',
    },
    textStatus: {
        width: '100%',
        height: 50,
        marginTop: 30,
        lineHeight: 40,
        alignSelf: 'center',
        textAlign: 'center',
        fontSize: 25,
        fontWeight: '700',
    },
    textInfoStatus: {
        width: '100%',
        height: 30,
        lineHeight: 22,
        alignSelf: 'center',
        textAlign: 'center',
        fontSize: 16,
        color: '#a9a9a9',
    },
    textTotal: {
        width: '100%',
        height: 30,
        lineHeight: 22,
        alignSelf: 'center',
        marginTop: 30,
        textAlign: 'center',
        fontSize: 16,
        color: '#a9a9a9',
    },
    textAmount: {
        width: '100%',
        height: 50,
        lineHeight: 40,
        alignSelf: 'center',
        textAlign: 'center',
        fontSize: 25,
        fontWeight: '700',
    },
    buttonOpen: {
        backgroundColor: '#3cb371',
    },
    buttonClose: {
        backgroundColor: '#3cb371',
    },
    buttonModal: {
        width: '100%',
        borderRadius: 10,
        alignSelf: 'center',
        padding: 10,
        backgroundColor: '#3cb371',
    },
    btn: {
        width: '95%',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignSelf: 'center',
        marginTop: 100,
    },
    btnActive: {
        width: '30%',
        marginBottom: 15,
        padding: 5,
        borderRadius: 10,
        backgroundColor: '#3cb371',
        opacity:0.5,
    },
})

export default Transfer