import React, { useState } from "react";
import { View, StyleSheet, Modal, KeyboardAvoidingView, ScrollView, Text, Pressable, Platform } from "react-native";
import { HeadTitleDefault } from "../../components/HeadTitleDefault";
import { ActionButton } from "@/shared/components/ActionButton";
import { EventSchedule, PropsStepSchedule } from "../../types/Events.types";
import { InputText } from "../../components/InputText";
import Ionicons from "@expo/vector-icons/build/Ionicons";
import { StylesDefault } from "../../../../shared/styles/StylesDefault";
import { ScheduleList } from "../../components/ScheduleList";
import FontAwesome from '@expo/vector-icons/FontAwesome';

export function StepSchedule({ data, updateData, readonly }: PropsStepSchedule){
    const [scheduleList, setScheduleList] = useState<EventSchedule[]>(data.schedule || []);

    const [showModal, setShowModal] = useState(false);

    const [activities, setActivities] = useState({
        title: "",
        start_time: "",
        end_time: "",
    });

    const handleAddActivity = () => {
        if(activities.title.trim() && activities.start_time.trim() && activities.end_time.trim()){
            const newActivity: EventSchedule = {
                id: Math.random(),
                title: activities.title,
                start_time: activities.start_time,
                end_time: activities.end_time,
                event: 0, // Este valor se asignará al crear el evento completo
            };
            setScheduleList([...scheduleList, newActivity]);
            updateData({
                schedule: [...scheduleList, newActivity]
            });
            setActivities({
                title: "",
                start_time: "",
                end_time: ""
            });
            setShowModal(false);
        } else {
            alert("Todos los campos son obligatorios");
        }
    };

    const handleCloseModal = () => {
        setActivities({
            title: "",
            start_time: "",
            end_time: ""
        });
        setShowModal(false);
    }

    const handleDeleteActivity = (id: number) => {
        const updatedList = scheduleList.filter(activity => activity.id !== id);
        setScheduleList(updatedList);
        updateData({
            schedule: updatedList
        });
    }

    const handleEditActivity = (updatedSchedule: EventSchedule) => {
        const updatedList = scheduleList.map(activity => 
            activity.id === updatedSchedule.id ? updatedSchedule : activity
        );
        setScheduleList(updatedList);
        updateData({
            schedule: updatedList
        });
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

            <ScrollView style={styles.listContainer}>

                <ScheduleList schedules={scheduleList}
                onDelete={handleDeleteActivity}
                onEdit={handleEditActivity}
                readonly={readonly}
                />

            </ScrollView>

            <View style={styles.activityContainer}>

                <ActionButton title="Agregar actividad"
                onPress={() => setShowModal(true)}
                icono="add-circle"
                color="#ffffff"
                colorsButton={["#541360","#AE27C6","#AE27C6"]}
                readonly={readonly}/>

            </View>

            { /* aquí iría el modal para ingresar las actividades */}
             <Modal 
                 visible={showModal}
                 transparent
                 animationType="slide"
             >
                 <KeyboardAvoidingView 
                     behavior={Platform.OS === "ios" ? "padding" : "height"}
                     style={styles.keyboardContainer}
                 >
                     <View style={styles.modalOverlay}>
                         <View style={styles.modalContainer}>
                             <ScrollView 
                                 scrollEnabled={true}
                                 keyboardShouldPersistTaps="handled"
                                 contentContainerStyle={{ flexGrow: 1 }}
                             >
                                 <View style={styles.modalHeader}>
                                     <Text style={StylesDefault.h3Text}>
                                         Ingresar datos de la actividad
                                     </Text>

                                     <Pressable onPress={handleCloseModal}>
                                         <Ionicons
                                             name="close"
                                             size={28}
                                             color="#000"
                                         />
                                     </Pressable>
                                 </View>
                                 <View style={styles.modalInputContainer}>
                                     <InputText title="Actividad"
                                     icono="list-ul"
                                     colorIcono="#000000"
                                     color="#000000"
                                     placeholder="Actividad a realizar"
                                     value={activities.title}
                                     onChangeText={(text) => setActivities({...activities, title: text})}
                                     readonly={readonly}/>
                                     <InputText title="Hora de inicio"
                                     icono="clock-o"
                                     colorIcono="#000000"
                                     color="#000000"
                                     placeholder="Hora de inicio"
                                     value={activities.start_time}
                                     onChangeText={(text) => setActivities({...activities, start_time: text})}
                                     readonly={readonly}/>                            
                                     <InputText title="Hora de finalización"
                                     icono="clock-o"
                                     colorIcono="#000000"
                                     color="#000000"
                                     placeholder="Hora de finalización"
                                     value={activities.end_time}
                                     onChangeText={(text) => setActivities({...activities, end_time: text})}
                                     readonly={readonly}/>
                                 </View>
                             </ScrollView>
                             <View style={styles.modalButtons}>
                                 <ActionButton title="Cancelar"
                                 icono="close"
                                 onPress={handleCloseModal}
                                 colorsButton={["#605262","#605262","#605262"]}
                                 color="#ffffff"
                                 readonly={readonly}/>
                                 <ActionButton title="Guardar"
                                 icono="save"
                                 onPress={handleAddActivity}
                                 colorsButton={["#541360","#AE27C6","#AE27C6"]}
                                 color="#ffffff"
                                 readonly={readonly}/>                            
                             </View>
                         </View>
                     </View>
                 </KeyboardAvoidingView>
             </Modal>
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
});