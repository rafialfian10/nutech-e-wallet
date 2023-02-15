import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useContext } from 'react'
import { UserContext } from '../context/usercontext';

const Logout = () => {
    const [state, dispatch] = useContext(UserContext);
    useEffect(() => {
        AsyncStorage.removeItem("token")
        dispatch({
            type: "LOGOUT_SUCCESS",
        })
        alert("Logout successfully")
    }, [])
    return
}

export default Logout