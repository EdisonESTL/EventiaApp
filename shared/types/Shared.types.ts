import FontAwesome from "@expo/vector-icons/build/FontAwesome";
import Ionicons from "@expo/vector-icons/Ionicons";
import { ColorValue } from "react-native";

export type GradientColors = readonly [
    ColorValue,
    ColorValue,
    ...ColorValue[]
]

export type PropsActionButton = {
  title: string;
  icono: keyof typeof Ionicons.glyphMap;
  onPress: () => void;
  colorsButton: GradientColors;
  color: string;
  readonly?: boolean | true;
}

//Para CircleButton
export type PropsCircleButton ={
  icono: keyof typeof Ionicons.glyphMap;
  onPress: () => void;
  colorIcono: string;
  backgroundColor: string;
  readonly?: boolean;
}

export type PropsInputText={
  title: string;
  icono: keyof typeof FontAwesome.glyphMap;
  colorIcono: string;
  color: string;
  placeholder: string;
  readonly: boolean | true;
}

//Define la apriencia del campo en el modal
export type ModalField = {
  type: "text" | "switch"
  key: string;
  title: string;
  placeholder: string;

  icono: keyof typeof FontAwesome.glyphMap;
  colorIcono: string;
  color: string;

  readonly?: boolean;
  visible?: boolean;
};