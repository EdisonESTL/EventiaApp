import React, { useEffect, useState } from "react";
import {Pressable, StyleSheet, Text, View,} from "react-native";
import {MaterialCommunityIcons} from "@expo/vector-icons";
import { StylesDefault } from "../../../shared/styles/StylesDefault";
import { PropsVoucherOption, PropsVoucherSelector, ReceiptType } from "../types/Events.types";
import { getReceiptTypes } from "../services/eventService";

export default function VoucherSelector({valueSelected, updateData, readonly}: PropsVoucherSelector) {
  const [selected, setSelected] = useState<string | null>(valueSelected);
  const [optionsRT, setOptionsRT] = useState<ReceiptType[]>([]);

  useEffect(() => {
    setOptionsRT(getReceiptTypes());
  }, [valueSelected]);

  const presSelected = (option : ReceiptType) => () => {
    setSelected(option.name);
    updateData({ receipt_type: option });
  };

  return (
    <View style={styles.container}>

      <Text style={StylesDefault.bodyText}>
        Tipo de comprobante
      </Text>

      <View style={styles.optionsContainer}>
        {optionsRT.map((option) => (
          <VoucherOption
            key={option.id}
            title={option.name}
            icono={option.ico}
            selected={selected === option.name}
            onPress={presSelected(option)}
            readonly={readonly}
          />
        ))}
      </View>

    </View>
  );
}

function VoucherOption({title, icono, selected, onPress, readonly}: PropsVoucherOption) {
  return (
    <Pressable
      onPress={onPress}
      style={[
        styles.optionButton,
        selected && styles.optionButtonSelected,
      ]}
      disabled={readonly}
    >
      <MaterialCommunityIcons
        name={icono}
        size={28}
        color={selected ? "#000" : "#444"}
      />

      <Text
        style={[
          styles.optionText,
          selected && styles.optionTextSelected,
        ]}
      >
        {title}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 15,
  },

  optionsContainer: {
    flexDirection: "row",
    gap: 15,
  },

  optionButton: {
    flex: 1,
    height: 50,

    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",

    gap: 12,

    borderWidth: 1.5,
    borderColor: "#CFCFCF",

    borderRadius: 18,

    backgroundColor: "#F8F8F8",
  },

  optionButtonSelected: {
    backgroundColor: "#C9F2E7",
    borderColor: "#47E7AF",
  },

  optionText: {
    fontSize: 16,
    color: "#444",
  },

  optionTextSelected: {
    color: "#000",
    fontWeight: "500",
  },
});