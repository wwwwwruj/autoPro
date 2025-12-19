"use client";

import { useState } from "react";
import Link from "next/link";

/* Модальное окно успеха */
function SuccessModal({
  text,
  onClose,
}: {
  text: string;
  onClose: () => void;
}) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="w-[320px] rounded-2xl bg-white p-6 text-center shadow-xl">
        <h2 className="mb-2 text-xl font-bold text-green-600">Успешно</h2>
        <p className="mb-6 text-black">{text}</p>
        <button
          onClick={onClose}
          className="w-full rounded-full bg-red-600 py-3 font-semibold text-white hover:bg-red-700 transition"
        >
          Продолжить
        </button>
      </div>
    </div>
  );
}

export default function RegisterPage() {
  const [success, setSuccess] = useState(false); // показывает модалку
  const [loggedIn, setLoggedIn] = useState(false); // показывает профиль после регистрации
  const [photos, setPhotos] = useState<File[]>([]); // список загруженных фото

  /* Форма регистрации */
  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSuccess(true); // показываем модалку
  }

  /* Закрытие модалки */
  function handleCloseModal() {
    setSuccess(false); // скрываем модалку
    setLoggedIn(true); // показываем профиль пользователя
  }

  /* Загрузка фото */
  function handlePhotoUpload(e: React.ChangeEvent<HTMLInputElement>) {
    if (e.target.files) {
      setPhotos([...photos, ...Array.from(e.target.files)]);
    }
  }

  /* Если пользователь вошёл — показываем профиль */
  if (loggedIn) {
    return (
      <main className="min-h-screen flex flex-col items-center bg-gray-100 p-6">
        <header className="w-full flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Профиль пользователя</h1>
          <div className="flex gap-4">
            <button
              onClick={() => setLoggedIn(false)}
              className="rounded-full bg-red-600 px-4 py-2 text-white hover:bg-red-700 transition"
            >
              Выйти
            </button>
            <Link
              href="/"
              className="rounded-full bg-gray-300 px-4 py-2 text-black hover:bg-gray-400 transition"
            >
              Главная
            </Link>
          </div>
        </header>

        {/* Кнопки для фото */}
        <div className="flex flex-col gap-4 w-full max-w-md">
          <label className="cursor-pointer rounded-lg border-2 border-dashed border-red-400 py-6 text-center text-red-600 hover:bg-red-50 transition">
            Сделать фото
            <input
              type="file"
              accept="image/*"
              capture="environment"
              multiple
              onChange={handlePhotoUpload}
              className="hidden"
            />
          </label>

          <label className="cursor-pointer rounded-lg border-2 border-dashed border-red-400 py-6 text-center text-red-600 hover:bg-red-50 transition">
            Выбрать из галереи
            <input
              type="file"
              accept="image/*"
              multiple
              onChange={handlePhotoUpload}
              className="hidden"
            />
          </label>
        </div>

        {/* Отображение загруженных фото */}
        <div className="mt-6 grid grid-cols-2 gap-4 w-full max-w-md">
          {photos.map((file, index) => (
            <div key={index} className="relative">
              <img
                src={URL.createObjectURL(file)}
                alt={`Фото ${index + 1}`}
                className="w-full h-32 object-cover rounded-lg shadow"
              />
              <p className="text-sm text-gray-700 mt-1">
                Проблема / комментарий...
              </p>
            </div>
          ))}
        </div>
      </main>
    );
  }

  /* Форма регистрации */
  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm space-y-4 rounded-2xl bg-white p-6 shadow-xl"
      >
        <h1 className="text-center text-2xl font-bold">Регистрация</h1>

        <input
          type="email"
          placeholder="Email"
          required
          className="w-full rounded-lg border px-3 py-2 outline-none focus:ring-2 focus:ring-red-500"
        />

        <input
          type="password"
          placeholder="Пароль"
          required
          className="w-full rounded-lg border px-3 py-2 outline-none focus:ring-2 focus:ring-red-500"
        />

        <input
          type="password"
          placeholder="Повторите пароль"
          required
          className="w-full rounded-lg border px-3 py-2 outline-none focus:ring-2 focus:ring-red-500"
        />

        <button
          type="submit"
          className="w-full rounded-full bg-red-600 py-3 font-semibold text-white hover:bg-red-700 transition"
        >
          Зарегистрироваться
        </button>

        <p className="text-center text-sm">
          Уже есть аккаунт?{" "}
          <Link href="/login" className="font-medium text-red-600">
            Войти
          </Link>
        </p>
      </form>

      {success && (
        <SuccessModal
          text="Регистрация прошла успешно"
          onClose={handleCloseModal}
        />
      )}
    </main>
  );
}
