import { Text, Box, View, Image, Button } from 'native-base';
import { StyleSheet, SafeAreaView, ScrollView, Modal, TextInput, TouchableOpacity, Alert } from 'react-native';
import  React, { useState, useEffect } from 'react';
import { useQuery } from 'react-query';
import Swiper from 'react-native-swiper';
import AsyncStorage from '@react-native-async-storage/async-storage';

// api
import { API } from './config/api';

const Home = ({navigation}) => {

    // state active button
    const [activeButton, setActiveButton] = useState({
        active: null,
    });

    // state modal top up
    const [modalVisible, setModalVisible] = useState(false);

    // state modal top up success
    const [modalTopupSuccess, setModalTopupSuccess] = useState(false);

    // get saldo
    let { data: balance, refetch: refetchBalance} = useQuery('balanceCache', async () => {
        const response = await API.get(`/balance`);
        return response.data.data;
    });

    useEffect(() => {
        refetchBalance()
    }, [])

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
    const handleTopup = async () => {
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

          setActiveButton({active:null})

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

            const response = await API.post('/topup', body, config);
              
            if(response.data.status === 0) {
                console.log(response.data.message);
                setModalVisible(false);
                setModalTopupSuccess(true);
                setActiveButton({active:null});
                setForm({amount: ""});
                setError({amount: ""});
            }
              
            refetchBalance();

            } else {
                setError(messageError);
            }
        } catch (err) {
            console.log(err);
        }
    }

    // get profile
    let { data: profile} = useQuery('profileCache', async () => {
        const response = await API.get(`/getProfile`);
        return response.data.data
    });

    // function parse int to string
    const parse = (x) => {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    };

    const handleOff = (id) =>{
        if(activeButton.active === id){
            setActiveButton({active:null, css:styles.buttonTopup})
        }else{
            setActiveButton({active:id, css: styles.btnActive})

        }
    }

    return (
        <View style={styles.container}>
            <SafeAreaView>
                {/* Content profile */}
                <Box style={styles.content}>
                    <Box style={styles.contentProfile}>
                        <Box style={styles.subContentProfile}>
                            <Text style={styles.text}>Hi {profile?.first_name}</Text>
                        </Box>
                    </Box>
                    <Box style={styles.contentSaldo}>
                        <Image source={require('../assets/logo2.png')} alt="" style={{width: '40%'}}/>
                        <Box style={styles.subContentSaldo}>
                            <Text style={styles.textSaldo}>Saldo</Text>
                            <Text style={styles.saldo}>Rp. {balance?.balance}</Text>
                        </Box>
                    </Box>
                    <Box style={styles.contentservice}>
                        <TouchableOpacity style={styles.subContentservice}>
                            <Image source={require('../assets/pay.png')} alt=''/>
                            <Text style={styles.textService}>Pay</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.subContentservice} onPress={() => navigation.navigate('Transfer')}>
                            <Image source={require('../assets/transfer.png')} alt=''/>
                            <Text style={styles.textService}>Transfer</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.subContentservice} onPress={() => setModalVisible(true)}>
                            <Image source={require('../assets/top-up.png')} alt=''/>
                            <Text style={styles.textService}>Top Up</Text>
                        </TouchableOpacity>
                    </Box>
                </Box>
                <Text style={styles.textCategory}>Category</Text>
                <ScrollView style={{width: '90%', height: 290, alignSelf: 'center'}}>
                    <Box style={styles.containerHome}>
                        <Box style={styles.contentHome}>
                            <TouchableOpacity style={styles.subContentHome}>
                                <Image source={require('../assets/listrik.png')} alt=''/>
                                <Text style={styles.textContentHome}>Listrik</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.subContentHome}>
                                <Image source={require('../assets/telepon.png')} alt=''/>
                                <Text style={styles.textContentHome}>Telepon</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.subContentHome}>
                                <Image source={require('../assets/pulsa.png')} alt=''/>
                                <Text style={styles.textContentHome}>Pulsa</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.subContentHome}>
                                <Image source={require('../assets/game.png')} alt=''/>
                                <Text style={styles.textContentHome}>Game</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.subContentHome}>
                                <Image source={require('../assets/asuransi.png')} alt=''/>
                                <Text style={styles.textContentHome}>Asuransi</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.subContentHome}>
                                <Image source={require('../assets/donasi.png')} alt=''/>
                                <Text style={styles.textContentHome}>Donasi</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.subContentHome}>
                                <Image source={require('../assets/bpjs.png')} alt=''/>
                                <Text style={styles.textContentHome}>BPJS</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.subContentHome}>
                                <Image source={require('../assets/other.png')} alt=''/>
                                <Text style={styles.textContentHome}>Lainnya</Text>
                            </TouchableOpacity>
                        </Box>
                    </Box>

                    <Box style={styles.containerSlider}>
                        <Swiper style={styles.wrapper} showsButtons={true}>
                            <View style={styles.slide}>
                                <Image source={require('../assets/telkom.png')} alt='' style={{width: '95%', height: 180, borderRadius: 10, margin: 0}}/>
                            </View>
                            <View style={styles.slide}>
                                <Image source={require('../assets/indosat.png')} alt='' style={{width: '95%', height: 180, borderRadius: 10, margin: 0}}/>
                            </View>
                            <View style={styles.slide}>
                                <Image source={require('../assets/xl.png')} alt='' style={{width: '95%', height: 180, borderRadius: 10, margin: 0}}/>
                            </View>
                        </Swiper>
                    </Box>   
                </ScrollView>
            </SafeAreaView>
            {/* modal top up */}
            <Box style={styles.contentModalTopup}>
                <View style={styles.centeredView}>
                        <Modal animationType="slide" transparent={true} visible={modalVisible} onRequestClose={() => { Alert.alert('Modal has been closed.'); setModalVisible(!modalVisible);}}>
                            <View style={styles.centeredView}>
                                <View style={styles.modalView}>
                                    <Box style={styles.contentTopup}>
                                        <Button  style={activeButton.active === 0 ? styles.btnActive : styles.buttonTopup} onPress={() => {setActiveButton({ active: 0  }); setForm({amount: 50000})}}>
                                            <Text style={styles.textTopup}>Rp. 50.000</Text>
                                        </Button>
                                        <Button style={activeButton.active === 1 ? styles.btnActive : styles.buttonTopup} onPress={() => {setActiveButton({ active: 1 }); setForm({amount: 100000})}}>
                                            <Text style={styles.textTopup}>Rp. 100.000</Text>
                                        </Button>
                                        <Button style={activeButton.active === 2 ? styles.btnActive : styles.buttonTopup} onPress={() => {setActiveButton({ active: 2 }); setForm({amount: 200000})}}>
                                            <Text style={styles.textTopup}>Rp. 200.000</Text>
                                        </Button>
                                        <Button style={activeButton.active === 3 ? styles.btnActive : styles.buttonTopup} onPress={() => {setActiveButton({ active: 3 }); setForm({amount: 300000})}}>
                                            <Text style={styles.textTopup}>Rp. 300.000</Text>
                                        </Button>
                                        <Button style={activeButton.active === 4 ? styles.btnActive : styles.buttonTopup} onPress={() => {setActiveButton({ active: 4 }); setForm({amount: 500000})}}>
                                            <Text style={styles.textTopup}>Rp. 500.000</Text>
                                        </Button>
                                        <Button style={activeButton.active === 5 ? styles.btnActive : styles.buttonTopup} onPress={() => {setActiveButton({ active: 5 }); setForm({amount: 1000000})}}>
                                            <Text style={styles.textTopup}>Rp. 1000.000</Text>
                                        </Button>
                                        <TextInput style={styles.textInput} keyboardType="numeric" placeholder="Set top up amount" onChangeText={(value) => handleChange("amount", value)} value={form}/>
                                        {error.amount && <Text style={{width:'100%', alignSelf:'center', color:'red'}}>{error.amount}</Text>}
                                    </Box>
                                    <Box style={styles.btn}>
                                        <TouchableOpacity style={[styles.buttonModal, styles.buttonClose]}onPress={handleTopup}>
                                            <Text style={styles.textStyle}>Top Up</Text>
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
            {/* modal top up success */}
            <View style={styles.centeredView2}>
                <Modal animationType="slide" transparent={false} visible={modalTopupSuccess} onRequestClose={() => {Alert.alert('Modal has been closed.'); setModalTopupSuccess(!modalVisible);}}>
                    <View style={styles.centeredView2}>
                        <View style={styles.modalView2}>
                            <Box style={styles.contentCheck2}>
                                <Image source={require('../assets/check.png')} style={{width: '100%', height:'100%'}} alt=''/>
                            </Box>
                            <Text style={styles.textStatus2}>Top Up Success</Text>
                            <Text style={styles.textInfoStatus2}>Your top up has been successfully done.</Text>
                            <Box style={styles.btn2}>
                                <TouchableOpacity style={[styles.buttonModal2, styles.buttonClose2]} onPress={() => setModalVisible(!modalVisible)}>
                                    <Text style={styles.textStyle} onPress={() => {navigation.navigate('Home'); setModalTopupSuccess(false)}}>Done</Text>
                                </TouchableOpacity>
                            </Box>
                        </View>
                    </View>
                </Modal>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 2,
        backgroundColor: '#f5f5f5',
    },
    title: {
        fontSize: 25, 
        fontWeight: '700', 
        marginBottom:20
    },
    contentProfile: {
        width: '90%',
        display:'flex',
        alignSelf:'center',
        alignItems:'center',
        alignContent:'center',
        flexDirection: 'row',
        justifyContent:'space-between',
        marginVertical: 20,
    },
    subContentProfile: {
        display:'flex',
        justifyContent:'center',
        height: 80,  
    },
    photo:{
        width:60,
        height:60, 
        borderRadius:50,
    },
    contentSaldo: {
        width: '90%',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        alignSelf:'center',
        padding: 10,
        marginBottom: 20,
        backgroundColor: '#3cb371',
        borderRadius: 20,
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.75,
        shadowRadius: 4,
        elevation: 5,
    },
    subContentSaldo: {
        width: '60%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'flex-end',
    },
    textSaldo: {
        width: '100%',
        textAlign: 'right',
        color: 'white',
        fontWeight: '700',
        fontSize:14,
    },
    saldo: {
        width: '100%',
        textAlign: 'right',
        color: 'white',
        fontWeight: '700',
        fontSize: 22,
        paddingTop: 10,
        paddingBottom: 0,
    },
    text: {
        display:'flex',
        alignItems:'center',
        color: 'black',
        fontWeight: '700',
        fontSize:25,
        paddingVertical:10,
    },
    contentservice: {
        width: '90%',
        display: 'flex',
        alignSelf: 'center',
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'flex-end',
        marginBottom: 20,
    },
    subContentservice: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    textService: {
        fontSize: 14,
        fontWeight: '700',
    },
    textCategory: {
        width: '90%',
        alignSelf: 'center',
        lineHeight: 25,
        textAlign: 'center',
        paddingVertical: 20,
        fontWeight: '700',
        fontSize :22,
        color: 'black',
        backgroundColor: 'white',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
    },
    containerHome: {
        width: '100%',
        height: 200,
        alignSelf: 'center',
        backgroundColor: 'white',
    },
    contentHome: {
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignSelf: 'center',
    },
    subContentHome: {
        width: '20%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        margin: 7.5,
        padding: 5,
        backgroundColor: 'white',
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.75,
        shadowRadius: 4,
        elevation: 5,
    },
    textContentHome: {
        fontSize: 11,
        fontWeight: 'bold',
        color: 'black'
    },
    containerSlider: {
        width: '100%',
        alignSelf: 'center',
        overflow: 'hidden',
        backgroundColor: 'white',
        paddingTop: 45,
    },
    wrapper: {
        height: 230,
        display: 'flex',
        justifyContent: 'center',
        backgroundColor: 'white',
    },
    slide: {
        width: '95%',
        padding: 0,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
        alignSelf: 'center',
        borderRadius: 10,
        overflow: 'hidden',
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.75,
        shadowRadius: 4,
        elevation: 4,
    },
    // modal topup
    contentModalTopup: {
        height: 100,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 50,
    },
    centeredView: {
        width: '90%',
        flex: 0.8,
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center'
    },
    modalView: {
        width: '100%',
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 15,
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
    button: {
        width: 160,
        borderRadius: 10,
        marginTop:10,
        padding: 10,
        marginHorizontal: 5,
        elevation: 2,
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
    },
    textStyle: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    btn: {
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-end',
        marginTop: 20,
    },
    contentTopup: {
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
    },
    buttonTopup: {
        width: '30%',
        marginBottom: 15,
        padding: 5,
        borderRadius: 10,
        backgroundColor: '#3cb371',
    },
    textTopup: {
        width: '100%',
        textAlign: 'center',
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
        marginTop: 30, 
        borderWidth: 2,
        borderColor: 'white',
        borderBottomColor: '#3cb371',
    },
    radioTopup: {
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        borderWidth: 2,
        borderColor:'black'
    },
    // modal top up success
    centeredView2: {
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
    modalView2: {
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
    contentCheck2: {
        width: 142,
        height: 130,
        marginTop: 30,
        alignSelf:'center',
        backgroundColor: 'white',
        overflow: 'hidden',
    },
    textStatus2: {
        width: '100%',
        height: 50,
        marginTop: 30,
        lineHeight: 40,
        alignSelf: 'center',
        textAlign: 'center',
        fontSize: 25,
        fontWeight: '700',
    },
    textInfoStatus2: {
        width: '100%',
        height: 30,
        lineHeight: 22,
        alignSelf: 'center',
        textAlign: 'center',
        fontSize: 16,
        color: '#a9a9a9',
    },
    textTotal2: {
        width: '100%',
        height: 30,
        lineHeight: 22,
        alignSelf: 'center',
        marginTop: 30,
        textAlign: 'center',
        fontSize: 16,
        color: '#a9a9a9',
    },
    textAmount2: {
        width: '100%',
        height: 50,
        lineHeight: 40,
        alignSelf: 'center',
        textAlign: 'center',
        fontSize: 25,
        fontWeight: '700',
    },
    buttonOpen2: {
        backgroundColor: '#3cb371',
    },
    buttonClose2: {
        backgroundColor: '#3cb371',
    },
    buttonModal2: {
        width: '100%',
        borderRadius: 10,
        alignSelf: 'center',
        padding: 10,
        backgroundColor: '#3cb371',
    },
    btn2: {
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
});

export default Home