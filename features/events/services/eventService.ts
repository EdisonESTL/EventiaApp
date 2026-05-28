import { db } from "../../../database/dataBase";
import { Event, DropdownItem, EventType, Package, Service, PaymentMethod, ReceiptType, EventListItem, EventEquipment, EventStaff, EventSchedule } from "../types/Events.types";

export const createEvent = (event: Event) => {
  try {
    db.execSync("BEGIN TRANSACTION");

    const eventID = createEventBase(event)

    if(event.equipment?.length > 0){
      addEquipmentToEvent(eventID, event.equipment)
    }

    if(event.staff?.length > 0){
      addStaffToEvent(eventID, event.staff)
    }

    if(event.schedule?.length > 0){
      addScheduleToEvent(eventID, event.schedule)
    }

    db.execSync("COMMIT");

    console.log("Evento guardado correctamente");
  } catch (error) {
    db.execSync("ROLLBACK");
        
    console.log("Error al guardar evento:", error);
  }
};

export const createEventBase = (event: Event): number => {
  try {
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
        status_type_id,
        deleted
        ) VALUES (?, ?, ?, ?, ?, ?, ?,?, ?, ?, ?, ?, ?, ?)`,
      [
        event.name,
        event.location,
        event.start_datetime,
        event.end_datetime,
        event.description,

        customerId, // ID del cliente recién creado,
        event.event_type.id, // ID del tipo de evento seleccionado
        event.event_package.id, // ID del paquete seleccionado

        parseFloat(event.total_cost || "0"),
        parseFloat(event.paid_amount || "0"),
        event.payment_method.id, // ID del método de pago seleccionado
        event.receipt_type.id, // ID del tipo de recibo seleccionado
        0,
        0 // deleted por defecto en 0
      ]
    );

    const eventId = Number(result.lastInsertRowId);

    //3 services
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

    console.log("Evento guardado correctamente");

    return Number(eventId);

  } catch (error) {        
    console.log("Error al guardar evento:", error);
    throw error;
  }
}

export const addEquipmentToEvent = (
  eventId: number,
  equipmentList: EventEquipment[]
) => {

  try {
    equipmentList.forEach((e) => {

      let equipment = db.getFirstSync<{id:number}>(
        `SELECT id FROM equipment WHERE name = ?`,
        [e.equipment.name]
      );

      let equipmentId:number;

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

  } catch (error) {
    console.log(error);
  }
};

export const addStaffToEvent = (
  eventId: number,
  staffList: EventStaff[]
) => {

  try {

    staffList.forEach((e) => {

      let staff = db.getFirstSync<{id:number}>(
        `SELECT id FROM staff WHERE name = ?`,
        [e.staff.name]
      );

      let staffId:number;

      if(!staff){

        const insert = db.runSync(
          `INSERT INTO staff
          (name, phone)
          VALUES (?, ?)`,
          [
            e.staff.name,
            e.staff.phone,
          ]
        );

        staffId = Number(insert.lastInsertRowId);

      } else {

        staffId = staff.id;
      }

      db.runSync(
        `INSERT INTO event_staff
        (event_id, staff_id, role)
        VALUES (?, ?, ?)`,
        [
          eventId,
          staffId,
          e.role
        ]
      );
    });
  } catch (error) {
    console.log(error);
  }
};

export const addScheduleToEvent = (
  eventId: number,
  scheduleList: EventSchedule[]
) => {

  try {
    scheduleList.forEach((e) => {
      db.runSync(
        `INSERT INTO event_schedule (event_id, title, start_time, end_time)
         VALUES (?, ?, ?, ?)`,
        [eventId, e.title, e.start_time, e.end_time]
      );
    });

  } catch (error) {
    console.log(error);
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