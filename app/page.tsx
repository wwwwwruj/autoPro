import Image from "next/image";
import Link from "next/link";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-[#cfcfcf]">
      <header className="flex items-center justify-between px-20 py-6">
        <div className="flex items-center gap-2 text-xl font-semibold text-black">
          <img src="image71.svg" alt="logo" className="h-9 w-9 " />
          <span>AutoFixFlow</span>
        </div>
        <div className="flex items-center gap-20">
          <nav className="flex gap-25 text-sm font-bold text-black">
            <a href="#">Тарифы</a>
            <a href="#">О нас</a>
          </nav>
          <Link
            href="/login"
            className="rounded-full bg-gray-900 px-8 py-2 text-sm text-white hover:text-gray-200"
          >
            Войти / Зарегистрироваться
          </Link>
          
        </div>
      </header>

      <section className="relative px-20 pt-24 ">
        <div className="relative flex items-center -translate-y-5.5 ">
          <div className="max-w-xl ">
            <h1 className="text-[56px] font-extrabold leading-tight text-black">
              AutoFixFlow
              <br />
              движение
              <br />
              без задержек
            </h1>
          </div>
          <div className="relative flex items-center ">
            {/* Красный круг */}
            <div className="absolute h-[520px] w-[520px] rounded-full bg-red-700" />
            {/* Машина */}
            <img
              src="/car.png"
              alt="car"
              className="relative z-10 w-[600px] translate-x-50 "
            />
            {/* Тень под машиной */}
            <div className="absolute bottom-10 z-0 translate-x-50 h-[90px] w-[520px] rounded-full bg-black/30 blur-2xl" />
          </div>
        </div>
      </section>

      <section className="mt-24 flex justify-center bg-[#e5e5e5] py-12">
        <button className="rounded-xl bg-red-700 px-20 py-8 text-2xl font-semibold text-white">
          Начать ремонт
        </button>
      </section>
      
    </main>
  );
}
