import React, {useEffect, useState} from "react";
import { View, StyleSheet, Text, Modal, Pressable, FlatList } from "react-native";
import { HeadTitleDefault } from "../../components/HeadTitleDefault";
import { ActionButton } from "../../components/ActionButton";
import { EventService, PropsResumeServices, PropsStepServices, Service } from "../../types/Events.types";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { StylesDefault } from "../../styles/StylesDefault";
import { ServicesTable } from "../../components/ServicesTable";
import Ionicons from "@expo/vector-icons/Ionicons";
import { getServices } from "../../services/eventService";

export function StepServices({ data, updateData }: PropsStepServices){
    const [availableServices, setAvailableServices] = useState<Service[]>([]);

    const [services, setServices] = useState<EventService[]>([]);
    const [showModal, setShowModal] = useState(false);

    function addService(service: Service) {
        const exist = services.some(item => item.service.id === service.id);

        if (exist) return;

        const newEventService: EventService = {
            event: data.id || 0,
            quantity: 1,
            id: service.id,

            service: service,
        };

        updateData({
            services: newEventService ? [...(data.services || []), newEventService] : [],
        });

        setShowModal(false);
    }

    const totalCost = services.reduce(
        (acc, service) => acc + service.service.price,
        0
    );

    useEffect(() => {
        const availableServices = getServices();
        setAvailableServices(availableServices);

        if(data.services){
            setServices(data.services);
        }

    }, [data.services]); 

    useEffect(() => {
        updateData({
            total_cost: totalCost,
        });
    }, [totalCost, updateData]);

    return(
        <View style={styles.container}>
            <View style={styles.title}>
                <HeadTitleDefault color="#000000" title="Servicios contratados"
                subtitle="Servicios para el evento"
                icono="gift"/>
            </View>

            <View style={styles.costService}>
                <ResumeServices icono="package" 
                title="Paquete seleccionado"
                value={data.event_package?.name || "Ninguno"}
                subTitle="Costo total servicios"
                valueCost={totalCost}/>
            </View>

            <View style={styles.listService}>
                <ServicesTable services={data.services || []}/>
            </View>

            <View style={styles.addButton}>
                <ActionButton title="Añadir más servicios"
                icono="add"
                onPress={() => setShowModal(true)}
                colorsButton={["#541360","#AE27C6","#AE27C6"]}
                color="#ffffff"/>
            </View>

            <Modal
                visible={showModal}
                transparent
                animationType="slide"
            >
                <View style={styles.modalOverlay}>
                    <View style={styles.modalContainer}>

                        <View style={styles.modalHeader}>
                            <Text style={StylesDefault.h3Text}>
                                Seleccionar servicio
                            </Text>

                            <Pressable onPress={() => setShowModal(false)}>
                                <Ionicons
                                    name="close"
                                    size={28}
                                    color="#000"
                                />
                            </Pressable>
                        </View>

                        <FlatList
                            data={availableServices}
                            keyExtractor={(item) => item.id.toString()}
                            renderItem={({ item }) => (
                                <Pressable
                                    style={styles.modalItem}
                                    onPress={() => addService(item)}
                                >
                                    <View style={{ flex: 1 }}>
                                        <Text style={StylesDefault.bodyTextBold}>
                                            {item.name}
                                        </Text>

                                        <Text style={StylesDefault.bodyText}>
                                            {item.description}
                                        </Text>
                                    </View>

                                    <Text style={StylesDefault.bodyTextBold}>
                                        ${item.price}
                                    </Text>
                                </Pressable>
                            )}
                            ItemSeparatorComponent={() =>
                                <View style={{ height: 10 }} />
                            }
                            scrollEnabled={true}
                            nestedScrollEnabled={true}
                        />

                    </View>
                </View>
            </Modal>
        </View>
    );    
}

function ResumeServices({icono, title, value, subTitle, valueCost}:PropsResumeServices){
    return(
        <View style={styles.containerResumeServices}>
            <View style={styles.containerTitle}>
                <View style={styles.containerIco}>
                    <MaterialCommunityIcons name={icono} size={30} color="black" />
                </View>
                <View style={styles.containerText}>
                    <Text style={StylesDefault.subText}>{title}</Text>
                    <Text style={StylesDefault.h3Text}>{value}</Text>
                </View>
            </View>
            <View style={styles.containerText}>
                <Text style={StylesDefault.subText}>{subTitle}</Text>
                <Text style={StylesDefault.h3Text}>{valueCost}</Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container:{
        flex:1,
    },
    title:{
        flex:1,
    },
    costService:{
        flex:1,
        paddingHorizontal: 10,
    },
    listService:{
        flex:3,
        paddingHorizontal: 10,
        paddingVertical: 20,
    },
    addButton:{
        flex: 1,
        flexDirection: "row",
        justifyContent: "center"
    },
    containerResumeServices:{
        flex:0,
        flexDirection:"row",
        alignContent: "space-between",
        alignItems: "center",
        backgroundColor: "#7E258E33",
        paddingVertical: 20,
        paddingLeft:20,
        borderRadius: 10,
    },
    containerTitle:{
        flex:1,
        flexDirection:"row",
        alignItems: "center",
    },
    containerText:{
        flex: 1,
        alignContent: "center",
        alignItems: "center",
        gap: 10,
    },
    containerIco:{
        flex: 0,
        alignContent: "center",
        alignItems: "center",
    },
    modalOverlay:{
        flex:1,
        justifyContent:"flex-end",
        backgroundColor:"rgba(0,0,0,0.4)",
    },

    modalContainer:{
        height:"70%",
        backgroundColor:"#fff",
        borderTopLeftRadius:25,
        borderTopRightRadius:25,
        padding:20,
    },

    modalHeader:{
        flexDirection:"row",
        justifyContent:"space-between",
        alignItems:"center",
        marginBottom:20,
    },

    modalItem:{
        flexDirection:"row",
        alignItems:"center",
        backgroundColor:"#f5f5f5",
        padding:15,
        borderRadius:12,
        gap:10,
    },
})