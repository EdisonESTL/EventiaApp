import React from 'react';
import { router } from 'expo-router';
import {View, FlatList, Text, StyleSheet} from 'react-native';
import { ActionButton } from '@/shared/components/ActionButton';
import { StylesDefault } from '@/shared/styles/StylesDefault';
import { Colors } from '@/shared/constants/colors';
import { ItemListDefault } from './ItemListDefault';
import HeadDefault from './HeadDefault';
import Ionicons from '@expo/vector-icons/build/Ionicons';
import { GradientColors } from '@/shared/types/Shared.types';

type PropsViewDefault = {
  data: any[];

  titleHeader: string;
  subtitleHeader: string;
  colorText: string;

  iconoButtonHeader: keyof typeof Ionicons.glyphMap;
  onPressButtonHeader: () => void;
  colorsButtonHeader: string;
  colorIconoButtonHeader: string;

  titleActionButton: string;
  iconoActionButton: keyof typeof Ionicons.glyphMap;
  onPressActionButton: () => void;
  colorsButtonActionButton: GradientColors;
  colorActionButton: string;
  readonlyActionButton?: boolean;

};

//Componenente que incluye un encabezado, un botón de acción y 
// una lista de elementos.
export function ViewDefault({ data, 
  titleHeader, 
  subtitleHeader, 
  colorText,
  iconoButtonHeader, 
  onPressButtonHeader, 
  colorsButtonHeader, 
  colorIconoButtonHeader, 
  titleActionButton, 
  iconoActionButton, 
  onPressActionButton, 
  colorsButtonActionButton, 
  colorActionButton, 
  readonlyActionButton }: PropsViewDefault) {
  return (
<View style={styles.container}>

            <View style={styles.header}>            
                <HeadDefault title={titleHeader} 
                subtitle={subtitleHeader}
                
                iconoButton={iconoButtonHeader}
                onPressButton={onPressButtonHeader}
                colorsButton={colorsButtonHeader}
                colorIconoButton= {colorIconoButtonHeader}                
                />
            </View>

            <View style={styles.content}>
                <ActionButton title={titleActionButton}
                icono={iconoActionButton}
                onPress={onPressActionButton}
                colorsButton={colorsButtonActionButton}
                color={colorActionButton}
                readonly= {readonlyActionButton}
                />
            </View>

            <View style={styles.list}>
                <FlatList
                    data={data}
                    keyExtractor={(item) => item.id}
                    renderItem={({item }) => 
                    <ItemListDefault 
                    item={item} 
                    colorText={colorText} />}

                    ListEmptyComponent={() => (
                        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                            <Text style={StylesDefault.h4Text}>No hay tipos de eventos disponibles</Text>
                        </View>
                    )}

                    ListHeaderComponent={() => (
                        <View style={{ paddingVertical: 10 }}>
                            <Text style={[ StylesDefault.h4Text, { color: colorText } ]}>Lista de Tipos de Eventos</Text>
                        </View>
                    )}

                    ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
                    scrollEnabled={true}
                    nestedScrollEnabled={true}
                />
            </View>
        </View>
  );
}

const styles = StyleSheet.create({
  container:{
    flex: 1,
  },
  header:{
    flex: 1,
  },
  content:{
    flex: 1,
  },
  list:{
    flex: 3,
    margin: 10,
  },
})