import { Text, Box, Image, View } from 'native-base';
import { StyleSheet, TouchableOpacity} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const Index = ({navigation}) => {

    return (
      <View style={styles.container}>
         <LinearGradient colors={['#3cb371', '#98fb98', '#e0ffff']} style={styles.container} start={{ x: 1, y: 0 }} end={{ x: 1, y: 1 }}>
            <Box style={styles.contentImage}>
              <Image source={require('../assets/wallet.png')} style={styles.imageWallet} alt=""/>
              <Image source={require('../assets/logo.png')} style={styles.image} alt=""/>
            </Box>
              <Text style={styles.desc}>Wallet</Text>
              <TouchableOpacity style={styles.buttonLogin} onPress={() => navigation.navigate('Login')}><Text style={styles.text}>Login</Text></TouchableOpacity>
              <TouchableOpacity style={styles.buttonRegister} onPress={() => navigation.navigate('Register')}><Text style={styles.text}>Register</Text></TouchableOpacity>
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
      marginTop: 300,
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
    text: {
        color: 'white',
        fontWeight: '800',
        textAlign: 'center', 
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
    buttonLogin: {
      width: 320, 
      alignSelf: 'center',
      backgroundColor: '#3cb371',
      padding: 10,
      borderRadius: 50,
      marginTop: 20,
      height: 50,
    },
    buttonRegister: {
      width: 320, 
      alignSelf: 'center',
      backgroundColor: '#3cb371',
      padding: 10,
      borderRadius: 50,
      marginTop: 20,
      height: 50, 
    },
  });


export default Index