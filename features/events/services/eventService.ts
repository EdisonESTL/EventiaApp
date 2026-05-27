import { db } from "../../../database/dataBase";
import { Event, DropdownItem, EventType, Package, Service, PaymentMethod, ReceiptType, EventListItem } from "../types/Events.types";

export const createEvent = (event: Event) => {
  try {
    db.execSync("BEGIN TRANSACTION");
    //1 Guardar cliente
    let customer = db.getFirstSync<{id:number}>(
      `SELECT id FROM customers 
      WHERE LOWER(name) = LOWER(?) 
      AND phone = ?`,
      [
        event.event_customer.name,
        event.event_customer.phone
      ]
    );

    let customerId:number;

    // Si no existe, crearlo
    if(!customer){

      const customerResult = db.runSync(
        `INSERT INTO customers (name, phone, email) 
        VALUES (?, ?, ?)`,
        [
          event.event_customer.name,
          event.event_customer.phone,
          event.event_customer.email
        ]
      );

      customerId = Number(customerResult.lastInsertRowId);

    } else {

      customerId = customer.id;
    }

    //2 Guardar evento principal
    const result = db.runSync(
      `INSERT INTO events (
        name,
        location,
        start_datetime,
        end_datetime,
        description,

        customer_id,
        event_type_id,
        package_id,

        total_cost,
        paid_amount,
        payment_method_id,
        receipt_type_id,
        deleted
        ) VALUES (?, ?, ?, ?, ?, ?, ?,?, ?, ?, ?, ?, ?)`,
      [
        event.name,
        event.location,
        event.start_datetime,
        event.end_datetime,
        event.description,

        customerId, // ID del cliente recién creado,
        event.event_type.id, // ID del tipo de evento seleccionado
        event.event_package.id, // ID del paquete seleccionado

        event.total_cost,
        event.paid_amount,
        event.payment_method.id, // ID del método de pago seleccionado
        event.receipt_type.id, // ID del tipo de recibo seleccionado
        0 // deleted por defecto en 0
      ]
    );

    const eventId = result.lastInsertRowId;

    //3 schedule
    event.schedule.forEach((d) => {
      db.runSync(
        `INSERT INTO event_schedule (event_id, title, start_time, end_time)
         VALUES (?, ?, ?, ?)`,
        [eventId, d.title, d.start_time, d.end_time]
      );
    });

    //4 services
    event.services.forEach((s) => {
        db.runSync(
            `INSERT INTO event_services (event_id, service_id, quantity)
            VALUES (?, ?, ?)`,
            [
            eventId,
            s.service.id, // ID del servicio seleccionado
            s.quantity
            ]
        );
    });

    //5 Equipments
    event.equipment.forEach((e) => {
        // Buscar equipo existente
        let equipment = db.getFirstSync<{id:number}>(
            `SELECT id FROM equipment WHERE name = ?`,
            [e.equipment.name]
        );

        let equipmentId:number;

        // Si no existe, crearlo
        if(!equipment){

            const insert = db.runSync(
                `INSERT INTO equipment
                (name, total_quantity, available_quantity)
                VALUES (?, ?, ?)`,
                [
                    e.equipment.name,
                    e.equipment.total_quantity,
                    e.equipment.available_quantity
                ]
            );

            equipmentId = Number(insert.lastInsertRowId);

        } else {

            equipmentId = equipment.id;
        }

        // Relacionar con evento
        db.runSync(
            `INSERT INTO event_equipment
            (event_id, equipment_id, quantity)
            VALUES (?, ?, ?)`,
            [
                eventId,
                equipmentId,
                e.quantity
            ]
        );
    });

    //6 Staff
    event.staff.forEach((s) => {
        // Buscar staff existente
        let staff = db.getFirstSync<{id:number}>(
            `SELECT id FROM staff WHERE name = ? `,
            [s.staff.name]
        );
        let staffId:number;

        // Si no existe, crearlo
        if(!staff){
            const insert = db.runSync(
                `INSERT INTO staff
                (name, phone)
                VALUES (?, ?)`,
                [
                    s.staff.name,
                    s.staff.phone
                ]
            );
            staffId = Number(insert.lastInsertRowId);
        } else {
            staffId = staff.id;
        }
        // Relacionar con evento
        db.runSync(
            `INSERT INTO event_staff
            (role, event_id, staff_id)
            VALUES (?, ?, ?)`,
            [
                s.staff.role,
                eventId,
                staffId
            ]
        );
    });

    db.execSync("COMMIT");

    console.log("Evento guardado correctamente");
  } catch (error) {
    db.execSync("ROLLBACK");
        
    console.log("Error al guardar evento:", error);
  }
};

export const getEvents = (): EventListItem[] => {
  try {
    const result = db.getAllSync<EventListItem>(`
      SELECT 
        id,
        name,
        location,
        start_datetime as date,
        event_type_id as type
      FROM events
      WHERE deleted = 0
      ORDER BY start_datetime ASC
    `);
    return result;

  } catch (error) {
    console.log("Error obteniendo eventos:", error);
    return [];
  }
};

export const getEventTypes = (): DropdownItem[] => {
  try {
    const result = db.getAllSync<EventType>(`
      SELECT id, name FROM event_types
    `);

    return result.map((item) => ({
      value: item.id.toString(),
      label: item.name,
       
    }));
  } catch (error) {
    console.log("Error event types:", error);
    return [];
  }
};

export const getPackages = (): DropdownItem[] => {
  try {
    const result = db.getAllSync<Package>(`
      SELECT id, name FROM packages
    `);

    return result.map((item) => ({
      value: item.id.toString(),
      label: item.name,
    }));
  } catch (error) {
    console.log("Error packages:", error);
    return [];
  }
};

export const getServices = (): Service[] => {
  try {
    const result = db.getAllSync<Service>(`
      SELECT id, name, price, description FROM services
    `);

    return result.map((item: Service) => ({
      name: item.name,
      price: item.price,
      description: item.description,
      id: item.id,
    }));
  } catch (error) {
    console.log("Error services:", error);
    return [];
  }
};

export const getPaymentMethods = (): DropdownItem[] => {
  try {
    const result = db.getAllSync<PaymentMethod>(`
      SELECT id, name FROM payment_methods
    `);
    return result.map((item) => ({
      value: item.id.toString(),
      label: item.name,
    }));

  } catch (error) {    
    console.log("Error payment methods:", error);
    return [];
  }
};

export const getReceiptTypes = (): ReceiptType[] => {
  try {
    const result = db.getAllSync<ReceiptType>(`
      SELECT id, name, ico FROM receipt_types
    `);
    return result;
  } catch (error) {
    console.log("Error receipt types:", error);
    return [];
  }
};