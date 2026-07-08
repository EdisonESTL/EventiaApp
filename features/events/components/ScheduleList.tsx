import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList
} from "react-native";
import { EventSchedule, PropsScheduleList } from "../types/Events.types";
import { Colors } from "../../../shared/constants/colors";
import { CircleButton } from "../../../shared/components/CircleButton";
import { StylesDefault } from "../../../shared/styles/StylesDefault";


export function ScheduleList({ schedules, onDelete, onEdit, readonly }: PropsScheduleList) {
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
      renderItem={({ item, index }) => (
        <ScheduleItem
          schedule={item}
          onDelete={onDelete}
          onEdit={onEdit}
          readonly={readonly}
          index={index}
          lenghtSchedule={sortedSchedules.length}
        />
      )}
      scrollEnabled={false}
      nestedScrollEnabled={true}
    />
  );
}

function ScheduleItem({ schedule, onDelete, onEdit, readonly, lenghtSchedule, index }: 
  { 
    schedule: EventSchedule; 
    onDelete: (id: number) => void; 
    onEdit: (schedule: EventSchedule) => void; 
    readonly: boolean,
    index: number,
    lenghtSchedule: number
  })
  {
    const isFirst = index === 0;
    const isLast = index === lenghtSchedule - 1;
  
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
                <Text style={StylesDefault.subTextBold}>
                  {schedule.start_time}
                </Text>

                <Text style={StylesDefault.subTextBold}>
                  {schedule.end_time}
                </Text>
              </View>

              {/* Título */}
              <View style={styles.titleContainer}>
                <Text style={StylesDefault.bodyText}>
                  {schedule.title}
                </Text>
              </View>

              <View style={styles.bottomsContainer}>

                {/* Editar */}
                <TouchableOpacity>
                  {!readonly && (
                    <CircleButton icono="pencil"
                    onPress={() => onEdit(schedule)}
                    colorIcono="#ffffff"
                    backgroundColor={Colors.primary}
                    />
                  )}
                </TouchableOpacity>

                {/* Eliminar */}
                <TouchableOpacity>
                  {!readonly && (
                    <CircleButton icono="trash"
                    onPress={() => onDelete(schedule.id!)}
                    colorIcono="#ffffff"
                    backgroundColor={Colors.delete}
                    />
                  )}
                </TouchableOpacity>
              </View>
            </View>
        </View>
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
    marginBottom: 0,
  },

  timelineContainer: {
    width: 20,
    alignItems: "center",
    position: "relative",
  },

  topLine: {
    position: "absolute",
    top: 0,
    width: 2,
    height: 100,
    backgroundColor: "#D9D9D9",
  },

  bottomLine: {
    position: "absolute",
    bottom: 0,
    width: 2,
    height: 100,
    backgroundColor: "#D9D9D9",
  },

  circle: {
    width: 13,
    height: 13,
    borderRadius: 11,
    borderWidth: 2,
    borderColor: Colors.gray500,
    backgroundColor: "#FFF",
    marginTop: 30,
    zIndex: 2,
  },

  card: {
    flex: 1,
    backgroundColor: "#FFF",

    borderRadius: 22,
    borderWidth: 1,
    borderColor: "#E5E5E5",

    paddingVertical: 16,
    paddingHorizontal: 16,

    marginVertical: 3,

    flexDirection: "row",
    alignItems: "center",

    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 2,

    gap: 5,
  },

  hourContainer: {
    marginRight: 15,
    gap: 8,
  },

  titleContainer: {
    flex: 1,
    justifyContent: "center",
  },

  bottomsContainer: {
    flexDirection: "row",
    gap: 8,
  },
});