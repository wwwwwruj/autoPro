"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

interface Ticket {
  id: number;
  userEmail: string;
  description: string;
  status: "Ожидание" | "В работе" | "Решено";
  photo?: string;
}

export default function AdminPage() {
  const router = useRouter();
  const [tickets, setTickets] = useState<Ticket[]>([]);

  useEffect(() => {
    const auth = localStorage.getItem("isAuth");
    const role = localStorage.getItem("role");
    if (auth !== "true" || role !== "admin") {
      router.push("/login");
      return;
    }

    // Загрузка заявок из localStorage
    const storedTickets = localStorage.getItem("tickets");
    if (storedTickets) {
      setTickets(JSON.parse(storedTickets));
    }
  }, [router]);

  // Функция выхода
  function handleLogout() {
    localStorage.removeItem("isAuth");
    localStorage.removeItem("role");
    localStorage.removeItem("userEmail");
    router.push("/");
  }

  // Обновление статуса заявки
  function updateStatus(id: number, status: Ticket["status"]) {
    const updated = tickets.map((ticket) =>
      ticket.id === id ? { ...ticket, status } : ticket
    );
    setTickets(updated);
    localStorage.setItem("tickets", JSON.stringify(updated));
  }

  return (
    <main className="min-h-screen bg-gray-100 px-6 py-10">
      <div className="mx-auto max-w-3xl">
        <h1 className="text-3xl font-bold text-black mb-6 text-center">
          Панель Администратора
        </h1>

        {tickets.length === 0 && (
          <p className="text-center text-black">Нет новых заявок</p>
        )}

        <div className="flex flex-col gap-4">
          {tickets.map((ticket) => (
            <div
              key={ticket.id}
              className="bg-white p-4 rounded-xl shadow flex flex-col gap-2"
            >
              <div className="flex justify-between items-center">
                <p className="font-semibold">{ticket.userEmail}</p>
                <span
                  className={`px-2 py-1 rounded text-white text-sm ${
                    ticket.status === "Ожидание"
                      ? "bg-yellow-500"
                      : ticket.status === "В работе"
                      ? "bg-blue-500"
                      : "bg-green-500"
                  }`}
                >
                  {ticket.status}
                </span>
              </div>

              {ticket.photo && (
                <img
                  src={ticket.photo}
                  alt="Фото заявки"
                  className="w-full h-48 object-cover rounded"
                />
              )}

              <p className="text-gray-700">{ticket.description}</p>

              <div className="flex gap-2 mt-2">
                {ticket.status === "Ожидание" && (
                  <button
                    onClick={() => updateStatus(ticket.id, "В работе")}
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                  >
                    В работу
                  </button>
                )}
                {ticket.status !== "Решено" && (
                  <button
                    onClick={() => updateStatus(ticket.id, "Решено")}
                    className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                  >
                    Решено
                  </button>
                )}
                <button
                  onClick={() => {
                    const filtered = tickets.filter((t) => t.id !== ticket.id);
                    setTickets(filtered);
                    localStorage.setItem("tickets", JSON.stringify(filtered));
                  }}
                  className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                >
                  Удалить
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="flex flex-col gap-2 mt-6">
          <button
            onClick={() => router.push("/")}
            className="w-full text-center text-sm text-gray-600 hover:underline"
          >
            Назад на главную
          </button>

          <button
            onClick={handleLogout}
            className="w-full p-4 text-sm text-red-700 hover:underline"
          >
            Выйти из аккаунта
          </button>
        </div>
      </div>
    </main>
  );
}
