import { Stack, router } from "expo-router";
import React, {useEffect, useState} from "react";
import { StyleSheet, View, KeyboardAvoidingView, Platform} from "react-native";
import { CustomHeader } from "../components/CustomHeader";
import { ActionButton } from "@/shared/components/ActionButton";
import { StepEvent } from "@/features/events/screens/create/StepEvent";
import { StepClient } from "@/features/events/screens/create/StepClient";
import { StepServices } from "@/features/events/screens/create/StepServices";
import { StepFinancial } from "@/features/events/screens/create/StepFinancial";
import { StepLogistic } from "@/features/events/screens/create/StepLogistic";
import { StepSchedule } from "@/features/events/screens/create/StepSchedule";
import { StepResume } from "@/features/events/screens/create/StepResume";
import { Event, PropsEventForm } from "@/features/events/types/Events.types";
import { clientSchema} from "../schemas/client.schema";
import { eventSchema } from "@/features/events/schemas/event.schema";
import { serviceSchema } from "@/features/events/schemas/service.schema";
import { financialSchema } from "@/features/events/schemas/financial.schema";

export default function EventForm({
    initialData, 
    mode, 
    onSubmit, 
    titleText,
    onEdit,
    onDelete,
    }: PropsEventForm){

    const [step, setStep] = useState(1);
    const readonly = mode === "view";
    //Estado para errores
    const [errors, setErrors] = useState<any>({});

    //Para crear un nuevo evento
    const [newEvent, setNewEvent] = useState<Partial<Event>>({
        services: [],
        equipment: [],
        schedule: [],
        staff: [],
    });

    useEffect(() => {
        
        if(initialData){

            setNewEvent({
                services: [],
                equipment: [],
                schedule: [],
                staff: [],
                ...initialData
            });
        }

    }, [initialData]);

    //Funcion para actualizar parte del evento
    const updateEventData = (data: Partial<Event>) => {
        setNewEvent((prev) => ({
            ...prev,
            ...data,
        }));
    };

    //Función para validar los pasos
    const validateStep = () => {

        let result

        switch(step){
            case 1:
                result = clientSchema.safeParse(newEvent);
                break;
            
            case 2:
                result = eventSchema.safeParse(newEvent);
                break;

            case 3:
                result = serviceSchema.safeParse(newEvent);
                break;
        
            case 4:
                result = financialSchema.safeParse(newEvent);
                break;

            default:
                return true;
        }

        if(!result.success){

            setErrors(result.error.format());

            return false;
        }

        setErrors({});

        return true;
    }
    
    return(
        <>
        <Stack.Screen 
        options={{ headerShown: false }}
        />
        <View style={styles.container}>
            <View style={{ flex:0}} >
            <CustomHeader icono1="chevron-back" 
                onBack={() => router.back()} 
                icono2="save"
                onSave={() => onSubmit(newEvent as Event)}
                icono3="trash"
                onDelete={onDelete}
                icono4="pencil"
                onEdit={onEdit}
                title={titleText}
                subtitle={`Paso ${step} de 7`}
                colors={['#47E7AF', '#47817F', '#7E258E']}
                readonly={readonly}
            />
            </View>
            <KeyboardAvoidingView 
                behavior={Platform.OS === "ios" ? "padding" : "height"}
                style={styles.keyboardContainer}
            > 
                    {step === 1 && <StepClient data={newEvent} updateData={updateEventData} errors={errors} readonly={readonly} />}
                    {step === 2 && <StepEvent data={newEvent} updateData={updateEventData} errors={errors} readonly={readonly}/>}
                    {step === 3 && <StepServices data={newEvent} updateData={updateEventData} errors={errors} readonly={readonly}/>}
                    {step === 4 && <StepFinancial data={newEvent} updateData={updateEventData} errors={errors} readonly={readonly}/>}
                    {step === 5 && <StepLogistic data={newEvent} updateData={updateEventData} readonly={readonly}/>}
                    {step === 6 && <StepSchedule data={newEvent} updateData={updateEventData} readonly={readonly}/>}
                    {step === 7 && <StepResume data={newEvent} updateData={updateEventData} />}

                <View style={styles.footerButtons}>
                    <ActionButton title="Regresar"
                    icono="arrow-back"
                    onPress={() =>
                        step > 1
                            ? setStep(step - 1)
                            : router.back()
                    }
                    colorsButton={["#D9D9D9", "#D9D9D9", "#D9D9D9"]}
                    color="#7E258E"/>
                    {step < 7 ? 
                        <ActionButton title="Siguiente"
                        icono="arrow-forward"
                        onPress={() =>  {
                            const isValid = validateStep();

                            if(!isValid) return;

                            if(step < 7){
                                setStep(step + 1)
                            }}
                        }
                        colorsButton={["#7E258E", "#7E258E", "#7E258E"]}
                        color="#ffffff"/> 

                        :
                        (
                            !readonly && <ActionButton title="Guardar"
                            icono="save"
                            onPress={() => onSubmit(newEvent as Event)}
                            colorsButton={["#47E7AF", "#7E258E", "#7E258E"]}
                            color="#ffffff"/>
                        )
                        
                    }
                    
                </View>
            
            </KeyboardAvoidingView>
        </View>
        </>
    );
}

const styles = StyleSheet.create({
    container:{
        flex:1,
    },    
    footerButtons: {
        flex:0,
        flexDirection: "row",
        gap: 10,
        paddingVertical: 10,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#ffffff50",
    },
    keyboardContainer:{
        flex:1,
    },
});