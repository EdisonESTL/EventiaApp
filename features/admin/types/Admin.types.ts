import { MaterialCommunityIcons } from "@expo/vector-icons";

export interface PropsAdminCard {
  id: string;
  title: string;
  subtitle: string;
  amount: string;
  route: string;
  onPress: () => void;
  icono?: keyof typeof MaterialCommunityIcons.glyphMap;
  
  textColor: string;
  borderShadowColor: string;
  childcolor: string;
  iconColor: string;
}

export interface PropsEventsTypes {
  id: string;
  name: string;
  deleted: number;
}

export interface PropsPackages {
  id: string;
  name: string;
  deleted: number;
}

export interface PropsServices {
  id: string;
  name: string;
  price: string;
  description: string;
  deleted: number;
}

export interface PropsReceiptTypes {
  id: string;
  name: string;
  icono: string;
  deleted: number;
}

export interface PropsPaymentMethods {
  id: string;
  name: string;
  deleted: number;
}