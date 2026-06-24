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