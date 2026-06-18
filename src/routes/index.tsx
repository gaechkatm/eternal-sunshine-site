import { createFileRoute } from "@tanstack/react-router";
import { useRef, useState } from "react";
import { ChevronLeft, ChevronRight, Play, Plus, Tv, Download, Globe2, Baby, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle,
} from "@/components/ui/dialog";
import {
  Accordion, AccordionContent, AccordionItem, AccordionTrigger,
} from "@/components/ui/accordion";
import { Toaster } from "@/components/ui/sonner";
import { toast } from "sonner";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Netflix — смотрите фильмы и сериалы онлайн" },
      { name: "description", content: "Безлимитные фильмы, сериалы и многое другое. Смотрите где угодно. Отменяйте в любое время." },
      { property: "og:title", content: "Netflix — смотрите фильмы и сериалы онлайн" },
      { property: "og:description", content: "Безлимитные фильмы, сериалы и многое другое." },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/" },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
  component: Index,
});

const MOVIES = [
  { t: "Очень странные дела", g: "from-purple-900 via-red-900 to-black" },
  { t: "Ведьмак", g: "from-stone-800 via-amber-900 to-black" },
  { t: "Корона", g: "from-yellow-900 via-stone-900 to-black" },
  { t: "Игра в кальмара", g: "from-pink-900 via-fuchsia-900 to-black" },
  { t: "Тьма", g: "from-zinc-800 via-zinc-900 to-black" },
  { t: "Люпен", g: "from-sky-900 via-indigo-900 to-black" },
  { t: "Деньги", g: "from-red-900 via-orange-900 to-black" },
  { t: "Бумажный дом", g: "from-rose-900 via-red-950 to-black" },
  { t: "Бриджертоны", g: "from-rose-800 via-pink-900 to-black" },
  { t: "Озарк", g: "from-emerald-900 via-teal-950 to-black" },
];

const FAQ = [
  { q: "Что такое Netflix?", a: "Netflix — это стриминговый сервис, который предлагает фильмы, сериалы и документальные фильмы на тысячах подключенных к интернету устройств." },
  { q: "Сколько стоит Netflix?", a: "Смотрите Netflix на смартфоне, планшете, Smart TV, ноутбуке или устройстве для потокового вещания, и всё за одну фиксированную ежемесячную плату." },
  { q: "Где можно смотреть?", a: "Смотрите где угодно и когда угодно. Войдите в свой аккаунт Netflix, чтобы смотреть мгновенно через интернет на netflix.com с любого компьютера." },
  { q: "Как отменить подписку?", a: "Netflix гибок. Здесь нет надоедливых контрактов и обязательств. Вы можете отменить свой аккаунт онлайн в два клика." },
  { q: "Что я могу смотреть?", a: "Netflix предлагает обширную библиотеку из полнометражных фильмов, документалок, сериалов, аниме, отмеченных наградами оригинальных проектов Netflix и других." },
  { q: "Подходит ли Netflix для детей?", a: "Опыт Netflix для детей включён в вашу подписку, чтобы родители могли быть спокойны, а дети наслаждались семейными сериалами и фильмами в своём собственном пространстве." },
];

