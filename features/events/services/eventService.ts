import { db } from "../../../database/dataBase";
import { Event, 
  DropdownItem, 
  EventType, 
  Package, 
  Service, 
  PaymentMethod, 
  ReceiptType, 
  EventListItem, 
  EventEquipment, 
  EventStaff, 
  EventSchedule, 
  EventService } from "../types/Events.types";

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

    if(event.services?.length > 0){
      addServicesToEvent(eventID, event.services)
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

    console.log("Evento guardado correctamente");

    return Number(eventId);

  } catch (error) {        
    console.log("Error al guardar evento:", error);
    throw error;
  }
}

export const addServicesToEvent = (
  eventId: number,
  ServiceList: EventService[]
) => {

  try {
    ServiceList.forEach((s) => {

      let service = db.getFirstSync<{id:number}>(
        `SELECT id FROM services WHERE name = ?`,
        [s.service.name]
      );

      let serviceId:number;

      if(!service){

        const insert = db.runSync(
          `INSERT INTO services
          (name, description, price)
          VALUES (?, ?, ?)`,
          [
            s.service.name,
            s.service.description,
            s.service.price
          ]
        );

        serviceId = Number(insert.lastInsertRowId);

      } else {

        serviceId = service.id;
      }

      db.runSync(
        `INSERT INTO event_services
        (event_id, service_id, quantity)
        VALUES (?, ?, ?)`,
        [
          eventId,
          serviceId,
          s.quantity
        ]
      );
    });

  } catch (error) {
    console.log(error);
  }
};

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

export const getEventById = (id:number): Event | null => {
  try {
    const event = db.getFirstSync<any>(`
      SELECT 
        id,
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

        status_type_id
      FROM events
      WHERE id = ?
    `,[id]);
    
    if (!event) return null
    
    // Obtener cliente
    const customer = db.getFirstSync(`
      SELECT *
      FROM customers
      WHERE id = ?
    `, [event.customer_id]);

    // Event Type
    const eventType = db.getFirstSync(`
      SELECT *
      FROM event_types
      WHERE id = ?
    `, [event.event_type_id]);

    // Package
    const eventPackage = db.getFirstSync(`
      SELECT *
      FROM packages
      WHERE id = ?
    `, [event.package_id]);
    
    //Metodo de pago
    const paymentMethod = db.getFirstSync(`
        SELECT *
        FROM payment_methods
        WHERE id = ?
      `,[event.payment_method_id])

    //Tipo de recibo
    const receiptType = db.getFirstSync(`
        SELECT *
        FROM receipt_types
        WHERE id = ?
    `,[event.receipt_type_id])

    //Estado del evento
    const eventState = db.getFirstSync(`
        SELECT *
        FROM status_types
        WHERE id = ?
    `,[event.status_type_id])

    

    // Construir objeto final
    const fullEvent: Event = {

      ...event,

      event_customer: customer ?? undefined,
      event_type: eventType ?? undefined,
      event_package: eventPackage ?? undefined,
      payment_method: paymentMethod ?? undefined,
      receipt_type: receiptType ?? undefined,
      status: eventState ?? undefined,

      services: getServicesByEventId(id),
      staff: getStaffByEventId(id),
      equipment: getEquipmentByEventId(id),
      schedule: getScheduleByEventId(id)
    };

    return fullEvent; 

  } catch (error) {
    console.log("Error obteniendo eventos:", error);
    return null;
  }
};

export const getServicesByEventId = (id:number): EventService[] | null => {
  try {
    //Servicios del evento
    const rows = db.getAllSync<{
      es_id: number;
      event_id: number;
      quantity: number;
      service_id: number;
      service_name: string; 
      service_price: string;
      service_description: string;
    }>(`
      SELECT 
        es.id AS es_id,
        es.event_id,
        es.quantity,
        s.id AS service_id,
        s.name AS service_name,
        s.price AS service_price,
        s.description AS service_description
      FROM event_services AS es
      INNER JOIN services AS s ON es.service_id = s.id
      WHERE es.event_id = ?
    `, [id]);
    
    // 2. Si no hay filas, retornamos null
     if (!rows || rows.length === 0) return [];

    // 3. Mapeamos la estructura plana de la BD al objeto anidado de tu interfaz
    const result: EventService[] = rows.map((row) => ({

      id: row.es_id,

      event: row.event_id,

      quantity: row.quantity,

      service: {
        id: row.service_id,
        name: row.service_name,
        price: row.service_price,
        description: row.service_description
      }

    }));

    return result;

  } catch (error) {
    console.log("Error receipt types:", error);
    return null;
  }
}

