import { router, Stack } from "expo-router";
import React from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { StylesDefault } from "@/shared/styles/StylesDefault";
import { AdminCard } from "@/features/admin/components/AdminCard";
import { Colors } from '../../shared/constants/colors';
import { PropsAdminCard } from "@/features/admin/types/Admin.types";
import HeadDefault from './../../features/admin/components/HeadDefault';


export default function Administration() {

  const adminOptions : PropsAdminCard[] = [
    {
      id: "1",
      title: "Tipo de Eventos",
      subtitle: "Gestiona las categorías de eventos que puedes ofrecer",
      amount: "8 tipos de eventos",
      icono: "party-popper",
      route: "/admin/event-types",
      textColor: Colors.purple1,
      childcolor: Colors.purple2,
      borderShadowColor: Colors.purple,
      iconColor: "#000000",
      onPress: () => router.push("/admin/event-types"),
    },
    {
      id: "2",
      title: "Paquetes",
      subtitle: "Administra los paquetes que ofreces",
      amount: "3 paquetes",
      icono: "gift",
      route: "/admin/packages-types",
      textColor: Colors.green1,
      childcolor: Colors.green2,
      borderShadowColor: Colors.green,
      iconColor: "#000000",
      onPress: () => router.push("/admin/packages-types"),
    },
    {
      id: "3",
      title: "Servicios",
      subtitle: "Gestiona los servicios que ofreces",
      amount: "3 servicios",
      icono: "star",
      route: "/admin/services-types",
      textColor: Colors.yellow1,
      childcolor: Colors.yellow2,
      borderShadowColor: Colors.yellow,
      iconColor: "#000000",
      onPress: () => router.push("/admin/services-types"),
    },
    {
      id: "4",
      title: "Tipos de comprobantes",
      subtitle: "Configura los tipos de comprobantes fiscales disponibles",
      amount: "2 tipos comproban.",
      icono: "file-document",
      route: "/admin/receipts-types",
      textColor: Colors.blue1,
      childcolor: Colors.blue2,
      borderShadowColor: Colors.blue,
      iconColor: "#000000",
      onPress: () => router.push("/admin/receipts-types"),
    },
    {
      id: "5",
      title: "Formas de pago",
      subtitle: "Administra las formas de pago aceptadas",
      amount: "3 formas pago",
      icono: "credit-card",
      route: "/admin/pay-ways",
      textColor: Colors.orange1,
      childcolor: Colors.orange2,
      borderShadowColor: Colors.orange,
      iconColor: "#000000",
      onPress: () => router.push("/admin/pay-ways"),
    },
  ];
  return (
    <>
    <Stack.Screen 
      options={{ headerShown: false }}
    />
    <SafeAreaView style={styles.container}>
      <View>

        <HeadDefault title="Administración" 
        subtitle="Gestiona la administración de Eventia" 
        icono="sound-mix"/>

      </View>
      
      <View style={styles.headBody}>
        <Text style={StylesDefault.h4Text}>
          Modulos de Configuración
        </Text>

        <Text style={StylesDefault.subText}>
          Administra las opciones disponibles en Eventia
        </Text>
      </View>

      <FlatList
        data={adminOptions}
        keyExtractor={(item) => item.id}
        numColumns={2}
        columnWrapperStyle={{
          justifyContent: "space-between",
          marginBottom: 16,
        }}
        contentContainerStyle={{
          padding: 16,
        }}
        renderItem={({ item }) => (
          <AdminCard
            id={item.id}
            title={item.title}
            subtitle={item.subtitle}
            amount={item.amount}
            icono={item.icono}

            route={item.route}
            onPress={item.onPress}

            textColor={item.textColor}
            childcolor={item.childcolor}
            borderShadowColor={item.borderShadowColor}
            iconColor={item.iconColor}
            
          />
        )}
      />
    </SafeAreaView>
    </>
    
  );
}

const styles = StyleSheet.create({
  container:{
    flex: 1,
  },
  head:{
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    gap: 10,
    paddingLeft: 10,
    paddingVertical: 20,
    borderBottomWidth: 1,
    marginHorizontal: 10,
    borderColor: Colors.gray500,
  },
  headBody:{
    justifyContent: "flex-start",
    gap: 5,
    paddingLeft: 10,
    paddingVertical: 10,
  }
});