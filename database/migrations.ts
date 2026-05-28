import { db } from './dataBase';

export const initDB = async () => {
  db.execSync(`
    PRAGMA foreign_keys = ON;

    CREATE TABLE IF NOT EXISTS customers (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      phone TEXT,
      email TEXT,
      deleted INTEGER NOT NULL DEFAULT(0)
    );

    CREATE TABLE IF NOT EXISTS event_types (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      deleted INTEGER NOT NULL DEFAULT(0)
    );

    CREATE TABLE IF NOT EXISTS  payment_methods (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      deleted INTEGER NOT NULL DEFAULT(0)
    );

    CREATE TABLE IF NOT EXISTS receipt_types (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      ico TEXT NOT NULL DEFAULT 'cash',
      deleted INTEGER NOT NULL DEFAULT(0)
    );

    CREATE TABLE IF NOT EXISTS status_types (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      deleted INTEGER NOT NULL DEFAULT(0)
    );
    
    CREATE TABLE IF NOT EXISTS packages (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      deleted INTEGER NOT NULL DEFAULT(0)
    );

    CREATE TABLE IF NOT EXISTS events (
      id INTEGER PRIMARY KEY AUTOINCREMENT,

      name TEXT NOT NULL,
      location TEXT NOT NULL,
      start_datetime TEXT NOT NULL,
      end_datetime TEXT NOT NULL,
      description TEXT,

      customer_id INTEGER NOT NULL,
      event_type_id INTEGER NOT NULL,
      package_id INTEGER NOT NULL,

      total_cost REAL DEFAULT 0,
      paid_amount REAL DEFAULT 0,
      payment_method_id INTEGER NOT NULL,
      receipt_type_id INTEGER NOT NULL,

      status_type_id INTEGER NOT NULL,
      
      deleted INTEGER NOT NULL DEFAULT(0),

      FOREIGN KEY (customer_id) REFERENCES customers(id),
      FOREIGN KEY (event_type_id) REFERENCES event_types(id),
      FOREIGN KEY (package_id) REFERENCES packages(id),
      FOREIGN KEY (payment_method_id) REFERENCES payment_methods(id),
      FOREIGN KEY (receipt_type_id) REFERENCES receipt_types(id)
      FOREIGN KEY (status_type_id) REFERENCES status_types(id)
    );

    CREATE TABLE IF NOT EXISTS event_schedule (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      start_time TEXT NOT NULL,
      end_time TEXT,

      event_id INTEGER NOT NULL,
      deleted INTEGER NOT NULL DEFAULT(0),

      FOREIGN KEY (event_id) REFERENCES events(id)
    );

    CREATE TABLE IF NOT EXISTS services (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      price REAL,
      description TEXT,
      deleted INTEGER NOT NULL DEFAULT(0)
    );

    CREATE TABLE IF NOT EXISTS event_services (
      id INTEGER PRIMARY KEY AUTOINCREMENT,

      event_id INTEGER NOT NULL,
      service_id INTEGER NOT NULL,
      quantity INTEGER DEFAULT 1,

      FOREIGN KEY (event_id) REFERENCES events(id),
      FOREIGN KEY (service_id) REFERENCES services(id)
    );

    CREATE TABLE IF NOT EXISTS equipment (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL UNIQUE,
      total_quantity INTEGER NOT NULL,
      available_quantity INTEGER NOT NULL,
      deleted INTEGER NOT NULL DEFAULT(0)
    );

    CREATE TABLE IF NOT EXISTS event_equipment (
      id INTEGER PRIMARY KEY AUTOINCREMENT,

      event_id INTEGER NOT NULL,
      equipment_id INTEGER NOT NULL,
      quantity INTEGER NOT NULL,

      FOREIGN KEY (event_id) REFERENCES events(id),
      FOREIGN KEY (equipment_id) REFERENCES equipment(id)
    );

    CREATE TABLE IF NOT EXISTS staff (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,      
      phone TEXT,
      deleted INTEGER NOT NULL DEFAULT(0)
    );

    CREATE TABLE IF NOT EXISTS event_staff (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      role TEXT,
      event_id INTEGER NOT NULL,
      staff_id INTEGER NOT NULL,

      FOREIGN KEY (event_id) REFERENCES events(id),
      FOREIGN KEY (staff_id) REFERENCES staff(id)
    );
  `);
};

export const seedDB = () => {
  try {
    db.execSync("BEGIN TRANSACTION");

    // EVENT TYPES
    db.runSync(`
      INSERT OR IGNORE INTO event_types (id, name)
      VALUES 
        (1, 'Matrimonio'),
        (2, 'Cumpleaños'),
        (3, 'Corporativo')
    `);

    // PACKAGES
    db.runSync(`
      INSERT OR IGNORE INTO packages (id, name)
      VALUES 
        (1, 'Básico'),
        (2, 'Intermedio'),
        (3, 'Premium')
    `);

    // SERVICES
    db.runSync(`
      INSERT OR IGNORE INTO services (id, name, price, description)
      VALUES 
        (1, 'Sonido', 100, 'Servicio de sonido'),
        (2, 'Iluminación', 150, 'Servicio de iluminación'),
        (3, 'DJ', 200, 'Servicio de DJ')
    `);


    // EQUIPMENT
    db.runSync(`
      INSERT OR IGNORE INTO equipment (id, name, total_quantity, available_quantity)
      VALUES 
        (1, 'Parlante', 10, 10),
        (2, 'Consola', 5, 5),
        (3, 'Luces LED', 20, 20)
    `);

    // PAYMENT METHODS
    db.runSync(`
      INSERT OR IGNORE INTO payment_methods (id, name)
      VALUES 
        (1, 'Efectivo'),
        (2, 'Tarjeta de crédito'),
        (3, 'Cheque')
    `);

    // RECEIPT TYPES
    db.runSync(`
      INSERT OR IGNORE INTO receipt_types (id, name, ico)
      VALUES 
        (1, 'Factura', 'file-document'),
        (2, 'Recibo', 'receipt')
    `);

    // STATUS TYPES
    db.runSync(`
      INSERT OR IGNORE INTO status_types (id, name)
      VALUES 
        (0, 'draft'),
        (1, 'in_progress'),
        (2, 'completed'),
        (3, 'canceled')
    `);

    db.execSync("COMMIT");

    console.log("✅ Seed ejecutado");
  } catch (error) {
    db.execSync("ROLLBACK");
    console.log("❌ Error en seed:", error);
  }
};