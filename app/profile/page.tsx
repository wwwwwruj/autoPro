"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

interface Ticket {
  id: number;
  userEmail: string;
  description: string;
  status: "Ожидание" | "В работе" | "Решено";
  photo?: string;
}

export default function ProfilePage() {
  const router = useRouter();
  const [photo, setPhoto] = useState<string | null>(null);
  const [description, setDescription] = useState("");
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [email, setEmail] = useState("");

  useEffect(() => {
    const auth = localStorage.getItem("isAuth");
    const role = localStorage.getItem("role");
    const userEmail = localStorage.getItem("userEmail");
    if (auth !== "true" || role !== "user") {
      router.push("/login");
      return;
    }
    if (userEmail) setEmail(userEmail);

    // Загружаем существующие заявки пользователя
    const storedTickets = localStorage.getItem("tickets");
    if (storedTickets) {
      const allTickets: Ticket[] = JSON.parse(storedTickets);
      const userTickets = allTickets.filter((t) => t.userEmail === userEmail);
      setTickets(userTickets);
    }
  }, [router]);

  function handleLogout() {
    localStorage.removeItem("isAuth");
    localStorage.removeItem("role");
    router.push("/");
  }

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setPhoto(reader.result as string);
    };
    reader.readAsDataURL(file);
  }

  function handleSubmitTicket() {
    if (!description.trim()) return;

    const newTicket: Ticket = {
      id: Date.now(),
      userEmail: email,
      description,
      status: "Ожидание",
      photo: photo || undefined,
    };

    // Обновляем все заявки в localStorage
    const storedTickets = localStorage.getItem("tickets");
    const allTickets: Ticket[] = storedTickets ? JSON.parse(storedTickets) : [];
    allTickets.push(newTicket);
    localStorage.setItem("tickets", JSON.stringify(allTickets));

    // Обновляем только заявки текущего пользователя на странице
    setTickets((prev) => [...prev, newTicket]);

    // Сбрасываем форму
    setDescription("");
    setPhoto(null);
    alert("Заявка успешно отправлена! Админ её увидит.");
  }

  return (
    <main className="min-h-screen bg-gray-100 px-6 py-10">
      <div className="mx-auto max-w-md rounded-2xl bg-white p-6 shadow-xl space-y-6">
        <h1 className="text-2xl font-bold text-center text-black">Профиль</h1>

        {photo ? (
          <img
            src={photo}
            alt="Загруженное фото"
            className="mx-auto h-48 w-48 rounded-xl object-cover"
          />
        ) : (
          <div className="mx-auto h-48 w-48 rounded-xl bg-gray-200 flex items-center justify-center text-gray-500">
            Фото отсутствует
          </div>
        )}

        <div className="flex flex-col gap-3">
          <label className="cursor-pointer rounded-xl bg-green-600 py-3 hover:bg-green-700 text-center text-white font-semibold">
            Сделать фото
            <input
              type="file"
              accept="image/*"
              capture="environment"
              onChange={handleFileChange}
              className="hidden"
            />
          </label>

          <label className="cursor-pointer rounded-xl bg-green-600 py-3 hover:bg-green-700 text-white text-center font-semibold">
            Выбрать из галереи
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="hidden"
            />
          </label>
        </div>

        <textarea
          placeholder="Опишите проблему"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full rounded-lg border px-3 py-2 text-black resize-none"
        />

        <button
          onClick={handleSubmitTicket}
          className="w-full rounded-full bg-red-600 py-3 font-semibold text-white hover:bg-red-700 transition"
        >
          Отправить заявку
        </button>

        <h2 className="text-lg font-bold mt-4">Мои заявки</h2>
        <div className="flex flex-col gap-4">
          {tickets.map((ticket) => (
            <div
              key={ticket.id}
              className="bg-gray-100 p-3 rounded-lg border border-gray-300"
            >
              <p className="text-sm font-semibold">Статус: {ticket.status}</p>
              {ticket.photo && (
                <img
                  src={ticket.photo}
                  alt="Фото заявки"
                  className="w-full h-32 object-cover rounded mt-2"
                />
              )}
              <p className="mt-2">{ticket.description}</p>
            </div>
          ))}
        </div>
        <Link
          href="/"
          className="block w-full text-center text-sm text-gray-600 hover:underline mt-4"
        >
          Назад на главную
        </Link>
        <Link href="/admin" className="text-red-600 font-medium">
            Админ-Панель (просмотр)
          </Link>
        <button
          onClick={handleLogout}
          className="block w-full text-sm text-red-700 hover:underline mt-4"
        >
          Выйти из аккаунта
        </button>
      </div>
    </main>
  );
}
