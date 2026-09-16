import { db } from "@/database/dataBase";
import { EventType, PropsEventsTypes, PropsPackages, PropsPaymentMethods, PropsReceiptTypes, PropsServices } from "../types/Admin.types";

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

export const saveEventTypes = (eventType: Partial<EventType>) => {
    try {
        console.log("Guardando tipo de evento:", eventType);
            if (eventType.id) {
                // Actualizar tipo de evento existente
                console.log("Actualizando tipo de evento con ID:", eventType.id);
                
                db.runAsync(`
                    UPDATE event_types
                    SET name = ?, deleted = ?
                    WHERE id = ?
                `, 
                [
                    eventType.name ? eventType.name : "",   
                    eventType.deleted ? 0 : 1,
                    eventType.id
                ]);
            } else {
                    console.log("Insertando nuevo tipo de evento:", eventType);
                // Insertar nuevo tipo de evento
                db.runSync(`
                    INSERT INTO event_types (name, deleted)
                    VALUES (?, ?)
                `, 
                [
                    eventType.name ? eventType.name : "", 
                    eventType.deleted ? 1 : 0 
                ]);
                
            }
    }
    catch (error) {
        console.error("Error saving event type:", error);
        throw error;
    }
};