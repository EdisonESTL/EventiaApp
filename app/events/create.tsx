import { Stack, router } from "expo-router";
import React, {useState} from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { StyleSheet, View, KeyboardAvoidingView, Platform} from "react-native";
import { CustomHeader } from "../../features/events/components/CustomHeader";
import { ActionButton } from "../../features/events/components/ActionButton";
import { StepEvent } from "@/features/events/screens/create/StepEvent";
import { StepClient } from "@/features/events/screens/create/StepClient";
import { StepServices } from "@/features/events/screens/create/StepServices";
import { StepFinancial } from "@/features/events/screens/create/StepFinancial";
import { StepLogistic } from "@/features/events/screens/create/StepLogistic";
import { StepSchedule } from "@/features/events/screens/create/StepSchedule";
import { StepResume } from "@/features/events/screens/create/StepResume";
import { Event } from "@/features/events/types/Events.types";
import { createEvent } from "@/features/events/services/eventService";
import { clientSchema} from "../../features/events/schemas/client.schema";
import { eventSchema } from "@/features/events/schemas/event.schema";
import { serviceSchema } from "@/features/events/schemas/service.schema";
import { financialSchema } from "@/features/events/schemas/financial.schema";

export default function Create(){
    const [step, setStep] = useState(1);

    //Estado para errores
    const [errors, setErrors] = useState<any>({});

    //Para crear un nuevo evento
    const [newEvent, setNewEvent] = useState<Partial<Event>>({
        services: [],
        equipment: [],
        schedule: [],
        staff: [],
    });

    //Funcion para actualizar parte del evento
    const updateEventData = (data: Partial<Event>) => {
        setNewEvent((prev) => ({
            ...prev,
            ...data,
        }));
    };

    //Funcion para guardar el evento
    const saveEvent = (newEvent: Partial<Event>) => {
        try {

            createEvent(newEvent as Event);

            router.push("/");

        } catch(error){

            console.log("ERROR GUARDANDO:", error);
        }
    }

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
        <SafeAreaView style={styles.container}>
            <View style={{ flex:0}} >
            <CustomHeader icono1="chevron-back" 
                onBack={() => router.back()} 
                icono2="save"
                onSave={() => saveEvent(newEvent)}
                title="Crear evento"
                subtitle={`Paso ${step} de 7`}
                colors={['#47E7AF', '#47817F', '#7E258E']}
                color="#ffffff"
                colorIcono="#000000"
            />
            </View>
            <KeyboardAvoidingView 
                behavior={Platform.OS === "ios" ? "padding" : "height"}
                style={styles.keyboardContainer}
            > 
                    {step === 1 && <StepClient data={newEvent} updateData={updateEventData} errors={errors} />}
                    {step === 2 && <StepEvent data={newEvent} updateData={updateEventData} errors={errors} />}
                    {step === 3 && <StepServices data={newEvent} updateData={updateEventData} errors={errors} />}
                    {step === 4 && <StepFinancial data={newEvent} updateData={updateEventData} errors={errors}/>}
                    {step === 5 && <StepLogistic data={newEvent} updateData={updateEventData} />}
                    {step === 6 && <StepSchedule data={newEvent} updateData={updateEventData} />}
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

                        <ActionButton title="Guardar"
                        icono="save"
                        onPress={() => saveEvent(newEvent)}
                        colorsButton={["#47E7AF", "#7E258E", "#7E258E"]}
                        color="#ffffff"/>
                    }
                    
                </View>
            
            </KeyboardAvoidingView>
        </SafeAreaView>
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