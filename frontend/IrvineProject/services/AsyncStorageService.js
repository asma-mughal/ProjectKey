import AsyncStorage from '@react-native-async-storage/async-storage';

const storeToken = async (value) => {
  try {
    const new_value = JSON.stringify(value)
    await AsyncStorage.setItem('token', new_value)
  } catch (error) {
    console.log(error)
  }
}

const getToken = async () => {
  try {
    const token = await AsyncStorage.getItem('token')
    if (token !== null) {
      return token
    }
  } catch (error) {
    console.log(error)
  }
}

const removeToken = async () => {
  try {
    await AsyncStorage.removeItem('token')
  } catch (error) {
    console.log(error)
  }
}
const storeId = async (value) => {
  try {
    await AsyncStorage.setItem('id', value)
  } catch (error) {
    console.log(error)
  }
}

const getId = async () => {
  try {
    const id = await AsyncStorage.getItem('id')
    if (id !== null) {
      return id
    }
  } catch (error) {
    console.log(error)
  }
}
const storeCheck = async (value) => {
  try {
    const new_value = JSON.stringify(value)
    await AsyncStorage.setItem('check', new_value)
  } catch (error) {
    console.log(error)
  }
}

const getCheck = async () => {
  try {
    const check = await AsyncStorage.getItem('check')
    if (check !== null) {
      return check
    }
  } catch (error) {
    console.log(error)
  }
}
export { storeToken, getToken, removeToken,storeId,getId , storeCheck, getCheck }