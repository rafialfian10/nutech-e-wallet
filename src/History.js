import { Text, Box, Select, View } from 'native-base';
import { StyleSheet, TextInput, SafeAreaView, ScrollView, } from 'react-native';
import  React, { useState } from 'react';
import { useQuery } from 'react-query';

// api
import { API } from './config/api';

const History = () => {

    // state search
    const [search, setSearch] = useState("")

    // handle search
    const handleSearch = (value) => {
        setSearch(value)
    }

    // state filter
    const [filter, setFilter] = useState()

     // get transaction history
     let { data: history, refetch: refetcHistory} = useQuery('historyCache', async () => {
        const response = await API.get(`/transactionHistory`);
        setFilter(response.data.data);
        return response.data.data;
    });

    refetcHistory();

    // function parse int to string
    const parse = (x) => {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    };

    return (
        <View style={styles.container}>
            <SafeAreaView>
                <Box style={styles.contentTitleHistory}>
                    <Text style={styles.title}>Transaction History</Text>
                </Box>
                <Box style={styles.contentSearchFilter}>
                    <TextInput style={styles.contentSearch} placeholder="Search by id or type....." onChangeText={(value) => handleSearch(value)} value={search}/>
                    {/* <Box style={styles.contentFilter}>
                        <Select style={{fontSize:14, height:45}}  selectedValue={filter} placeholder="Filter" onValueChange={itemValue => {setFilter(itemValue);}}>
                            <Select.Item label="Filter" value="" /> 
                            <Select.Item label="Type" value="transaction_type" />
                            <Select.Item label="Time" value="transaction_time" />             
                        </Select>
                    </Box> */}
                </Box>
                <ScrollView>
                        <Box style={styles.contentHistory}>
                            {history?.filter((itemSearch) => {
                                if(search == "") {
                                    return itemSearch
                                } else if(itemSearch.transaction_type.toLowerCase().includes(search.toLocaleLowerCase()) || itemSearch.transaction_id.toLowerCase().includes(search.toLocaleLowerCase())) {
                                    return itemSearch
                                }
                            }).map((item, i) => {
                                return (
                                    <Box style={styles.subContentHistory} key={i}>
                                        <Box style={styles.contentTopup}>
                                            <Text style={styles.textTopup}>{item.transaction_type}</Text>
                                            <Text style={styles.textPrice}>Rp. {parse(item.amount)}</Text>
                                        </Box>
                                        <Box style={styles.contentPrice}>
                                            <Text style={styles.textId}>{item.transaction_id}</Text>
                                            <Text style={styles.textDate}>{item.transaction_time}</Text>
                                        </Box>
                                    </Box>
                                )
                            })}
                        </Box>
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
    contentTitleHistory: {
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
    contentHistory: {
        width: '100%',
    },
    subContentHistory: {
        width: '95%',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignSelf: 'center',
        padding: 10,
        marginBottom: 15,
        borderBottomWidth: 3,
        borderBottomColor: '#a9a9a9',
    },
    contentPrice: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-end'
    }, 
    textTopup: {
        fontSize: 18,
        fontWeight: '700',
        color: '#696969'
    },
    textPrice: {
        fontSize: 14,
        fontWeight: '700',
        color: '#696969'
    },
    textId: {
        fontSize: 14,
        fontWeight: '700',
        color: '#696969'
    },
    textDate: {
        fontSize: 12,
        fontWeight: 'bold',
        color: '#a9a9a9'
    },
    contentSearchFilter: {
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
    },
    contentSearch: {
        width: '100%', 
        height: 50, 
        alignSelf:'flex-end',
        borderRadius: 5, 
        paddingLeft: 20,
        backgroundColor: '#f8f8ff', 
        borderColor: '#808080',
        borderWidth: 1,
        fontSize: 14,
    },
    contentFilter: {
        width: '30%', 
        height: 50, 
        alignSelf:'flex-end',
        borderRadius: 5, 
        backgroundColor: '#f8f8ff', 
        borderColor: '#808080',
        borderWidth: 1,
    },
})

export default History