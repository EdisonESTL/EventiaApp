import {Tabs} from "expo-router";
import { Ionicons, MaterialCommunityIcons, AntDesign } from "@expo/vector-icons";
import { Colors } from "@/features/events/constants/colors";

export default function TabLayout() {
  return (
    <Tabs screenOptions={{ tabBarActiveTintColor: Colors.secondary }}>
        <Tabs.Screen
        name="index"
        options={{
            title: 'Inicio',
            tabBarIcon: ({ color, size }) => (
            <Ionicons
              name="home"
              size={size}
              color={color}
            />
          ),
        }}
        />

        <Tabs.Screen
        name="events"
        options={{
            title: 'Eventos',
            tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons
              name="party-popper"
              size={size}
              color={color}
            />
          ),
        }}
        />

        <Tabs.Screen
        name="admin"
        options={{
            title: 'Administración',
            tabBarIcon: ({ color, size }) => (
            <AntDesign
              name="product"
              size={size}
              color={color}
            />
          ),
        }}
        />
    </Tabs>
  );
}