import React, { useState } from "react";
import {View, StyleSheet, Modal, Text, Pressable, ScrollView, KeyboardAvoidingView, Platform} from "react-native";
import { HeadTitleDefault } from "../../components/HeadTitleDefault";
import { CircleButton } from "../../components/CircleButton";
import { StaffTable } from "../../components/StaffTable";
import { EquipmentsTable } from "../../components/EquipmentsTable";
import { EventEquipment, EventStaff, PropsStepLogistic } from "../../types/Events.types";
import { StylesDefault } from "../../styles/StylesDefault";
import Ionicons from "@expo/vector-icons/build/Ionicons";
import { InputText } from "../../components/InputText";
import { ActionButton } from "../../components/ActionButton";

export function StepLogistic({ data, updateData, readonly }: PropsStepLogistic){
    const [staffList, setStaffList] = useState<EventStaff[]>(data.staff || []);
    const [equipmentsList, setEquipmentsList] = useState<EventEquipment[]>(data.equipment || []);

    const [showModal, setShowModal] = useState(false);
    const [showModalEq, setShowModalEq] = useState(false);
    
    // Estados para el formulario de staff
    const [staffForm, setStaffForm] = useState({
        id: 0,
        role: '',
        name: '',
        phone: ''
    });
    const [equipmentForm, setEquipmentForm] = useState({
        name: '',
        quantity: ''
    });

    //Funciones para manejar el staff
    const handleSaveStaff = () => {
        
        if (staffForm.role.trim() && staffForm.name.trim() && staffForm.phone.trim()) {
           if (staffForm.id === 0) {
                createStaff();
            } else {
                updateStaff();
            }
        } else {
            alert('Por favor completa todos los campos');
            return;
        }
        
    };
    const createStaff = () => {
        
         const newStaff: EventStaff = {
                id: Date.now(),
                event: 0, // Este valor se asignaría al guardar el evento completo
                staff: {
                    id: Date.now(),                    
                    name: staffForm.name,
                    phone: staffForm.phone
                },
                role: staffForm.role,
            };
            setStaffList([...staffList, newStaff]);
            // Limpiar formulario
            setStaffForm({ id: 0, role: '', name: '', phone: '' });

            updateData({
                staff: [...staffList, newStaff]
            });

            setShowModal(false);
    }

    const handleEditStaff = (staff: EventStaff) => {

        setStaffForm({
            id: staff.id || 0,
            role: staff.role,
            name: staff.staff.name,
            phone: staff.staff.phone
        });

        //handleSaveStaff();

        setShowModal(true);
    }

    const updateStaff = () => {
        
        const updatedList = staffList.map(item =>
            item.id === staffForm.id
                ? {
                    ...item,
                    role: staffForm.role,
                    staff: {
                        ...item.staff,
                        name: staffForm.name,
                        phone: staffForm.phone
                    }
                }
                : item
        );

        setStaffList(updatedList);

        updateData({
            staff: updatedList
        });

        setShowModal(false);
    }

    const handleDeleteStaff = (id: number) => {
        const updatedList = staffList.filter(staff => staff.id !== id);
        setStaffList(updatedList);
        updateData({
            staff: updatedList
        });
    }

    const handleSaveEquipment = () => {
        if (equipmentForm.name.trim() && equipmentForm.quantity.trim()) {
            const newEquipment: EventEquipment = {
                id: Date.now(),
                event: 0, // Este valor se asignaría al guardar el evento completo
                equipment:{
                    id: Date.now(),
                    name: equipmentForm.name,
                    total_quantity: 0,
                    available_quantity: 0,
                },
                quantity: parseInt(equipmentForm.quantity)
            };
            setEquipmentsList([...equipmentsList, newEquipment]);
            // Limpiar formulario
            setEquipmentForm({ name: '', quantity: '' });

            updateData({
                equipment: [...equipmentsList, newEquipment]
            });
            setShowModalEq(false);
        } else {
            alert('Por favor completa todos los campos');
        }
    };           

    //funciones para el modal
    const handleCloseStaffModal = () => {
        setStaffForm({ id: 0, role: '', name: '', phone: '' });
        setShowModal(false);
    };

    const handleCloseEquipmentModal = () => {
        setEquipmentForm({ name: '', quantity: '' });
        setShowModalEq(false);
    };

    return(
        <View style={styles.container}>

            <View style={styles.title}>

                <HeadTitleDefault color="#000000" 
                title="Personal asignado"
                subtitle="Staff que trabajará en el evento"
                icono="account-group"/>

                <CircleButton icono="add"
                onPress={() => setShowModal(true)}
                colorIcono="#ffffff"
                backgroundColor="#2C2283"
                readonly={readonly}/>

            </View>

            <View style={styles.listContainer}>

                <StaffTable staff={staffList} 
                onEdit={handleEditStaff} 
                onDelete={handleDeleteStaff}
                readonly={readonly}
                />

            </View>

            <View style={styles.title}>

                <HeadTitleDefault color="#000000" 
                title="Equipos asignados"
                subtitle="Equipos que se utilizaran en el evento"
                icono="audio-input-rca"/>

                <CircleButton icono="add"
                onPress={() => setShowModalEq(true)}
                colorIcono="#ffffff"
                backgroundColor="#2C2283"
                readonly={readonly}/>

            </View>

            <View style={styles.listContainer}>
                <EquipmentsTable equipments={equipmentsList}/>
            </View>

           { /* quí iría modal para ingresar el Staff */}
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
                                         Ingresar datos del staff
                                     </Text>

                                     <Pressable onPress={handleCloseStaffModal}>
                                         <Ionicons
                                             name="close"
                                             size={28}
                                             color="#000"
                                         />
                                     </Pressable>
                                 </View>

                                 <View style={styles.modalInputContainer}>

                                     <InputText title="Rol del staff"
                                     icono="briefcase"
                                     colorIcono="#000000"
                                     color="#000000"
                                     placeholder="Rol del staff"
                                     value={staffForm.role}
                                     onChangeText={(text) => setStaffForm({...staffForm, role: text})}
                                     readonly={readonly}
                                     />

                                     <InputText title="Nombre"
                                     icono="user-circle"
                                     colorIcono="#000000"
                                     color="#000000"
                                     placeholder="Nombre Completo"
                                     value={staffForm.name}
                                     onChangeText={(text) => setStaffForm({...staffForm, name: text})}
                                     readonly={readonly}
                                     /> 

                                     <InputText title="Teléfono"
                                     icono="phone"
                                     colorIcono="#000000"
                                     color="#000000"
                                     placeholder="Número de teléfono"
                                     value={staffForm.phone}
                                     onChangeText={(text) => setStaffForm({...staffForm, phone: text})}
                                     readonly={readonly}
                                     />
                                 
                                 </View>
                             </ScrollView>
                             <View style={styles.modalButtons}>
                                 <ActionButton title="Cancelar"
                                 icono="close"
                                 onPress={handleCloseStaffModal}
                                 colorsButton={["#605262","#605262","#605262"]}
                                 color="#ffffff"/>
                                 <ActionButton title="Guardar"
                                 icono="save"
                                 onPress={handleSaveStaff}
                                 colorsButton={["#541360","#AE27C6","#AE27C6"]}
                                 color="#ffffff"
                                 readonly={readonly}
                                 />                            
                             </View>
                         </View>
                     </View>
                 </KeyboardAvoidingView>
             </Modal>

             { /* aquí irí modal para ingresar el Equipment */}
             <Modal 
                 visible={showModalEq}
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
                                        Ingresar datos del equipo a enviar
                                    </Text>

                                    <Pressable onPress={handleCloseEquipmentModal}>
                                        <Ionicons
                                            name="close"
                                            size={28}
                                            color="#000"
                                        />
                                    </Pressable>
                                </View>
                                <View style={styles.modalInput}>
                                    <InputText title="Nombre del equipo"
                                    icono="plug"
                                    colorIcono="#000000"
                                    color="#000000"
                                    placeholder="Nombre del equipo "
                                    value={equipmentForm.name}
                                    onChangeText={(text) => setEquipmentForm({...equipmentForm, name: text})}
                                    readonly={readonly}
                                    />
                                    <InputText title="Cantidad"
                                    icono="list-ol"
                                    colorIcono="#000000"
                                    color="#000000"
                                    placeholder="Cantidad"
                                    value={equipmentForm.quantity}
                                    onChangeText={(text) => setEquipmentForm({...equipmentForm, quantity: text})}
                                    readonly={readonly}
                                    />
                                </View>
                            </ScrollView>
                            <View style={styles.modalButtons}>
                                <ActionButton title="Cancelar"
                                icono="close"
                                onPress={handleCloseEquipmentModal}
                                colorsButton={["#605262","#605262","#605262"]}
                                color="#ffffff"/>
                                <ActionButton title="Guardar"
                                icono="save"
                                onPress={handleSaveEquipment}
                                colorsButton={["#541360","#AE27C6","#AE27C6"]}
                                color="#ffffff"/>                            
                            </View>
                        </View>
                    </View>
                </KeyboardAvoidingView>
             </Modal>
         </View>
    );
}

const styles = StyleSheet.create({
    container:{
        flex:1,
    },
    title:{
        flex:0,
        flexDirection: "row",
        alignItems: "center",
        paddingRight: 10,
    },
    listContainer:{
        flex:1,
        paddingHorizontal:15,
    },
    input:{
        flex:1,
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
