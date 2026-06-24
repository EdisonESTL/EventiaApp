import { PropsAdminCard } from "@/features/admin/types/Admin.types"
import { MaterialCommunityIcons, AntDesign } from "@expo/vector-icons"
import React from "react"
import { View, Text, StyleSheet, Pressable} from "react-native"
import { StylesDefault } from "../../events/styles/StylesDefault"
import { Colors } from "../../events/constants/colors"

export function AdminCard({
  title, 
  subtitle, 
  amount, 
  onPress, 
  icono,
  textColor,
  borderShadowColor,
  childcolor,
  iconColor,
}:PropsAdminCard){
  return(
    <Pressable style={[styles.container, 
      {
        borderColor: borderShadowColor,
        shadowColor: borderShadowColor,
      }]}
    onPress={onPress}>
      <View style={[styles.head, {
        backgroundColor: childcolor
      }]}>
        <MaterialCommunityIcons name={icono} size={32} color={iconColor} />
      </View>
      <View style = {styles.body}>
        <Text style={[StylesDefault.h3Text, {color: textColor}]}>
          {title}
        </Text>

        <Text style={StylesDefault.subText}>
          {subtitle}
        </Text>

        <View style={[styles.amount, {
          backgroundColor: childcolor,
        }]}>
          <Text style={[StylesDefault.subText,{color: textColor}]}>
            {amount}
          </Text>
        </View>
      </View>

      <View style={styles.footer}>
        <Text style={[StylesDefault.subTextBold, {color: textColor}]}>
          Ver y gestionar
        </Text>

        <AntDesign name="right" size={15} color="black" />
      </View> 
       
    </Pressable>
  )
}

const styles = StyleSheet.create({
    container:{
      backgroundColor: "#ffffff",
      width: "48%",
      alignItems: "center",

      borderWidth: 2,
      borderRadius: 10,

      padding:5,
      gap: 10,

      // Android
      elevation: 5,

      // iOS
      shadowOffset: {
          width: 0,
          height: 2,
      },
      shadowOpacity: 0.15,
      shadowRadius: 6,
    },
    footer:{
      flexDirection: "row",
      alignItems: "center",
      gap: 30,
      borderTopWidth: 1,
      paddingVertical: 5,
      borderColor: Colors.gray500,
      marginTop: "auto",
    },
    head:{
      width: 50,
      height: 50,
      borderRadius: 10,
      justifyContent: "center",
      alignItems: "center",
      marginTop: 5,
    },
    body:{
      gap: 10,
      padding: 5,
    },
    amount:{
      alignSelf: "flex-start",

      borderRadius: 50,

      paddingVertical: 5,
      paddingHorizontal: 10,
    }
})