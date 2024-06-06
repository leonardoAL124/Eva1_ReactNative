import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    root: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        gap: 15
    },
    inputs: {
        width: '90%',
    },
    textHead: {
        fontSize: 26,
        fontWeight: 'bold'
    },
    button: {
        width: '40%',
    },
    textRedirect: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#5322af',
    },
    rootHome: {
        flex: 1,
        marginVertical: 50,
        marginHorizontal: 25,
    },
    header: {
        flexDirection: 'row',
        gap: 15,
        alignItems: 'center',
    },
    iconEnd: {
        alignItems: 'flex-end',
        flex: 1,
    },
    modal: {
        paddingHorizontal: 20,
        paddingVertical: 20,
        marginHorizontal: 20,
        borderRadius: 10,
        backgroundColor: '#fff',
        gap: 10,
    },
    rootMessage: {
        flexDirection: 'row',
        paddingHorizontal: 10,
        paddingVertical: 20,
        alignItems: 'center',
    },
    fabMessage: {
        position: 'absolute',
        bottom: 20,
        right: 15,
    },
    flatHome: {
        flexDirection: 'row',
        paddingBottom: 10,
        paddingTop: 10,
    },
    textPrice: {
        paddingLeft: 80,
    },
    flatTextPrice: {
        paddingLeft: 120,
        textAlign: 'center',
    }
})

export default styles;
