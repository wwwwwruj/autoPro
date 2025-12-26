
"use client"; 
import Link from "next/link";

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-gray-100 px-20 py-16">
      <h1 className="mb-10 text-center text-4xl font-extrabold text-black">
        О нас
      </h1>

      <div className="mx-auto max-w-3xl space-y-6 text-lg text-gray-700">
        <p>
          <span className="font-semibold text-black">AutoFixFlow</span> — это
          современный сервис по диагностике и ремонту автомобилей.
        </p>

        <p>
          Мы соединяем владельцев автомобилей и мастеров, чтобы процесс ремонта
          был прозрачным, быстрым и понятным.
        </p>

        <p>
          Вы можете отправить фото проблемы, описать неисправность и получить
          решение без лишних звонков и ожиданий.
        </p>

        <p className="font-semibold text-black">
          Наша цель — движение без задержек.
        </p>
      </div>
      <Link
        href="/"
        className="block m-8 text-center text-sm text-gray-600 hover:underline"
      >
        Назад на главную
      </Link>
    </main>
  );
}
