import React, {useEffect, useState} from "react";
import { View, StyleSheet, Text, ScrollView } from "react-native";
import { HeadTitleDefault } from "../../components/HeadTitleDefault";
import { InputText } from "../../components/InputText";
import VoucherSelector from "../../components/VoucherSelector";
import { NewsBox } from "../../components/NewsBox";
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { DropdownItem, PaymentMethod, PropsOutstandingBalance, PropsStepFinancial } from "../../types/Events.types";
import { StylesDefault } from "../../styles/StylesDefault";
import { DropDownPick } from "../../components/DropDownPick";
import { getPaymentMethods } from "../../services/eventService";

export function StepFinancial({ data, updateData, errors }: PropsStepFinancial){
    const [paymentType, setPaymentType] = useState<PaymentMethod | null>(data.payment_method || null);
    const [payTypes, setPayTypes] = useState<DropdownItem[]>([]);

    const totalAmount = (total_cost: string | "0", paid_amount: string | "0") => {
        const total = total_cost || "0";
        const paid = paid_amount || "0";
        return parseFloat(total) - parseFloat(paid);
    };

    useEffect(() => {
        setPayTypes(getPaymentMethods());
    }, [data]);

    return(
        <ScrollView style={styles.container}
        contentContainerStyle={{ paddingBottom: 50 }}
        nestedScrollEnabled>
            <View style={styles.title}>
                <HeadTitleDefault color="#000000" 
                title="Información financiera"
                subtitle="Detalles de pago y comprobantes"
                icono="cash"/>
            </View>
            <View style={styles.inputSelector
            }>
                <VoucherSelector valueSelected={data.receipt_type?.name ?? "recibo"} updateData={updateData}/>
                {errors?.receipt_type?._errors?.[0] && (
                <View style={StylesDefault.errors}>
                    <Text style={StylesDefault.textError}>
                        {errors.receipt_type._errors[0]}
                    </Text>
                </View>
                )}
            </View>
            <View style={styles.input}>
                <InputText title="Costo total del evento" 
                icono="shopping-cart" 
                colorIcono="#000000"
                color="#000000"
                placeholder="Ejemplo Nombre"
                value={data.total_cost?.toString() || ""}/>
                {errors?.total_cost?._errors?.[0] && (
                <View style={StylesDefault.errors}>
                    <Text style={StylesDefault.textError}>
                        {errors.total_cost._errors[0]}
                    </Text>
                </View>
                )}
            </View>
            <View style={styles.input}>
                <InputText title="Abono realizado" 
                icono="money" 
                colorIcono="#000000"
                color="#000000"
                placeholder="0.0"
                value={data.paid_amount?.toString() || "0"}
                onChangeText={(text) => {

                    if(text.trim() === ""){
                        updateData({
                            paid_amount: "0"
                        });
                        return;
                    }

                    const validNumber = /^[0-9]*\.?[0-9]*$/;

                    if(validNumber.test(text)){

                        updateData({
                            paid_amount: text
                        });
                    }
                }}
                keyboardType="decimal-pad"
                />
                {errors?.paid_amount?._errors?.[0] && (
                <View style={StylesDefault.errors}>
                    <Text style={StylesDefault.textError}>
                        {errors.paid_amount._errors[0]}
                    </Text>
                </View>
                )}
            </View>
            <View style={styles.outBalanceBox}>
                <OutstandingBalance title="Saldo Pendiente"
                icono="usd"
                backgroundColor="#47DDAA25"
                colorIcono="#000000"
                value={totalAmount(data.total_cost ?? "0", data.paid_amount ?? "0")}/>
            </View>
            <View style={styles.inputPM}>
                <DropDownPick title="Forma de pago" icono="credit-card"
                value={paymentType?.id.toString() || null} 
                setValue={(item) => {
                    const selected = payTypes.find(pt => pt.value === item);
                    const payment: PaymentMethod = {
                        id: Number(item),
                        name: selected?.label || "" 
                    }

                    setPaymentType(payment);
                    updateData({
                        payment_method:payment
                    });
                }}
                items={payTypes}
                placeholder="Seleccione una opción"
                zIndex={1050}
                />
                {errors?.payment_method?._errors?.[0] && (
                <View style={StylesDefault.errors}>
                    <Text style={StylesDefault.textError}>
                        {errors.payment_method._errors[0]}
                    </Text>
                </View>
                )}
            </View>
            <View style={styles.newsContainer}>
                <NewsBox title="El saldo se calcula automaticamente en base al costo y abonos ingresados" icono="shield"
                backgroundColor="#47DDAA25"
                colorIcono="#47DDAA"/>
            </View>
        </ScrollView>
    );
}

function OutstandingBalance({title, icono, backgroundColor, colorIcono, value}:PropsOutstandingBalance){
    return(
        <View style={[styles.balanceBox,{backgroundColor}]}>
            <Text style={StylesDefault.bodyText}>{title}</Text>
            <View style={styles.outBalance}>
                <FontAwesome name={icono} size={24} color={colorIcono} />
                <Text style={StylesDefault.h3Text}>{value}</Text>
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
    input:{
        flex:1,
    },
    inputPM:{
        flex:1,
        zIndex: 5000,
        elevation: 5000,
    },
    newsContainer:{
        flex:1,
        padding: 10,

    },
    inputSelector:{
        flex:1,
        padding:10,
    },
    outBalanceBox:{
        padding: 10,
    },
    balanceBox:{
        padding: 10,
        gap: 10,
        borderRadius: 10,
        borderColor: "#47DDAA",
        borderWidth: 2,
    },
    outBalance:{
        flexDirection: "row",
        gap: 20,
        justifyContent: "flex-start"
    },
})