import { db } from "../../../database/dataBase";
import { Event } from "../types/Events.types";

  //Suma todos los abonos y los pagos recibidos en el mes, agrupados por mes. Solo eventos no eliminados (deleted = 0) y que tengan algún pago (paid_amount > 0)
export const calculateMonthlyIncome = (events : Event[]): { month: string; total: number }[] => {
  try {
    const monthlyTotals: Record<string, number> = {};  

    for (const event of events) {
      if(event.deleted || parseFloat(event.paid_amount) <= 0) continue; // Ignorar eventos eliminados o sin pagos
        
        const month = event.start_datetime.substring(0, 7); // Obtener el mes en formato "YYYY-MM"
    
        if(!monthlyTotals[month]) {
          monthlyTotals[month] = 0;
        }
        monthlyTotals[month] += parseFloat(event.paid_amount); // Sumar el pago recibido al total del mes
    }

    // Convertir el objeto a un arreglo y ordenarlo
    return Object.entries(monthlyTotals)
      .map(([month, total]) => ({
        month,
        total,
      }))
      .sort((a, b) => a.month.localeCompare(b.month));
    
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