export const getStaffByEventId = (id:number): EventStaff[] | null => {
  try {
    //Servicios del evento
    const rows = db.getAllSync<{
      es_id: number;
      event_id: number;
      role: string;
      staff_id: number;
      staff_name: string; 
      staff_phone: string;      
    }>(`
      SELECT 
        es.id AS es_id,
        es.event_id,
        es.role,
        
        s.id AS staff_id,
        s.name AS staff_name,
        s.phone AS staff_phone
      FROM event_staff AS es
      INNER JOIN staff AS s ON es.staff_id = s.id
      WHERE es.event_id = ?
    `, [id]);
    
    // 2. Si no hay filas, retornamos null
     if (!rows || rows.length === 0) return [];

    // 3. Mapeamos la estructura plana de la BD al objeto anidado de tu interfaz
    const result: EventStaff[] = rows.map((row) => ({

      id: row.es_id,

      event: row.event_id,

      role: row.role,

      staff: {
        id: row.staff_id,
        name: row.staff_name,
        phone: row.staff_phone
      }

    }));

    return result;

  } catch (error) {
    console.log("Error receipt types:", error);
    return null;
  }
}

export const getEquipmentByEventId = (id:number): EventEquipment[] | null => {
  try {
    //Servicios del evento
    const rows = db.getAllSync<{
      ee_id: number;
      event_id: number;
      quantity: number;
      equipment_id: number;
      equipment_name: string;     
    }>(`
      SELECT 
        ee.id AS ee_id,
        ee.event_id,
        ee.quantity,
        
        e.id AS equipment_id,
        e.name AS equipment_name
      FROM event_equipment AS ee
      INNER JOIN equipment AS e ON ee.equipment_id = e.id
      WHERE ee.event_id = ?
    `, [id]);
    
    // 2. Si no hay filas, retornamos null
     if (!rows || rows.length === 0) return [];

    // 3. Mapeamos la estructura plana de la BD al objeto anidado de tu interfaz
    const result: EventEquipment[] = rows.map((row) => ({

      id: row.ee_id,

      event: row.event_id,

      quantity: row.quantity,

      equipment: {
        id: row.equipment_id,
        name: row.equipment_name,
        total_quantity: 0,
        available_quantity: 0,
      }

    }));

    return result;

  } catch (error) {
    console.log("Error receipt types:", error);
    return null;
  }
}

export const getScheduleByEventId = (id:number): EventSchedule[] | null => {
  try {
    //Servicios del evento
    const rows = db.getAllSync<EventSchedule>(`
      SELECT 
        *
      FROM event_schedule
      WHERE event_id = ?
    `, [id]);
    
    // 2. Si no hay filas, retornamos null
     if (!rows || rows.length === 0) return [];

    return rows;

  } catch (error) {
    console.log("Error receipt types:", error);
    return null;
  }
}

export const deleteEvent = (id:number) => {
  try {
    db.runSync(`
      UPDATE events
      SET deleted = 1
      WHERE id = ?
    `, [id]);
    console.log("Evento eliminado correctamente");
  } catch (error) {
    console.log("Error al eliminar evento:", error);
  }
};

