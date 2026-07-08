import { db } from "@/database/dataBase";
import { PropsEventsTypes, PropsPackages, PropsPaymentMethods, PropsReceiptTypes, PropsServices } from "../types/Admin.types";

export const getEventsTypes = () : PropsEventsTypes[] => {
    try {
        const result = db.getAllSync<PropsEventsTypes>(`
            SELECT * FROM event_types
            ORDER BY name ASC
        `);
        return result;
    }
    catch (error) {
        console.error("Error fetching event types:", error);
        throw error;
    }
};

export const getPackages = () : PropsPackages[] => {
    try {
        const result = db.getAllSync<PropsPackages>(`
            SELECT * FROM packages
            ORDER BY name ASC
        `);
        return result;
    }
    catch (error) {
        console.error("Error fetching packages:", error);
        throw error;
    }
};

export const getServices = () : PropsServices[] => {
    try {
        const result = db.getAllSync<PropsServices>(`
            SELECT * FROM services
            ORDER BY name ASC
        `);
        return result;
    }
    catch (error) {
        console.error("Error fetching services:", error);
        throw error;
    }
};

export const getReceiptTypes = () : PropsReceiptTypes[] => {
    try {
        const result = db.getAllSync<PropsReceiptTypes>(`
            SELECT * FROM receipt_types
            ORDER BY name ASC
        `);
        return result;
    }
    catch (error) {
        console.error("Error fetching receipt types:", error);
        throw error;
    }
};

export const getPaymentMethods = () : PropsPaymentMethods[] => {
    try {
        const result = db.getAllSync<PropsPaymentMethods>(`
            SELECT * FROM payment_methods
            ORDER BY name ASC
        `);
        return result;
    }
    catch (error) {
        console.error("Error fetching payment methods:", error);
        throw error;
    }
};