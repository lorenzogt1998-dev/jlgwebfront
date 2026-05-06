// src/services/reservationApi.ts
export async function createReservation(data) {
    const res = await fetch("/api/reservations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            showDate: { id: data.showDateId }, // 👈 importante
            organizationName: data.organizationName,
            contactName: data.contactName,
            contactEmail: data.contactEmail,
            contactPhone: data.contactPhone,
            seatsRequested: data.seatsRequested,
            seatsConfirmed: 0,
        }),
    });
    if (!res.ok) {
        throw new Error("Error creando reserva");
    }
    return res.json(); // TicketReservation guardada
}
