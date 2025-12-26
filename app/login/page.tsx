"use client";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    const storedUser = localStorage.getItem("user");
    if (!storedUser) {
      setError("Пользователь не найден");
      return;
    }

    const user = JSON.parse(storedUser);
    if (user.email !== email || user.password !== password) {
      setError("Неверный email или пароль");
      return;
    }

    // Авторизация и редирект по роли
    localStorage.setItem("isAuth", "true");
    localStorage.setItem("role", user.role);

    if (user.role === "user") router.push("/profile");
    else router.push("/admin");
  }

  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm rounded-2xl bg-white p-6 shadow-xl space-y-4"
      >
        <h1 className="text-2xl font-bold text-center text-black">Вход</h1>

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

        {error && <p className="text-red-600 text-center">{error}</p>}

        <button
          type="submit"
          className="w-full rounded-full bg-red-600 py-3 text-white font-semibold hover:bg-red-700 transition"
        >
          Войти
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
