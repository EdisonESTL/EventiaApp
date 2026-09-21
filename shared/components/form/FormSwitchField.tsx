import { Colors } from '@/shared/constants/colors';
import { StylesDefault } from '@/shared/styles/StylesDefault';
import { ModalField } from '@/shared/types/Shared.types';
import {View, Switch, Text, StyleSheet} from 'react-native';

type Props = {
    field: ModalField,
    value: string,
    onChange: (text: string) => void,
}

export function FormSwitchField({field, value, onChange}:Props) {

    const isActive = Number(value) === 0;
    const status = isActive ? "Activo" : "Inactivo";


    return(
        <View style={styles.container}>
            <Text style={[StylesDefault.bodyText, {color: field.color}]}>{field.title}</Text>
            <View style={styles.body}>
                <Text style={[StylesDefault.bodyTextBold, {color: field.color}]}>{status}</Text>
            
                <Switch
                trackColor={{false: Colors.gray500, true: Colors.purple2}}
                thumbColor={isActive ? Colors.purple : '#f4f3f4'}
                ios_backgroundColor="#3e3e3e"
                onValueChange={(enabled) =>{
                    onChange(enabled ? "0" : "1");
                }}
                value={isActive}
                />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 10,
    },
    body: {
        flex: 1,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        gap:10,
    }    
})