function Index() {
  const [email, setEmail] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [signInOpen, setSignInOpen] = useState(false);
  const carouselRef = useRef<HTMLDivElement>(null);

  const handleStart = () => {
    if (!email.includes("@")) {
      toast.error("Введите корректный email");
      return;
    }
    setDialogOpen(true);
  };

  const scrollCarousel = (dir: "left" | "right") => {
    const el = carouselRef.current;
    if (!el) return;
    el.scrollBy({ left: dir === "left" ? -400 : 400, behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-[#141414] text-white">
      <Toaster theme="dark" position="top-center" />

      {/* HERO */}
      <section className="relative overflow-hidden">
        <div
          aria-hidden
          className="absolute inset-0"
          style={{
            backgroundImage:
              "radial-gradient(ellipse at 30% 20%, rgba(229,9,20,0.35), transparent 60%), radial-gradient(ellipse at 80% 70%, rgba(180,0,30,0.4), transparent 55%), linear-gradient(180deg, #0b0b0b 0%, #141414 70%, #000 100%)",
          }}
        />
        <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-b from-transparent to-black/90" />

        <div className="relative">
          <header className="flex items-center justify-between px-6 py-5 md:px-12">
            <a href="#top" className="text-2xl md:text-4xl font-black tracking-tight text-[#E50914]">
              NETFLIX
            </a>
            <Button
              onClick={() => setSignInOpen(true)}
              className="bg-[#E50914] hover:bg-[#f6121d] text-white border-0"
            >
              Войти
            </Button>
          </header>

          <div className="mx-auto flex max-w-3xl flex-col items-center px-6 py-24 md:py-36 text-center">
            <h1 className="text-4xl md:text-6xl font-extrabold leading-tight">
              Безлимитные фильмы, сериалы и многое другое
            </h1>
            <p className="mt-5 text-lg md:text-2xl text-white/90">
              Смотрите где угодно. Отменяйте в любое время.
            </p>
            <p className="mt-6 text-sm md:text-base text-white/80">
              Готовы смотреть? Введите свой email, чтобы создать или возобновить подписку.
            </p>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleStart();
              }}
              className="mt-5 flex w-full max-w-xl flex-col gap-2 sm:flex-row"
            >
              <Input
                type="email"
                placeholder="Email-адрес"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="h-12 flex-1 bg-black/60 border-white/30 text-white placeholder:text-white/60"
              />
              <Button type="submit" className="h-12 bg-[#E50914] hover:bg-[#f6121d] text-white text-lg px-6">
                Начать <ChevronRight className="ml-1" size={20} />
              </Button>
            </form>
          </div>
        </div>
      </section>

      <div className="h-2 bg-neutral-800" />

      {/* TRENDING */}
      <section className="px-6 md:px-12 py-14">
        <h2 className="text-2xl md:text-3xl font-bold mb-6">В тренде сейчас</h2>
        <div className="relative group">
          <button
            onClick={() => scrollCarousel("left")}
            aria-label="Назад"
            className="absolute left-0 top-1/2 z-10 -translate-y-1/2 hidden md:flex h-full w-12 items-center justify-center bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity"
          >
            <ChevronLeft size={32} />
          </button>
          <div
            ref={carouselRef}
            className="flex gap-3 overflow-x-auto scroll-smooth pb-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          >
            {MOVIES.map((m, i) => (
              <div
                key={m.t}
                className={`relative shrink-0 w-44 md:w-56 aspect-[2/3] rounded-md overflow-hidden bg-gradient-to-br ${m.g} ring-1 ring-white/10 hover:ring-2 hover:ring-[#E50914] transition`}
              >
                <span className="absolute top-2 left-3 text-6xl md:text-7xl font-black text-white/15">
                  {i + 1}
                </span>
                <div className="absolute inset-x-0 bottom-0 p-3 bg-gradient-to-t from-black/90 to-transparent">
                  <p className="text-sm md:text-base font-semibold">{m.t}</p>
                  <div className="mt-2 flex gap-2">
                    <button
                      onClick={() => toast.success(`Воспроизведение: ${m.t}`)}
                      className="flex items-center gap-1 rounded bg-white text-black text-xs px-2 py-1 font-semibold hover:bg-white/90"
                    >
                      <Play size={14} fill="currentColor" /> Смотреть
                    </button>
                    <button
                      onClick={() => toast(`Добавлено в Мой список: ${m.t}`)}
                      className="flex items-center gap-1 rounded bg-white/20 text-white text-xs px-2 py-1 font-semibold hover:bg-white/30"
                    >
                      <Plus size={14} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <button
            onClick={() => scrollCarousel("right")}
            aria-label="Вперёд"
            className="absolute right-0 top-1/2 z-10 -translate-y-1/2 hidden md:flex h-full w-12 items-center justify-center bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity"
          >
            <ChevronRight size={32} />
          </button>
        </div>
      </section>

      <div className="h-2 bg-neutral-800" />

      {/* REASONS */}
      <section className="px-6 md:px-12 py-14">
        <h2 className="text-2xl md:text-3xl font-bold mb-8">Больше причин подписаться</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { icon: Tv, title: "Смотрите на ТВ", desc: "Смотрите на Smart TV, PlayStation, Xbox, Apple TV и других." },
            { icon: Download, title: "Скачивайте сериалы", desc: "Сохраняйте любимое легко и смотрите всегда офлайн." },
            { icon: Globe2, title: "Смотрите везде", desc: "Стримьте на телефоне, планшете, ноутбуке и ТВ." },
            { icon: Baby, title: "Создан для детей", desc: "Отдельный профиль для детей с любимыми героями." },
          ].map(({ icon: Icon, title, desc }) => (
            <div
              key={title}
              className="rounded-lg p-6 bg-gradient-to-br from-[#1a1a2e] via-[#16213e] to-[#0f0f23] border border-white/10"
            >
              <Icon className="text-[#E50914] mb-4" size={36} />
              <h3 className="text-lg font-bold">{title}</h3>
              <p className="mt-2 text-sm text-white/70">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      <div className="h-2 bg-neutral-800" />

      {/* FAQ */}
      <section className="px-6 md:px-12 py-14">
        <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center">Часто задаваемые вопросы</h2>
        <div className="mx-auto max-w-3xl">
          <Accordion type="single" collapsible className="space-y-2">
            {FAQ.map((item, i) => (
              <AccordionItem
                key={i}
                value={`item-${i}`}
                className="border-0 bg-neutral-800 hover:bg-neutral-700 transition-colors"
              >
                <AccordionTrigger className="px-5 py-5 text-lg md:text-xl font-medium hover:no-underline">
                  {item.q}
                </AccordionTrigger>
                <AccordionContent className="px-5 pb-5 text-base md:text-lg text-white/90">
                  {item.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>

          <div className="mt-10 text-center">
            <p className="text-base md:text-lg mb-4">
              Готовы смотреть? Введите свой email, чтобы создать или возобновить подписку.
            </p>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleStart();
              }}
              className="flex flex-col gap-2 sm:flex-row justify-center"
            >
              <Input
                type="email"
                placeholder="Email-адрес"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="h-12 sm:max-w-sm bg-black/60 border-white/30 text-white placeholder:text-white/60"
              />
              <Button type="submit" className="h-12 bg-[#E50914] hover:bg-[#f6121d] text-white text-lg px-6">
                Начать <ChevronRight className="ml-1" size={20} />
              </Button>
            </form>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="px-6 md:px-12 py-12 border-t border-white/10 text-white/70">
        <div className="mx-auto max-w-5xl">
          <p className="mb-6">
            Вопросы? Позвоните{" "}
            <a href="tel:8-800-555-3456" className="underline hover:text-white">
              8-800-555-3456
            </a>
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm">
            {["Вопросы и ответы","Справочный центр","Аккаунт","Пресса","О компании","Условия использования","Конфиденциальность","Контакты"].map((l) => (
              <a key={l} href="#" onClick={(e) => { e.preventDefault(); toast(`Раздел: ${l}`); }} className="hover:underline">
                {l}
              </a>
            ))}
          </div>
          <div className="mt-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="inline-flex w-fit items-center gap-2 border border-white/30 px-4 py-2 text-sm hover:bg-white/10"
            >
              <ChevronDown size={16} className="rotate-180" /> Наверх
            </button>
            <p className="text-xs">© 1997-2026 Netflix-like demo</p>
          </div>
          <p className="mt-8 text-center text-sm text-[#E50914] font-semibold tracking-wide">
            проверка для EternalSunshine 18.06.2026
          </p>
        </div>
      </footer>

      {/* DIALOGS */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="bg-neutral-900 text-white border-white/10">
          <DialogHeader>
            <DialogTitle>Почти готово!</DialogTitle>
            <DialogDescription className="text-white/70">
              Мы отправили подтверждение на <span className="text-white font-medium">{email || "ваш email"}</span>.
              Это демо-страница — реальной регистрации не происходит.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button onClick={() => setDialogOpen(false)} className="bg-[#E50914] hover:bg-[#f6121d]">
              Понятно
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={signInOpen} onOpenChange={setSignInOpen}>
        <DialogContent className="bg-neutral-900 text-white border-white/10">
          <DialogHeader>
            <DialogTitle className="text-2xl">Вход</DialogTitle>
          </DialogHeader>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              setSignInOpen(false);
              toast.success("Добро пожаловать! (демо)");
            }}
            className="space-y-3"
          >
            <Input type="email" placeholder="Email или номер телефона" className="h-12 bg-neutral-800 border-white/10 text-white" />
            <Input type="password" placeholder="Пароль" className="h-12 bg-neutral-800 border-white/10 text-white" />
            <Button type="submit" className="w-full h-12 bg-[#E50914] hover:bg-[#f6121d] text-white text-base">
              Войти
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
