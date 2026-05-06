// src/services/showDateApi.ts
export async function createShowDate(data) {
    const res = await fetch("/api/show-dates", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
    });
    if (!res.ok) {
        throw new Error("Error creando ShowDate");
    }
    return res.json(); // ShowDate guardado
}
