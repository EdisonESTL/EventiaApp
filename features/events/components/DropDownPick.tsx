import React, {useState} from "react";
import { View, Text, StyleSheet } from "react-native";
import DropDownPicker from 'react-native-dropdown-picker';
import AntDesign from '@expo/vector-icons/AntDesign';
import { PropsDropDownPick } from "../types/Events.types";
import { StylesDefault } from "../styles/StylesDefault";
import { readonly } from 'zod';

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
        open={readonly ? false : open}
        value={value}
        items={items}
        setOpen={setOpen}
        setValue={(callback) => {
          const val = callback(value);
          setValue(val);
        }}
        placeholder={placeholder}
        listMode="SCROLLVIEW"
        style={styles.dropdown}
        dropDownContainerStyle={styles.dropdown}
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
    zIndex: 1000,
  },
  inputTextDefault:{
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    paddingTop: 5,
  },
  dropdown: {
    width: 350,
    margin:0,
    borderColor: '#ccc',
  },
});