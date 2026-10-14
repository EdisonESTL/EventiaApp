import React, {useState} from "react";
import { View, Text, StyleSheet } from "react-native";
import DropDownPicker from 'react-native-dropdown-picker';
import AntDesign from '@expo/vector-icons/AntDesign';
import { PropsDropDownPick } from "../types/Events.types";
import { StylesDefault } from "../../../shared/styles/StylesDefault";

export function DropDownPick({
  title,
  icono,
  value,
  setValue,
  items,
  placeholder,
  zIndex,
  readonly
}:PropsDropDownPick){
    //-------------  Picker Tipo de Evento   ------------------
    const [open, setOpen] = useState(false);
    return(
    <View style ={[styles.container, {zIndex}]}>
      <Text style ={StylesDefault.bodyText}>{title}</Text>

      <View style={styles.inputTextDefault}>
        <AntDesign name={icono} size={20} color="black" />      
          <DropDownPicker
          mode="BADGE"
          open={readonly ? false : open}
          value={value}
          items={items}
          setOpen={setOpen}
          setValue={(callback) => {
            const val = callback(value);
            setValue(val);
          }}
          listMode="MODAL"
          modalTitle={title}
          modalContentContainerStyle={{
            backgroundColor: '#ff5r99',
            width: '90%',
            alignSelf: 'center',
            borderRadius: 10,
            padding: 10,
          }}
          modalTitleStyle={{
            fontSize: 18,
            fontWeight: 'bold',
            color: '#000000',
          }}
          modalProps={{
            animationType: 'slide',
            transparent: false,
          }}
          placeholder={placeholder}
          style={styles.dropdown}
          disabled= {readonly}
          />
      </View>
    </View>
    );
  }

  const styles = StyleSheet.create({
    container:{
      justifyContent: "center",
      paddingHorizontal:10,
      paddingVertical:5,
      gap: 5,
    },
    inputTextDefault:{
      flexDirection: "row",
      alignItems: "center",
      gap: 13,
      paddingTop: 5,
    },
    dropdown: {
      width: "90%",
      margin:0,
      borderColor: '#ccc',
    },
  });