"use client";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [role, setRole] = useState<"user" | "admin">("user"); // роль по умолчанию
  const [error, setError] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    if (password !== confirmPassword) {
      setError("Пароли не совпадают");
      return;
    }

    // Сохраняем данные пользователя и роль
    const user = { email, password, role };
    localStorage.setItem("user", JSON.stringify(user));
    localStorage.setItem("isAuth", "true");
    localStorage.setItem("role", role);

    // Редирект на соответствующий профиль
    if (role === "user") router.push("/profile");
    else router.push("/admin");
  }

  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm rounded-2xl bg-white p-6 shadow-xl space-y-4"
      >
        <h1 className="text-2xl font-bold text-black text-center">
          Регистрация
        </h1>

        <input
          type="email"
          placeholder="Email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full text-black rounded-lg border px-3 py-2"
        />

        <input
          type="password"
          placeholder="Пароль"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full text-black rounded-lg border px-3 py-2"
        />

        <input
          type="password"
          placeholder="Повторите пароль"
          required
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          className="w-full text-black rounded-lg border px-3 py-2"
        />
        {error && <p className="text-red-600 text-center">{error}</p>}

        {/* Выбор роли */}
        <div className="flex justify-around mt-2">
          <label className="flex items-center text-black gap-2">
            <input
              type="radio"
              value="user"
              checked={role === "user"}
              onChange={() => setRole("user")}
              className="accent-red-600"
            />
            Клиент
          </label>
          <label className="flex items-center text-black gap-2">
            <input
              type="radio"
              value="admin"
              checked={role === "admin"}
              onChange={() => setRole("admin")}
              className="accent-red-600 "
            />
            Админ
          </label>
        </div>

        <button
          type="submit"
          className="w-full rounded-full bg-red-600 py-3 text-white font-semibold hover:bg-red-700 transition"
        >
          Зарегистрироваться
        </button>
          
        <p className="text-center text-black text-sm">
          Нет аккаунта?{" "}
          <Link href="/register" className="text-red-600 font-medium">
            Зарегистрироваться
          </Link>
        </p>
        <Link
          href="/"
          className="block w-full text-center text-sm text-gray-600 hover:underline mt-4"
        >
          Назад на главную
        </Link>
      </form>
    </main>
  );
}
