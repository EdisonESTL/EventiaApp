import React, {useEffect, useState} from "react";
import { StyleSheet, View, ScrollView, Text } from "react-native";
import { InputText } from "../../components/InputText";
import { HeadTitleDefault } from "../../components/HeadTitleDefault";
import { DropDownPick } from "../../components/DropDownPick";
import { DateTimePick } from "../../components/DateTimePick";
import { DateTimePickerEvent } from "@react-native-community/datetimepicker";
import { DropdownItem, PropsStepEvent } from "../../types/Events.types";
import { getEventTypes, getPackages } from "../../services/eventService";
import { StylesDefault } from "../../../../shared/styles/StylesDefault";

export function StepEvent({ data, updateData, errors, readonly }: PropsStepEvent){
    
    const [eventTypes, setEventTypes] = useState<DropdownItem[]>([]);
    const [eventPackages, setEventPackages] = useState<DropdownItem[]>([]);

    const [eventType, setEventType] = useState<string | null>(data?.event_type?.id.toString() || null);
    const [eventPackage, setEventPackage] = useState<string | null>(data?.event_package?.id.toString() || null);

    const [showStartDate, setShowStartDate] = useState(false);

    const [startDateTime, setStartDateTime] = useState(data.start_datetime ? new Date(data.start_datetime) : new Date());
    const [endDateTime, setEndDateTime] = useState(data.end_datetime ? new Date(data.end_datetime) : new Date());

    const [showStartTime, setShowStartTime] = useState(false);
    const [showEndTime, setShowEndTime] = useState(false);

    const handleEventTypeChange = (selectedValue: string | null) => {
        setEventType(selectedValue);

        const selectedItem = selectedValue
            ? eventTypes.find((item) => item.value === selectedValue)
            : null;

        if (selectedItem) {
            updateData({
                event_type: {
                    id: parseInt(selectedItem.value),
                    name: selectedItem.label,
                },
            });
        }
    };

    const handleEventPackageChange = (selectedValue: string | null) => {
        setEventPackage(selectedValue);

        const selectedItem = selectedValue
            ? eventPackages.find((item) => item.value === selectedValue)
            : null;

        if (selectedItem) {
            updateData({
                event_package: {
                    id: parseInt(selectedItem.value),
                    name: selectedItem.label,
                },
            });
        }
    };

    const onChangeStartDate = (event: DateTimePickerEvent, selectedDate?: Date) => {
        if (!selectedDate) return;
        const updatedDate = new Date(startDateTime);

        updatedDate.setFullYear(selectedDate.getFullYear());
        updatedDate.setMonth(selectedDate.getMonth());
        updatedDate.setDate(selectedDate.getDate());

        setStartDateTime(updatedDate);

        updateData({
            start_datetime: updatedDate.toISOString(),
        });
        setShowStartDate(false);
    };
    const onChangeStartTime = (event: DateTimePickerEvent, selectedTime?: Date) => {
        if (!selectedTime) return;

        const updatedDate = new Date(startDateTime);

        updatedDate.setHours(selectedTime.getHours());
        updatedDate.setMinutes(selectedTime.getMinutes());
        updatedDate.setSeconds(0);

        setStartDateTime(updatedDate);

        updateData({
            start_datetime: updatedDate.toISOString(),
        });

        setShowStartTime(false);
    };
    const onChangeEndTime = (event: DateTimePickerEvent, selectedTime?: Date) => {
        if (!selectedTime) return;

        const updatedDate = new Date(endDateTime);

        updatedDate.setHours(selectedTime.getHours());
        updatedDate.setMinutes(selectedTime.getMinutes());
        updatedDate.setSeconds(0);

        setEndDateTime(updatedDate);

        updateData({
            end_datetime: updatedDate.toISOString(),
        });
        setShowEndTime(false);
    };

    useEffect(() => {
        const eventTypes = getEventTypes();
        const eventPackages = getPackages();

        setEventTypes(eventTypes);
        setEventPackages(eventPackages);

        if (data.event_type?.id) {
            setEventType(data.event_type.id.toString());
        }
        if (data.event_package?.id) {
            setEventPackage(data.event_package.id.toString());
        }
    }, [data]);

    return(
        <ScrollView style={styles.container}>
            <View style={styles.title}>
            <HeadTitleDefault color="#000000" title="Datos del evento"
                subtitle="Información general del evento"
                icono="party-popper"/>
            </View>
            <View style={styles.input}>
            <InputText title="Nombre del evento"
                icono="user"
                colorIcono="#000000"
                color="#000000"
                placeholder="Cumpleaños de ....."
                value={data?.name}
                onChangeText={(text) => updateData({ name: text })}
                readonly={readonly}/>
                {errors?.name?._errors[0] && (
                <View style={StylesDefault.errors}>
                    <Text style={StylesDefault.textError}>
                        {errors.name._errors[0]}
                    </Text>
                </View>
                )}
            </View>
            <View style={styles.input}>
            <DropDownPick
                title="Tipo de evento"
                icono="heart"
                value={eventType}
                setValue={handleEventTypeChange}
                items={eventTypes}
                placeholder="Seleccione"
                zIndex={1000}
                readonly={readonly}
            />
                {errors?.event_type?._errors[0] && (
                <View style={StylesDefault.errors}>
                    <Text style={StylesDefault.textError}>
                        {errors.event_type._errors[0] }
                    </Text>
                </View>
                )}
            </View>
            <View style={styles.input}>
            <DropDownPick
                title="Paquete solicitado"
                icono="gift"
                value={eventPackage}
                setValue={handleEventPackageChange}
                items={eventPackages}
                placeholder="Seleccione"
                zIndex={999}
                readonly={readonly}
            />
                {errors?.event_package?._errors[0] && (
                <View style={StylesDefault.errors}>
                    <Text style={StylesDefault.textError}>
                        {errors.event_package._errors[0] }
                    </Text>
                </View>
                )}
            </View>
            <View style={styles.input}>
            <InputText title="Ubicación"
            icono="location-arrow"
            colorIcono="#000000"
            color="#000000"
            placeholder="Ubicacion......."
            value={data?.location || ''}
            onChangeText={(text) => updateData({ location: text })}
            readonly={readonly}/>
                {errors?.location?._errors[0] && (
                <View style={StylesDefault.errors}>
                    <Text style={StylesDefault.textError}>
                        {errors.location._errors[0] }
                    </Text>
                </View>
                )}
            </View>
            <View style={styles.input}>
            <DateTimePick title="Fecha del evento"
            icono="calendar"
            mode="date"
            value={startDateTime}
            show={showStartDate}
            setShow={setShowStartDate}
            onChange={onChangeStartDate}
            readonly={readonly}/>
                {errors?.start_datetime?._errors[0] && (
                <View style={StylesDefault.errors}>
                    <Text style={StylesDefault.textError}>
                        {errors.start_datetime._errors[0] }
                    </Text>
                </View>
                )}
            </View>
            <View style={styles.clockSection}>

                <DateTimePick title="Hora inicio"
                icono="clock"
                mode="time"
                value={startDateTime}
                show={showStartTime}
                setShow={setShowStartTime}
                onChange={onChangeStartTime}
                readonly={readonly}/>

                <DateTimePick title="Hora fin"
                icono="clock"
                mode="time"
                value={endDateTime}
                show={showEndTime}
                setShow={setShowEndTime}
                onChange={onChangeEndTime}
                readonly={readonly}/>
                
            </View>
            {errors?.end_datetime?._errors[0] && (
                <View style={StylesDefault.errors}>
                    <Text style={StylesDefault.textError}>
                        {errors.end_datetime._errors[0] }
                    </Text>
                </View>
                )}
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container:{
        flex:1,
    },
    title:{
        flex:1,
    },
    input:{
        flex:1,
    },
    clockSection:{
        flex: 1,
        flexDirection: "row",
    },
})