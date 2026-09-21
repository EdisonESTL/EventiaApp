import { db } from "@/database/dataBase";
import { BaseType, EventType, PropsEventsTypes, PropsPackages, PropsPaymentMethods, PropsReceiptTypes, PropsServices, ServicesType } from "../types/Admin.types";

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
            if (eventType.id) {
                // Actualizar tipo de evento existente
                
                db.runSync(`
                    UPDATE event_types
                    SET name = ?, deleted = ?
                    WHERE id = ?
                `, 
                [
                    eventType.name ? eventType.name : "",   
                    Number(eventType.deleted) === 0 ? 0 : 1,
                    eventType.id
                ]);

            } else {
                // Insertar nuevo tipo de evento
                console.log("Insertando nuevo tipo de evento:", eventType);
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

export const deleteEventTypes = (id: number) => {
    try {
        console.log("Eliminando tipo de evento con ID:", id);
        db.runSync(`
            DELETE FROM event_types
            WHERE id = ?
        `, [id]);
    }
    catch (error) {
        console.error("Error deleting event type:", error);
        throw error;
    }
};

export const savePackagesTypes = (packageType: Partial<BaseType>) => {
    try {
        if (packageType.id) {
            // Actualizar tipo de paquete existente
            db.runSync(`
                UPDATE packages
                SET name = ?, deleted = ?
                WHERE id = ?
            `, [
                packageType.name ? packageType.name : "",
                Number(packageType.deleted) === 0 ? 0 : 1,
                packageType.id
            ]);
        } else {
            // Insertar nuevo tipo de paquete
            console.log("Insertando nuevo tipo de paquete:", packageType);
            db.runSync(`
                INSERT INTO packages (name, deleted)
                VALUES (?, ?)
            `, [
                packageType.name ? packageType.name : "",
                packageType.deleted ? 1 : 0
            ]);
        }
    }
    catch (error) {
        console.error("Error saving package type:", error);
        throw error;
    }
};

export const deletePackagesTypes = (id: number) => {
    try {
        db.runSync(`
            UPDATE packages
            SET deleted = ?
            WHERE id = ?
        `, [1, id]);
    }
    catch (error) {
        console.error("Error deleting package type:", error);
        throw error;
    }
};

export const savePayWays = (paymentMethod: Partial<BaseType>) => {
    try {
        if (paymentMethod.id) {
            // Actualizar forma de pago existente
            db.runSync(`
                UPDATE payment_methods
                SET name = ?, deleted = ?
                WHERE id = ?
            `, [
                paymentMethod.name ? paymentMethod.name : "",
                Number(paymentMethod.deleted) === 0 ? 0 : 1,
                paymentMethod.id
            ]);
        } else {
            // Insertar nueva forma de pago
            console.log("Insertando nueva forma de pago:", paymentMethod);
            db.runSync(`
                INSERT INTO payment_methods (name, deleted)
                VALUES (?, ?)
            `, [
                paymentMethod.name ? paymentMethod.name : "",
                paymentMethod.deleted ? 1 : 0
            ]);
        }
    }
    catch (error) {
        console.error("Error saving payment method:", error);
        throw error;
    }
};

export const deletePayWays = (id: number) => {
    try {
        console.log("Eliminando forma de pago con ID:", id);
        db.runSync(`
            UPDATE payment_methods
            SET deleted = ?
            WHERE id = ?
        `, [1, id]);
        console.log("Forma de pago eliminada con éxito:", id);
    }
    catch (error) {
        console.error("Error deleting payment method:", error);
        throw error;
    }
};

export const saveReceiptTypeService = (receiptType: Partial<BaseType>) => {
    try {
        if (receiptType.id) {
            // Actualizar tipo de comprobante existente
            db.runSync(`
                UPDATE receipt_types
                SET name = ?, deleted = ?
                WHERE id = ?
            `, [
                receiptType.name ? receiptType.name : "",
                Number(receiptType.deleted) === 0 ? 0 : 1,
                receiptType.id
            ]);
        } else {
            // Insertar nuevo tipo de comprobante
            console.log("Insertando nuevo tipo de comprobante:", receiptType);
            db.runSync(`
                INSERT INTO receipt_types (name, deleted)
                VALUES (?, ?)
            `, [
                receiptType.name ? receiptType.name : "",
                receiptType.deleted ? 1 : 0
            ]);
        }
    }
    catch (error) {
        console.error("Error saving receipt type:", error);
        throw error;
    }
};

export const deleteReceiptTypesService = (id: number) => {
    try {
        console.log("Eliminando tipo de comprobante con ID:", id);
        db.runSync(`
            UPDATE receipt_types
            SET deleted = ?
            WHERE id = ?
        `, [1, id]);
        console.log("Forma de pago eliminada con éxito:", id);
    }
    catch (error) {
        console.error("Error deleting payment method:", error);
        throw error;
    }
};

export const saveServicesService = (service: Partial<ServicesType>) => {
    try {
        if (service.id) {
            // Actualizar servicio existente
            db.runSync(`
                UPDATE services
                SET name = ?, price = ?, description = ?, deleted = ?
                WHERE id = ?
            `, [
                service.name ? service.name : "",
                service.price ? Number(service.price) : 0,
                service.description ? service.description : "",
                Number(service.deleted) === 0 ? 0 : 1,
                service.id
            ]);
        } else {
            // Insertar nuevo servicio
            console.log("Insertando nuevo servicio:", service);
            db.runSync(`
                INSERT INTO services (name, price, description, deleted)
                VALUES (?, ?, ?, ?)
            `, [
                service.name ? service.name : "",
                service.price ? service.price : 0,
                service.description ? service.description : "",
                service.deleted ? 1 : 0
            ]);
        }
    }
    catch (error) {
        console.error("Error saving receipt type:", error);
        throw error;
    }
};

export const deleteServicesService = (id: number) => {
    try {
        console.log("Eliminando servicio con ID:", id);
        db.runSync(`
            UPDATE services
            SET deleted = ?
            WHERE id = ?
        `, [1, id]);
        console.log("Servicio eliminado con éxito:", id);
    }
    catch (error) {
        console.error("Error deleting payment method:", error);
        throw error;
    }
};