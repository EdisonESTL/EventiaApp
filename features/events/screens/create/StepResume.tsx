import React from "react";
import { View, StyleSheet, ScrollView, Text } from "react-native";
import { HeadTitleDefault } from "../../components/HeadTitleDefault";
import { PropsStepResume } from "../../types/Events.types";
import AntDesign from '@expo/vector-icons/AntDesign';
import { StylesDefault } from "../../styles/StylesDefault";

export function StepResume({data, updateData}: PropsStepResume){
    const start = new Date(data.start_datetime || "");
    const end = new Date(data.end_datetime || "");

    console.log("Data en StepResume:", data);
    return(
        <View style={styles.container}>
            <View style={styles.titleContainer}>
                <HeadTitleDefault title="Resumen del evento"
                subtitle="Revisa los detalles antes de crear el evento"
                color="#000000"
                icono="clipboard-text"/>
            </View>
            
            <ScrollView style={styles.scrollContainer}>
                <Text style={[StylesDefault.h4Text, styles.titleBox]}>
                    Cliente
                </Text>
                <View style={styles.textBox}>
                    {data?.event_customer !== undefined && (
                        <SectionText
                            title={data.event_customer.name}
                            ico="user"
                        />
                    )}
                    {data?.event_customer !== undefined && (
                        <SectionText
                            title={data.event_customer.phone}
                            ico="phone"
                        />
                    )}
                    {data?.event_customer !== undefined && (
                        <SectionText
                            title={data.event_customer.email}
                            ico="mail"
                        />
                    )}
                </View>

                <Text style={[StylesDefault.h4Text, styles.titleBox]}>
                    Evento
                </Text>
                <View style={styles.textBox}>
                    {data?.name !== undefined && (
                        <SectionText
                            title={data.name}
                            ico="ruby"
                        />
                    )}

                    {data?.start_datetime !== undefined && (
                        <SectionText
                            title={start.toLocaleDateString()}
                            ico="calendar"
                        />
                    )}

                    {data?.start_datetime !== undefined && (
                        <SectionText
                            title={start.toLocaleTimeString([], {
                                hour: '2-digit',
                                minute: '2-digit',
                            }) + " - " + end.toLocaleTimeString([], {
                                hour: '2-digit',
                                minute: '2-digit',
                            })}
                            ico="clock-circle"
                        />
                    )}

                    {data?.location !== undefined && (
                        <SectionText
                            title={data.location}
                            ico="environment"
                        />
                    )}

                    {data?.event_package !== undefined && (
                        <SectionText
                            title={data.event_package.name}
                            ico="product"
                        />
                    )}
                </View>

                <Text style={[StylesDefault.h4Text, styles.titleBox]}>
                    Finanzas
                </Text>
                <View style={styles.textBox}>
                    {data?.receipt_type !== undefined && (
                        <SectionOnlyText
                            title="Tipo de recibo"
                            subtitle={data.receipt_type.name}
                        />
                    )}
                    {data?.total_cost !== undefined && (
                        <SectionOnlyText
                            title="Costo total"
                            subtitle={data.total_cost.toString()}
                        />
                    )}
                    {data?.paid_amount !== undefined && (
                        <SectionOnlyText
                            title="Abono"
                            subtitle={data.paid_amount.toString()}
                        />
                    )}
                    {data?.total_cost !== undefined && (
                        <SectionOnlyText
                            title="Saldo pendiente"
                            subtitle={`${parseFloat(data.total_cost || "0") - parseFloat(data.paid_amount || "0")}`}
                        />
                    )}
                    {data?.payment_method !== undefined && (
                        <SectionOnlyText
                            title="Método de pago"
                            subtitle={data.payment_method.name}
                        />
                    )}
                </View>

                <Text style={[StylesDefault.h4Text, styles.titleBox]}>
                    Servicios, logística y cronograma
                </Text>
                <View style={styles.textBox}>
                    {data?.services !== undefined && (
                        <SectionText
                            title={data.services.length + " servicios seleccionados"}
                            ico="gift"
                        />
                    )}
                    {data?.staff !== undefined && (
                        <SectionText
                            title={data.staff.length + " personal asignado"}
                            ico="usergroup-add"
                        />
                    )}
                    {data?.equipment !== undefined && (
                        <SectionText
                            title={data.equipment.length + " equipos asignados"}
                            ico="api"
                        />
                    )}
                    {data?.schedule !== undefined && (
                        <SectionText
                            title={data.schedule.length + " actividades programadas"}
                            ico="carry-out"
                        />
                    )}
                </View>
            </ScrollView>
        </View>
     );
}

function SectionText({ title, ico}: {title: string; ico: keyof typeof AntDesign.glyphMap}){
    return(
        <View style={styles.sectionText}>
            <AntDesign name={ico} size={24} color="black" />
            <Text style={StylesDefault.bodyText}>{title}</Text>
        </View>
    );
}

function SectionOnlyText({ title, subtitle}: {title: string; subtitle: string}){
    return(
        <View style={styles.sectionText}>
            <Text style={StylesDefault.bodyTextBold}>{title}</Text>
            <Text style={StylesDefault.bodyText}>{subtitle}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        gap: 15,
        padding: 15,
    },
    titleContainer: {
        flex: 0.2,
    },
    scrollContainer: {
        flex: 1,
        gap: 20,
    },
    titleBox: {
        marginBottom: 10,
    },
    textBox: {
        gap: 10,
        marginBottom: 20,
    },
    sectionText: {
        flex:1,
        flexDirection: "row",
        alignItems: "center",
        gap: 10,
    },
});