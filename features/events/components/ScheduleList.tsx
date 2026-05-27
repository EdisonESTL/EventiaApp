import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList
} from "react-native";

import Ionicons from "@expo/vector-icons/Ionicons";
import { PropsScheduleList } from "../types/Events.types";


export function ScheduleList({ schedules}: PropsScheduleList) {
  // Convierte "4 pm" -> minutos
  const convertToMinutes = (time: string) => {
    const clean = time.trim().toLowerCase();

    const [hourPart, modifier] = clean.split(" ");

    let hour = parseInt(hourPart);

    if (modifier === "pm" && hour !== 12) {
      hour += 12;
    }

    if (modifier === "am" && hour === 12) {
      hour = 0;
    }

    return hour * 60;
  };

  // Ordenar actividades
  const sortedSchedules = [...schedules].sort((a, b) => {
    return (
      convertToMinutes(a.start_time) -
      convertToMinutes(b.start_time)
    );
  });

  return (
    <FlatList
      data={sortedSchedules}
      keyExtractor={(item, index) =>
        item.id?.toString() ?? index.toString()
      }
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.container}
      style={styles.list}
      renderItem={({ item: schedule, index }) => {

        const isFirst = index === 0;
        const isLast = index === sortedSchedules.length - 1;

        return (
          <View style={styles.wrapper}>

            {/* Timeline */}
            <View style={styles.timelineContainer}>

              {/* Línea superior */}
              {!isFirst && (
                <View style={styles.topLine} />
              )}

              {/* Círculo */}
              <View style={styles.circle} />

              {/* Línea inferior */}
              {!isLast && (
                <View style={styles.bottomLine} />
              )}

            </View>

            {/* Card */}
            <View style={styles.card}>

              {/* Horas */}
              <View style={styles.hourContainer}>
                <Text style={styles.hour}>
                  {schedule.start_time}
                </Text>

                <Text style={styles.hour}>
                  {schedule.end_time}
                </Text>
              </View>

              {/* Título */}
              <View style={styles.titleContainer}>
                <Text style={styles.title}>
                  {schedule.title}
                </Text>
              </View>

              {/* Menú */}
              <TouchableOpacity>
                <Ionicons
                  name="ellipsis-vertical"
                  size={20}
                  color="#666"
                />
              </TouchableOpacity>

            </View>
          </View>
        );
      }}
      scrollEnabled={false}
      nestedScrollEnabled={true}
    />
  );
}

const styles = StyleSheet.create({
  list: {
    maxHeight: 400,
  },

  container: {
    paddingVertical: 20,
  },

  wrapper: {
    flexDirection: "row",
    alignItems: "stretch",
    marginBottom: 20,
  },

  timelineContainer: {
    width: 40,
    alignItems: "center",
    position: "relative",
  },

  topLine: {
    position: "absolute",
    top: 0,
    width: 2,
    height: "50%",
    backgroundColor: "#D9D9D9",
  },

  bottomLine: {
    position: "absolute",
    bottom: 0,
    width: 2,
    height: "50%",
    backgroundColor: "#D9D9D9",
  },

  circle: {
    width: 22,
    height: 22,
    borderRadius: 11,
    borderWidth: 2,
    borderColor: "#555",
    backgroundColor: "#FFF",
    marginTop: 25,
    zIndex: 2,
  },

  card: {
    flex: 1,
    backgroundColor: "#FFF",

    borderRadius: 22,
    borderWidth: 1,
    borderColor: "#E5E5E5",

    paddingVertical: 18,
    paddingHorizontal: 16,

    flexDirection: "row",
    alignItems: "center",

    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 2,
  },

  hourContainer: {
    marginRight: 18,
    gap: 8,
  },

  hour: {
    fontSize: 14,
    fontWeight: "700",
    color: "#333",
  },

  titleContainer: {
    flex: 1,
    justifyContent: "center",
  },

  title: {
    fontSize: 15,
    fontWeight: "600",
    color: "#222",
  },
});