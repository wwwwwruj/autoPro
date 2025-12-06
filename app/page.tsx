import Image from "next/image";

export default function HomePage() {
  return (
    <main className="min-h-screen flex flex-col ">
      <header className="w-full px-20 py-4 flex items-center justify-between shadow-sm">
        <div className="flex text-black items-center gap-2 text-xl font-semibold">
          <img src="image71.svg" alt="logo" />
          <span>AutoFixFlow</span>
        </div>

        <nav className="flex items-center gap-15 text-sm font-medium">
          <a
            href="main.tsx"
            className="text-black hover:text-gray-600 transition"
          >
            Главная
          </a>
          <a href="#" className="text-black hover:text-gray-600 transition">
            Тарифы
          </a>
          <a href="#" className="text-black hover:text-gray-600 transition">
            О нас
          </a>
        </nav>

        <button className="rounded-full px-6 py-2 bg-gray-900 text-white hover:bg-gray-800 transition">
          <a href="#"> Войти</a>
        </button>
      </header>

      {/* Hero Section */}
      <section className="relative w-full flex-1">
        <div className="absolute inset-0">
          <Image
            src="/japon.jpg"
            alt="Автомобиль салон"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black/20" />
        </div>

        {/* <div className="relative z-10 max-w-6xl mx-auto px-8 py-24 text-white">
          <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-6">
            Контроль над <br />
            мастерской в <br />
            один клик
          </h1>

          <p className="text-lg md:text-xl mb-2">
            Ваш комфорт и безопасность — наш приоритет
          </p>
          <p className="text-base md:text-lg opacity-90">
            Профессиональный сервис для вашего авто — быстро, качественно и
            надёжно
          </p>
        </div> */}
      </section>

      
    </main>
  );
}
