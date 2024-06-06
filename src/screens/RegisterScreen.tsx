import React, { useState } from 'react'
import { View } from 'react-native'
import { Button, Snackbar, Text, TextInput } from 'react-native-paper'
import styles from '../theme/styles';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../configs/firebaseConfig';
import { CommonActions, useNavigation } from '@react-navigation/native';

// Interface - formRegister
interface FormRegister {
    email: string,
    password: string,
}

//Interface - mensajes
interface MessageSnackbar {
    visible: boolean,
    message: string,
    color: string,
}

//Interface - ocultar/mostrar contraseña
interface HiddenPassword {
    icon: string,
    secure: boolean,
}

export const RegisterScreen = () => {

    //hook useState: Ocultar/Mostrar Contraseña
    const [hiddenPass, setHiddenPass] = useState<HiddenPassword>({
        icon: 'eye',
        secure: true
    });

    const navigation = useNavigation()

    const [formRegister, setFormRegister] = useState<FormRegister>({
        email: "",
        password: "",
    });

    const [showMessage, setShowMessage] = useState<MessageSnackbar>({
        visible: false,
        message: '',
        color: 'gray',
    });

    const handlerSetValues = (key: string, value: string) => {
        setFormRegister({ ...formRegister, [key]: value });
    };

    const handlerRegister = async () => {

        let validate: boolean = false;
        let emailRegex: RegExp = /^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/ ;
        let email: string = String(formRegister.email);
        let password_length: number = formRegister.password.length;

        if (!formRegister.email || !formRegister.password) {
            setShowMessage({
                visible: true,
                message: 'Completa todos los campos!',
                color: '#ff5b47',
            });
            return;
        } else if (password_length < 6) {
            setShowMessage({
                visible: true,
                message: 'La contraseña necesita al menos 6 caracteres!',
                color: '#ff5b47',
            });
            validate = true;
            return;
        } else if (!emailRegex.test(email)) {
            setShowMessage({
                visible: true,
                message: 'Ingrese un correo valido!',
                color: '#ff5b47',
            });
            validate = true;
            return;
        }

        try {
            const response = await createUserWithEmailAndPassword(
                auth,
                formRegister.email,
                formRegister.password,
            );
            setShowMessage({
                visible: true,
                message: 'Registro exitoso!',
                color: '#146525'
            })
        } catch (ex) {
            if (!validate) {
                setShowMessage({
                    visible: true,
                    message: 'No se pudo registrar, intentelo más tarde!',
                    color: '#ff5b47'
                })
                console.log(ex);    
            } else { }
            
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
            <Text style={styles.textHead}>Registrarse</Text>
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
                onPress={handlerRegister}
            >
                Registrar
            </Button>
            <Text
                style={styles.textRedirect}
                onPress={() => navigation.dispatch(CommonActions.navigate({ name: 'Login' }))}>
                Ya tienes una cuenta? Inicia Sesión!
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