export const updateEvent = (event: Event) => {

  if (event.id === undefined) {
    throw new Error("No se puede actualizar un evento sin ID");
  }

  try {

    db.execSync("BEGIN TRANSACTION");

    db.runSync(
      `UPDATE events
       SET
          name = ?,
          location = ?,
          start_datetime = ?,
          end_datetime = ?,
          description = ?,
          total_cost = ?,
          paid_amount = ?,
          event_type_id = ?,
          package_id = ?,
          payment_method_id = ?,
          receipt_type_id = ?,
          status_type_id = ?

       WHERE id = ?`,
      [
        event.name,
        event.location,
        event.start_datetime,
        event.end_datetime,
        event.description,
        parseFloat(event.total_cost),
        parseFloat(event.paid_amount),
        event.event_type.id,
        event.event_package.id,
        event.payment_method.id,
        event.receipt_type.id,
        event.status.id,
        event.id
      ]
    );

    // eliminar relaciones actuales
    db.runSync(
      `DELETE FROM event_services WHERE event_id = ?`,
      [event.id]
    );

    db.runSync(
      `DELETE FROM event_equipment WHERE event_id = ?`,
      [event.id]
    );

    db.runSync(
      `DELETE FROM event_staff WHERE event_id = ?`,
      [event.id]
    );

    db.runSync(
      `DELETE FROM event_schedule WHERE event_id = ?`,
      [event.id]
    );

    // insertar nuevamente
    addServicesToEvent(event.id, event.services);
    addEquipmentToEvent(event.id, event.equipment);
    addStaffToEvent(event.id, event.staff);
    addScheduleToEvent(event.id, event.schedule);

    db.execSync("COMMIT");

  } catch (error) {

    db.execSync("ROLLBACK");

    throw error;
  }
}

//Suma todos los abonos y los pagos recibidos en el mes, agrupados por mes. Solo eventos no eliminados (deleted = 0) y que tengan algún pago (paid_amount > 0)
export const monthlyIncome = (): { month: string; total: number }[] => {
  try {
    const result = db.getAllSync<{ month: string; total: number }>(`
      SELECT 
        strftime('%Y-%m', start_datetime) AS month,
        SUM(paid_amount) AS total
      FROM events
      WHERE deleted = 0 AND paid_amount > 0
      GROUP BY month
      ORDER BY month ASC
    `);
    return result;
  } catch (error) {
    console.log("Error obteniendo ingresos mensuales:", error);
    return [];
  }
};

//Pendiente por cobrar
export const OutstandingPayments = (): { month: string; total: number }[] => {
  try {
    const result = db.getAllSync<{ month: string; total: number }>(`
      SELECT
        strftime('%Y-%m', start_datetime) AS month,
        SUM(total_cost - paid_amount) AS total
      FROM events
      WHERE deleted = 0
        AND total_cost > paid_amount
      GROUP BY month
      ORDER BY month ASC
    `);
    return result;
  } catch (error) {
    console.log("Error obteniendo pagos pendientes:", error);
    return [];
  }
};

//Ventas del mes
export const monthlySales = (): { month: string; total: number }[] => {
  try {
    const result = db.getAllSync<{ month: string; total: number }>(`
      SELECT 
        strftime('%Y-%m', start_datetime) AS month,
        SUM(total_cost) AS total
      FROM events
      WHERE deleted = 0
      GROUP BY month
      ORDER BY month ASC
    `);
    return result;
  } catch (error) {
    console.log("Error obteniendo ventas mensuales:", error);
    return [];
  }
};

export const currentMonthSummary = (): { month: string; totalIncome: number; totalOutstanding: number; totalSales: number } | null => {
  try {
    const result = db.getFirstSync<{ month: string; totalIncome: number; totalOutstanding: number; totalSales: number }>(`
      SELECT
        strftime('%Y-%m', start_datetime) AS month,
        SUM(paid_amount) AS totalIncome,
        SUM(total_cost - paid_amount) AS totalOutstanding,
        SUM(total_cost) AS totalSales
      FROM events
      WHERE deleted = 0
        AND strftime('%Y-%m', start_datetime) = strftime('%Y-%m', 'now')
      GROUP BY month
    `);
    return result || null;
  } catch (error) {
    console.log("Error obteniendo resumen del mes actual:", error);
    return null;
  }

};