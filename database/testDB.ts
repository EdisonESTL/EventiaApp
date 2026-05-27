import { initDB } from "./migrations";
import { db } from "./dataBase";

export const testDB = async () => {
  try {
    console.log("🚀 Iniciando prueba DB");

    await initDB();

    // Insertar cliente
    await db.runAsync(
      `INSERT INTO customers (name, phone) VALUES (?, ?)`,
      ['Test User', '0999999']
    );

    // Leer clientes
    const customers = await db.getAllAsync(`SELECT * FROM customers`);
    console.log("Clientes:", customers);

    // Insertar evento
    await db.runAsync(
      `INSERT INTO events (
        name, location, start_datetime, end_datetime,
        customer_id, total_cost, paid_amount
      ) VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [
        'Evento Test',
        'Quito',
        new Date().toISOString(),
        new Date().toISOString(),
        1,
        100,
        20
      ]
    );

    // 📥 Leer eventos
    const events = await db.getAllAsync(`SELECT * FROM events`);
    console.log("Eventos:", events);

  } catch (error) {
    console.log("Error DB:", error);
  }
};
