"use client"; 
import Link from "next/link";

export default function TariffsPage() {
  return (
    <main className="min-h-screen bg-gray-100 px-20 py-16">
      <h1 className="mb-12 text-center text-4xl font-extrabold text-black">
        Тарифы AutoFixFlow
      </h1>

      <div className="grid gap-8 md:grid-cols-3">
        {/* Тариф 1 */}
        <div className="rounded-2xl bg-white p-6 shadow-xl">
          <h2 className="mb-4 text-xl font-bold text-black">Базовый</h2>
          <p className="mb-6 text-gray-600">
            Диагностика и первичный осмотр автомобиля
          </p>
          <p className="mb-6 text-3xl font-extrabold text-red-600">Бесплатно</p>
          <ul className="mb-6 space-y-2 text-sm text-gray-700">
            <li>• Осмотр авто</li>
            <li>• Фотофиксация проблем</li>
            <li>• Рекомендации</li>
          </ul>
        </div>

        {/* Тариф 2 */}
        <div className="rounded-2xl bg-white p-6 shadow-xl border-2 border-red-600">
          <h2 className="mb-4 text-xl font-bold text-black">Стандарт</h2>
          <p className="mb-6 text-gray-600">Полная диагностика и ремонт</p>
          <p className="mb-6 text-3xl font-extrabold text-red-600">5 000 сом</p>
          <ul className="mb-6 space-y-2 text-sm text-gray-700">
            <li>• Диагностика</li>
            <li>• Ремонт</li>
            <li>• Отчёт с фото</li>
          </ul>
        </div>

        {/* Тариф 3 */}
        <div className="rounded-2xl bg-white p-6 shadow-xl">
          <h2 className="mb-4 text-xl font-bold text-black">Премиум</h2>
          <p className="mb-6 text-gray-600">Комплексный сервис под ключ</p>
          <p className="mb-6 text-3xl font-extrabold text-red-600">
            12 000 сом
          </p>
          <ul className="mb-6 space-y-2 text-sm text-gray-700">
            <li>• Всё из “Стандарт”</li>
            <li>• Срочный ремонт</li>
            <li>• Приоритетное обслуживание</li>
          </ul>
        </div>
      </div>
      <Link
        href="/"
        className="block m-10    text-center text-sm text-gray-600 hover:underline"
      >
        Назад на главную
      </Link>
    </main>
  );
}
