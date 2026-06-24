import React, {useState, useEffect, useCallback} from "react";
import { Text, TextInput, View, StyleSheet, FlatList, Image, Pressable } from "react-native";
import EvilIcons from '@expo/vector-icons/EvilIcons';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { getEvents } from "../services/eventService";
import { EventListItem, PropsSearchBar, PropsInfoRow } from "../types/Events.types";
import { useFocusEffect } from "@react-navigation/native";
import { StylesDefault } from "../styles/StylesDefault";
import { router } from "expo-router";

export function FilterableEventsTable() {
  const [filterText, setFilterText] = useState("");
  const [events, setEvents] = useState<EventListItem[]>([]);

  const loadEvents = () => {
    const data = getEvents();
    setEvents(data);
  };
  
  // se ejecuta al montar
  useEffect(() => {
    loadEvents();
  }, []);
  
  // se ejecuta cada vez que vuelves a la pantalla
  useFocusEffect(
    useCallback(() => {
      loadEvents();
    }, [])
  );

  const filteredEvents = events.filter(event =>
    event.name.toLowerCase().includes(filterText.toLowerCase())
  );

  return (
    <View style={StylesDefault.container}>
      <SearchBar filterText={filterText} setFilterText={setFilterText} />
      <EventsTable events={filteredEvents} />
    </View>
  );
}

const formatDate = (dateString: string) => {
    if (!dateString) return "Sin fecha";

    const date = new Date(dateString);

    return date.toLocaleString("es-EC", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
};

function SearchBar({ filterText, setFilterText }: PropsSearchBar) {
  return (
    <View style={styles.SearchBar}>
      <TextInput placeholder="Buscar eventos"
      value={filterText}
      onChangeText={setFilterText}
      style={[StylesDefault.bodyText, styles.textBarSearch]}></TextInput>
      <EvilIcons name="search" size={24} color="black" />
    </View>
  );
}

function EventsTable({ events }: { events: EventListItem[] }) {
  return (
    <View style={styles.EventsTable}>
      <FlatList
        data={events}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <EventItem item={item} />}
        ListHeaderComponent={<Text style={StylesDefault.subText}>Lista de eventos</Text>}
        ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
      />
    </View> 
  );
}

function EventItem({item}: {item: EventListItem}){
  const eventImage = getEventImage(item.type);
  return(
    <Pressable style={styles.ItemTable}
    onPress={() => router.push({
      pathname: "/events/show",
      params: {
        id: item.id,
        name: item.name
      }
    })}
    >
      <Image source={eventImage} style={styles.imageItem} />
      <View style={styles.infoContainer}>
        <Text style={StylesDefault.bodyTextBold}>{item.name}</Text>
        <InfoRow icono="calendar" text={formatDate(item.date)} />
        <InfoRow icono="location" text={item.location} />
        <View style={styles.arrowContinue}>
          <MaterialIcons name="keyboard-arrow-right" size={24} color="black" />
        </View>
      </View>
    </Pressable>
  );
}

function getEventImage(type: number) {
  switch (type) {
    case 1:
      return require("../../../assets/images/weedingDefault.png");

    case 2:
      return require("../../../assets/images/birthdayDefault.png");

    case 3:
      return require("../../../assets/images/corporativeDefault.png");

    default:
      return require("../../../assets/images/default.png");
  }
}

function InfoRow({icono, text}:PropsInfoRow){
  return(
    <View style={styles.rowItem}>
          <EvilIcons name={icono} size={24} color="black" />
          <Text style={StylesDefault.subText}>{text}</Text>
        </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
  SearchBar: {
    flexDirection:"row",
    justifyContent: "space-between",
    borderColor: "#939598",
    borderWidth: 1,
    borderRadius: 50,
    margin: 10,
    paddingHorizontal:10,
    alignItems: "center",
  },
  EventsTable: {
    flex: 1,    
  },
  ItemTable: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: "#f0f0f0",
    marginHorizontal: 10,
    borderRadius: 20,
    elevation: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.3,
    shadowRadius: 1,
  },
  imageItem: {
    width: 80,
    height: 97,
    marginRight: 10,
    borderTopLeftRadius: 20,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  infoContainer: {
    flex: 1,
    justifyContent: "center",
    padding: 8,
  },
  rowItem: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 5,
  },
  arrowContinue: {
    position: 'absolute',
    right: 10,
  },
  textBarSearch:{
    flex:1,
  }
});