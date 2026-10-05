import React, { useState } from "react";
import { View, StyleSheet, Text } from "react-native";
import { HeadTitleDefault } from "../../components/HeadTitleDefault";
import { ActionButton } from "@/shared/components/ActionButton";
import { EventSchedule, PropsStepSchedule } from "../../types/Events.types";
import { ScheduleList } from "../../components/ScheduleList";
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { ModalDefault } from "@/shared/components/ModalDefault";
import { ModalField } from "@/shared/types/Shared.types";
import { Colors } from "@/shared/constants/colors";
import { scheduleSchema } from "../../schemas/schedule.schema";

export function StepSchedule({ data, updateData, readonly }: PropsStepSchedule){
    const [scheduleList, setScheduleList] = useState<EventSchedule[]>(data.schedule || []);

    const [showModal, setShowModal] = useState(false);

    const [isEditing, setIsEditing] = useState(false);

    const [selectedItem, setSelectedItem] = useState<Partial<EventSchedule> | null>(null)

    //Campos para ingresar la actividad en modal
    const fields: ModalField[] = [
        {
            key: "title",
            type: "text",
            title: "Nombre de la actividad",
            placeholder: "Ej: Registro de asistentes",
            icono: "calendar",
            colorIcono: Colors.blue1,
            color: Colors.blue1,
            readonly: false,
            visible: true,
        },
        {
            key: "start_time",
            type: "time",
            title: "Hora de inicio",
            placeholder: "09:00 AM",
            icono: "clock",
            colorIcono: Colors.blue1,
            color: Colors.blue1,
            readonly: false,
            visible: true,
        },
        {
            key: "end_time",
            type: "time",
            title: "Hora de fin",
            placeholder: "10:00 AM",
            icono: "clock",
            colorIcono: Colors.blue1,
            color: Colors.blue1,
            readonly: false,
            visible: true,
        }
    ];

    const handleAddActivity = (activity: Partial<EventSchedule>) => {

        const toTimeString = (value: unknown): string => {
            if (value instanceof Date && !Number.isNaN(value.getTime())) {
            const hours = String(value.getHours()).padStart(2, "0");
            const minutes = String(value.getMinutes()).padStart(2, "0");
            return `${hours}:${minutes}`;
            }

            return typeof value === "string" ? value : "";
        };

        const activityToValidate = {
            ...activity,
            start_time: toTimeString(activity.start_time),
            end_time: toTimeString(activity.end_time),
        };

        const result = scheduleSchema.safeParse(activityToValidate);

        if(result.success){
            const newActivity: EventSchedule = {
                id: Math.random(),
                title: result.data.title,
                start_time: result.data.start_time,
                end_time: result.data.end_time,
                event: 0, // Este valor se asignará al crear el evento completo
            };
            setScheduleList([...scheduleList, newActivity]);
            updateData({
                schedule: [...scheduleList, newActivity]
            });
            setShowModal(false);
        } else {
            const errors = result.error.format()
            alert("Error en los datos de la actividad:\n" + 
                errors.title?._errors + "\n" + 
                errors.start_time?._errors + "\n" + 
                errors.end_time?._errors);
        }
    };

    const handleOpenModal = () => {
        setIsEditing(false)
        setSelectedItem({})
        setShowModal(true);
    }
    const handleCloseModal = () => {
        setIsEditing(false)
        setSelectedItem({})
        setShowModal(false);
    }

    const handleDeleteActivity = (id: number) => {
        const updatedList = scheduleList.filter(activity => activity.id !== id);
        setScheduleList(updatedList);
        updateData({
            schedule: updatedList
        });
    }

    const handleEditActivity = (updatedSchedule: Partial<EventSchedule>) => {

        console.log("Updated Schedule:", updatedSchedule);

        const updatedList: EventSchedule[] = scheduleList.map(activity => {
            if(activity.id !== updatedSchedule.id) return activity;
            
            return{
                ...activity,
                ...updatedSchedule,
                start_time: updatedSchedule.start_time ?? activity.start_time,
                end_time: updatedSchedule.end_time ?? activity.end_time,
            }
        });

        setScheduleList(updatedList);
        updateData({
            schedule: updatedList
        });
        setIsEditing(false);
        setSelectedItem(null);
        setShowModal(false);
    }

    

    const onPressEdit = (item: EventSchedule) => {
        console.log("activo modal")
        setIsEditing(true)
        setSelectedItem(item)
        setShowModal(true)
    }

    return(
        <View style={styles.container}>

            <View style={styles.headContainer}>
                <HeadTitleDefault title="Cronograma del evento"
                subtitle="Agenda de actividades y tiempos"
                color="#000000"
                icono="clock"/>
            </View>

            <View style={styles.clockContainer}>

                <ClockEvent initDate={data.start_datetime ?? ""} 
                endDate={data.end_datetime ?? ""} />

            </View>

            <View style={styles.listContainer}>

                <ScheduleList schedules={scheduleList}
                onDelete={handleDeleteActivity}
                onEdit={onPressEdit}
                readonly={readonly}
                />

            </View>

            <View style={styles.activityContainer}>

                <ActionButton title="Agregar actividad"
                onPress={handleOpenModal}
                icono="add-circle"
                color="#ffffff"
                colorsButton={["#541360","#AE27C6","#AE27C6"]}
                readonly={readonly}/>

            </View>

           
             <ModalDefault
                isVisible={showModal}
                onRequestClose={handleCloseModal}
                title="Ingresar datos de la actividad"
                subtitle="Complete los campos para agregar una nueva actividad"
                readonly={readonly}
                fields={fields}
                onPress={isEditing ? handleEditActivity : handleAddActivity}

                isEditing={isEditing}
                selectedItem={selectedItem}
                titleEdit="Editar actividad programada"
                subtitleEdit="Modifa los datos de la actividad"
             />
        </View>
    );
}

