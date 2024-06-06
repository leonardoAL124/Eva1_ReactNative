import React, { useState } from "react";
import { View } from "react-native";
import {
  Button,
  Divider,
  IconButton,
  Modal,
  Portal,
  Text,
  TextInput,
} from "react-native-paper";
import styles from "../theme/styles";
import { FlatList } from "react-native-gesture-handler";

interface Products {
  name: string;
  price: number;
}

export const HomeScreen = () => {
  const [showModal, setShowModal] = useState<boolean>(false);

  const products: Products[] = [
    {
      name: "mouse",
      price: 50,
    },
    {
      name: "laptop",
      price: 1500,
    },
    {
      name: "teclado",
      price: 80,
    },
    {
      name: "monitor",
      price: 120,
    },
  ];

  const total = (products: Products[]) => {
    let acum: number = 0;

    for (let i = 0; i < products.length; i++) {
      acum += products[i].price;
    }

    return acum;
  };

  return (
    <View style={styles.rootHome}>
      <View style={styles.header}>
        <View>
          <Text variant="headlineMedium">Bienvenido!</Text>
        </View>
        <View style={styles.iconEnd}>
          <IconButton
            icon="cart-outline"
            mode="contained"
            size={32}
            onPress={() => setShowModal(true)}
          />
        </View>
      </View>
      <Portal>
        <Modal visible={showModal} contentContainerStyle={styles.modal}>
          <View style={styles.header}>
            <Text variant="headlineMedium">Total:</Text>
            <View style={styles.iconEnd}>
              <IconButton
                icon="close-circle-outline"
                size={20}
                onPress={() => setShowModal(false)}
              />
            </View>
          </View>
          <View>
            <Text variant="headlineSmall">{total(products)}</Text>
          </View>
        </Modal>
      </Portal>
      <Divider/>
      <View>
      <View style={styles.flatHome}>
                <Text variant="headlineSmall">Producto</Text>
                <Text style={styles.textPrice} variant="headlineSmall">Precio</Text>
              </View>
        <FlatList
          data={products}
          renderItem={({ item }) => 
            <>
              <View style={styles.flatHome}>
                <Text variant="titleLarge">{item.name}</Text>
                <Text style={styles.flatTextPrice} variant="titleLarge">{item.price}</Text>
              </View>
            </>
          }
          keyExtractor={item => item.name}
        />
      </View>
    </View>
  );
};
