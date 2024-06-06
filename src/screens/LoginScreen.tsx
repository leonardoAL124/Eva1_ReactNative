import React, { useState } from 'react'
import { View } from 'react-native'
import styles from '../theme/styles'
import { Button, Snackbar, Text, TextInput } from 'react-native-paper'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { auth } from '../configs/firebaseConfig'
import { CommonActions, useNavigation } from '@react-navigation/native'

//Interface - mensajes
interface MessageSnackbar {
  visible: boolean,
  message: string,
  color: string,
}

//Interface - Formulario Login
interface FormLogin {
  email: string,
  password: string,
}

//Interface - ocultar/mostrar contraseña
interface HiddenPassword {
  icon: string,
  secure: boolean,
}

export const LoginScreen = () => {

  const [formLogin, setFormLogin] = useState<FormLogin>({
    email: '',
    password: '',
  });

  const navigation = useNavigation()

  const [hiddenPass, setHiddenPass] = useState<HiddenPassword>({
    icon: 'eye',
    secure: true
  });

  const [showMessage, setShowMessage] = useState<MessageSnackbar>({
    visible: false,
    message: '',
    color: 'gray',
  });

  const handlerSetValues = (key: string, value: string) => {

    setFormLogin({ ...formLogin, [key]: value });
  };

  const handlerLogin = async () => {
    if (!formLogin.email || !formLogin.password) {
      setShowMessage({
        visible: true,
        message: 'Completa todos los campos!',
        color: '#ff5b47',
      });
      return;
    }
    try {
      const response = await signInWithEmailAndPassword(
        auth,
        formLogin.email,
        formLogin.password,
      );
      console.log(response);
    } catch (ex) {
      console.log(ex);
      setShowMessage({
        visible: true,
        message: 'Usuario y/o contraseña incorrecta',
        color: '#b53333'
      })
    }
  }

  // Funcion - Ocultar Contraseña
  const hiddenPassword = () => {
    if (hiddenPass.icon == "eye-off") {
      setHiddenPass({
        icon: 'eye',
        secure: true,
      });
    } else {
      setHiddenPass({
        icon: 'eye-off',
        secure: false,
      });
    }
  }

  return (
    <View style={styles.root}>
      <Text style={styles.textHead}>Inicio de Sesión</Text>
      <TextInput
        mode="flat"
        label="Email"
        placeholder="Escriba su correo"
        keyboardType='email-address'
        style={styles.inputs}
        onChangeText={(value) => handlerSetValues('email', value)}
      />
      <TextInput
        mode="flat"
        label="Contraseña"
        placeholder="Escriba su contraseña"
        secureTextEntry={hiddenPass.secure}
        right={<TextInput.Icon icon={hiddenPass.icon} onPress={hiddenPassword} />}
        style={styles.inputs}
        onChangeText={(value) => handlerSetValues('password', value)}
      />
      <Button
        style={styles.button}
        mode="contained"
        onPress={handlerLogin}
      >
        Iniciar Sesión
      </Button>
      <Text
        style={styles.textRedirect}
        onPress={() => navigation.dispatch(CommonActions.navigate({ name: 'Register' }))}>
        No tienes una cuenta? Registrate ahora!
      </Text>
      <Snackbar
        visible={showMessage.visible}
        onDismiss={() => setShowMessage({ ...showMessage, visible: false })}
        style={{ backgroundColor: showMessage.color }}>
        {showMessage.message}
      </Snackbar>
    </View>
  )
}
