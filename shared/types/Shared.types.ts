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