function ClockEvent({ initDate, endDate }: { initDate: string; endDate: string }) {
    const start = new Date(initDate);
    const end = new Date(endDate);

    return(
        <View style={styles.clockEventContainer}>
            <View style={styles.clockBox}>
                <FontAwesome name="calendar-o" size={24} color="black" />
                <Text>Fecha del evento</Text>
                <Text>{start.toLocaleDateString()}</Text>
            </View>
            <View style={styles.clockBox}>
                <FontAwesome name="clock-o" size={24} color="black" />
                <Text>Hora de inicio</Text>
                <Text>{start.toLocaleTimeString([], {
                        hour: '2-digit',
                        minute: '2-digit',
                    })}</Text>
            </View>
            <View style={styles.clockBox}>
                <FontAwesome name="clock-o" size={24} color="black" />
                <Text>Hora de fin</Text>
                <Text>{end.toLocaleTimeString([], {
                        hour: '2-digit',
                        minute: '2-digit',
                    })}</Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    headContainer: {
        flex: 0.2,
    },
    clockContainer: {
        flex: 0.2,
        paddingHorizontal: 15,
    },
    listContainer: {
        flex: 1,
        paddingTop: 10,
        paddingHorizontal: 20,
    },
    activityContainer: {
        flex:0,
        alignItems: "center",
        justifyContent: "center",
        padding: 15,
    },
    keyboardContainer:{
        flex:1,
    },
    modalOverlay:{
        flex:1,
        justifyContent:"flex-end",
        backgroundColor:"rgba(0,0,0,0.4)",
    },
    modalContainer:{
        maxHeight:"70%",
        backgroundColor:"#fff",
        borderTopLeftRadius:25,
        borderTopRightRadius:25,
        padding:20,
        flexDirection: "column",
    },
    modalHeader:{
        flexDirection:"row",
        justifyContent:"space-between",
        alignItems:"center",
        marginBottom:20,
    },
    modalInputContainer:{
        gap: 15,
    },
    modalButtons:{
        flexDirection:"row",
        justifyContent:"space-between",
        marginTop:20,
    },
    clockEventContainer:{
        flexDirection: "row",
        justifyContent: "space-around",
        padding: 10,
        backgroundColor: "#F0F0F0",
        borderRadius: 10,
        borderWidth: 3,
        borderColor: "#D9D9D9",
        marginBottom: 15,
    },
    clockBox:{
        alignItems: "center",
        gap: 5,
    }
})