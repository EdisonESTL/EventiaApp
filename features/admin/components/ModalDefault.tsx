import { ActionButton } from '@/shared/components/ActionButton';
import { StylesDefault } from '@/shared/styles/StylesDefault';
import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { KeyboardAvoidingView, 
    Modal, 
    ScrollView, 
    View,    
    Text, 
    Pressable,
    Platform, 
    StyleSheet,
 } from "react-native";
import { ModalField } from '@/shared/types/Shared.types';
import { FormTextField } from '@/shared/components/form/FormTextField';
import { FormSwitchField } from '@/shared/components/form/FormSwitchField';

type PropsModalDefault<T> = {
    isVisible: boolean;
    onRequestClose: () => void;
    title: string;
    subtitle: string;
    readonly: boolean;
    fields: ModalField[];
    onPress: (data: Partial<T>) => void;
  };

export function ModalDefault<T>({ 
    isVisible, 
    onRequestClose, 
    title, 
    subtitle, 
    readonly, 
    fields,
    onPress
    }: PropsModalDefault<T>) {

    //Almacena los datos del formulario
    const [formData, setFormData] = useState<Partial<T>>({});

    const handleSave = () => {
        onPress(formData)
    }
    
    return (
        <Modal 
        visible={isVisible}
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
                                <View style={styles.modalTextHeader}>
                                    <Text style={StylesDefault.h3Text}>
                                        {title}
                                    </Text>

                                    {subtitle && <Text style={StylesDefault.bodyText}>
                                    {subtitle}
                                    </Text>}
                                </View>

                                <Pressable onPress={onRequestClose}>
                                    <Ionicons
                                        name="close"
                                        size={28}
                                        color="#000"
                                    />
                                </Pressable>
                            </View>

                            <View style={styles.modalInputContainer}>
                                {fields
                                    .filter(field => field.visible !== false)
                                    .map((field) => {

                                        switch(field.type){

                                            case "text":
                                                return <FormTextField 
                                                field={field} 
                                                key={field.key}
                                                value={formData[field.key as keyof T] as string ?? ""}
                                                onChange={(text) =>
                                                    setFormData(prev => ({
                                                        ...prev,
                                                        [field.key]: text
                                                    }))
                                                }
                                                />;

                                            case "switch":
                                                return <FormSwitchField 
                                                field={field} 
                                                key={field.key}
                                                value={formData[field.key as keyof T] as string ?? "0"}
                                                onChange={(text) =>
                                                    setFormData(prev => ({
                                                        ...prev,
                                                        [field.key]: text
                                                    }))
                                                }
                                                />;

                                            default:
                                                return null;
                                        }
                                    })}                                 
                            </View>

                        </ScrollView>
                             
                        <View style={styles.modalButtons}>
                            
                            <ActionButton title="Cancelar"
                                icono="close"
                                onPress={onRequestClose}
                                colorsButton={["#605262","#605262","#605262"]}
                                color="#ffffff"
                            />
                            
                            <ActionButton title="Guardar"
                                icono="save"
                                onPress={handleSave}
                                colorsButton={["#541360","#AE27C6","#AE27C6"]}
                                color="#ffffff"
                                readonly={readonly}
                            />                            
                        </View>
                    </View>
                </View>
            </KeyboardAvoidingView>
        </Modal>
    );
}

const styles = StyleSheet.create({
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
    modalTextHeader:{
        width:"85%",
    },
    modalInputContainer:{
        gap: 15,
    },
    modalInput:{
        flex:1,
        gap: 15,
    },
    modalButtons:{
        flexDirection:"row",
        justifyContent:"space-between",
        marginTop:20,
    },
});
