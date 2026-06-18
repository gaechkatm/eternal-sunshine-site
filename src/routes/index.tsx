import { createFileRoute } from "@tanstack/react-router";
import { useRef, useState } from "react";
import { ChevronLeft, ChevronRight, Play, Plus, Tv, Download, Globe2, Baby, ArrowUp } from "lucide-react";
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
  "Очень странные дела",
  "Ведьмак",
  "Корона",
  "Игра в кальмара",
  "Тьма",
  "Люпен",
  "Деньги",
  "Бумажный дом",
  "Бриджертоны",
  "Озарк",
];

const FAQ = [
  { q: "Что такое Netflix?", a: "Netflix — это стриминговый сервис, который предлагает фильмы, сериалы и документальные фильмы на тысячах подключенных к интернету устройств." },
  { q: "Сколько стоит Netflix?", a: "Смотрите Netflix на смартфоне, планшете, Smart TV, ноутбуке или устройстве для потокового вещания, и всё за одну фиксированную ежемесячную плату." },
  { q: "Где можно смотреть?", a: "Смотрите где угодно и когда угодно. Войдите в свой аккаунт Netflix, чтобы смотреть мгновенно через интернет на netflix.com с любого компьютера." },
  { q: "Как отменить подписку?", a: "Netflix гибок. Здесь нет надоедливых контрактов и обязательств. Вы можете отменить свой аккаунт онлайн в два клика." },
  { q: "Что я могу смотреть?", a: "Netflix предлагает обширную библиотеку из полнометражных фильмов, документалок, сериалов, аниме, отмеченных наградами оригинальных проектов Netflix и других." },
  { q: "Подходит ли Netflix для детей?", a: "Опыт Netflix для детей включён в вашу подписку, чтобы родители могли быть спокойны, а дети наслаждались семейными сериалами и фильмами в своём собственном пространстве." },
];

const FOOTER_LINKS = [
  "Вопросы и ответы","Справочный центр","Аккаунт","Пресса","О компании",
  "Условия использования","Конфиденциальность","Контакты","Способы просмотра",
  "Корпоративная информация","Карьера","Только на Netflix","Подарочные карты",
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
    <div className="min-h-screen bg-nflx-bg text-nflx-text">
      <Toaster theme="dark" position="top-center" />

      {/* HERO */}
      <section className="relative overflow-hidden bg-nflx-bg">
        <header className="relative z-10 flex items-center justify-between px-6 py-5 md:px-12">
          <a href="/" className="text-2xl md:text-4xl font-black tracking-tight text-nflx-red">
            NETFLIX
          </a>
          <Button
            onClick={() => setSignInOpen(true)}
            className="bg-nflx-red hover:bg-nflx-red-hover text-nflx-on-red border-0"
          >
            Войти
          </Button>
        </header>

        <div className="relative mx-auto flex max-w-3xl flex-col items-center px-6 py-24 md:py-36 text-center">
          <h1 className="text-4xl md:text-6xl font-extrabold leading-tight">
            Безлимитные фильмы, сериалы и многое другое
          </h1>
          <p className="mt-5 text-lg md:text-2xl">
            Смотрите где угодно. Отменяйте в любое время.
          </p>
          <p className="mt-6 text-sm md:text-base text-nflx-text-muted">
            Готовы смотреть? Введите свой email, чтобы создать или возобновить подписку.
          </p>
          <form
            onSubmit={(e) => { e.preventDefault(); handleStart(); }}
            className="mt-5 flex w-full max-w-xl flex-col gap-2 sm:flex-row"
          >
            <Input
              type="email"
              placeholder="Email-адрес"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="h-12 flex-1 bg-nflx-surface border-nflx-border text-nflx-text placeholder:text-nflx-text-muted"
            />
            <Button type="submit" className="h-12 bg-nflx-red hover:bg-nflx-red-hover text-nflx-on-red text-lg px-6">
              Начать <ChevronRight className="ml-1" size={20} />
            </Button>
          </form>
        </div>
      </section>

      <div className="h-2 bg-nflx-surface-2" />

      {/* TRENDING */}
      <section className="px-6 md:px-12 py-14 bg-nflx-bg">
        <h2 className="text-2xl md:text-3xl font-bold mb-6">В тренде сейчас</h2>
        <div className="relative group">
          <button
            onClick={() => scrollCarousel("left")}
            aria-label="Назад"
            className="absolute left-0 top-1/2 z-10 -translate-y-1/2 hidden md:flex h-full w-12 items-center justify-center bg-nflx-bg/70 opacity-0 group-hover:opacity-100 transition-opacity"
          >
            <ChevronLeft size={32} />
          </button>
          <div
            ref={carouselRef}
            className="flex gap-3 overflow-x-auto scroll-smooth pb-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          >
            {MOVIES.map((title, i) => (
              <div
                key={title}
                className="relative shrink-0 w-44 md:w-56 aspect-[2/3] rounded-md overflow-hidden bg-nflx-surface ring-1 ring-nflx-border hover:ring-2 hover:ring-nflx-red transition"
              >
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="font-black text-nflx-text/10 leading-none" style={{ fontSize: "10rem" }}>
                    {i + 1}
                  </span>
                </div>
                <div className="absolute inset-x-0 bottom-0 p-3 bg-nflx-bg/85">
                  <p className="text-sm md:text-base font-semibold">{title}</p>
                  <div className="mt-2 flex gap-2">
                    <button
                      onClick={() => toast.success(`Воспроизведение: ${title}`)}
                      className="flex items-center gap-1 rounded bg-nflx-text text-nflx-bg text-xs px-2 py-1 font-semibold hover:bg-nflx-text-muted"
                    >
                      <Play size={14} fill="currentColor" /> Смотреть
                    </button>
                    <button
                      onClick={() => toast(`Добавлено в Мой список: ${title}`)}
                      aria-label="В Мой список"
                      className="flex items-center gap-1 rounded bg-nflx-surface-2 text-nflx-text text-xs px-2 py-1 font-semibold hover:bg-nflx-border"
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
            className="absolute right-0 top-1/2 z-10 -translate-y-1/2 hidden md:flex h-full w-12 items-center justify-center bg-nflx-bg/70 opacity-0 group-hover:opacity-100 transition-opacity"
          >
            <ChevronRight size={32} />
          </button>
        </div>
      </section>

      <div className="h-2 bg-nflx-surface-2" />

      {/* REASONS */}
      <section className="px-6 md:px-12 py-14 bg-nflx-bg">
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
              className="rounded-lg p-6 bg-nflx-surface border border-nflx-border"
            >
              <Icon className="text-nflx-red mb-4" size={36} />
              <h3 className="text-lg font-bold">{title}</h3>
              <p className="mt-2 text-sm text-nflx-text-muted">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      <div className="h-2 bg-nflx-surface-2" />

      {/* FAQ */}
      <section className="px-6 md:px-12 py-14 bg-nflx-bg">
        <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center">Часто задаваемые вопросы</h2>
        <div className="mx-auto max-w-3xl">
          <Accordion type="single" collapsible className="space-y-2">
            {FAQ.map((item, i) => (
              <AccordionItem
                key={item.q}
                value={`item-${i}`}
                className="border-0 bg-nflx-surface hover:bg-nflx-surface-2 transition-colors"
              >
                <AccordionTrigger className="px-5 py-5 text-lg md:text-xl font-medium hover:no-underline">
                  {item.q}
                </AccordionTrigger>
                <AccordionContent className="px-5 pb-5 text-base md:text-lg">
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
              onSubmit={(e) => { e.preventDefault(); handleStart(); }}
              className="flex flex-col gap-2 sm:flex-row justify-center"
            >
              <Input
                type="email"
                placeholder="Email-адрес"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="h-12 sm:max-w-sm bg-nflx-surface border-nflx-border text-nflx-text placeholder:text-nflx-text-muted"
              />
              <Button type="submit" className="h-12 bg-nflx-red hover:bg-nflx-red-hover text-nflx-on-red text-lg px-6">
                Начать <ChevronRight className="ml-1" size={20} />
              </Button>
            </form>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="px-6 md:px-12 py-12 border-t border-nflx-border text-nflx-text-muted bg-nflx-bg">
        <div className="mx-auto max-w-5xl">
          <p className="mb-6">
            Вопросы? Позвоните{" "}
            <a href="tel:8-800-555-3456" className="underline hover:text-nflx-text">
              8-800-555-3456
            </a>
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm">
            {FOOTER_LINKS.map((l) => (
              <button
                key={l}
                type="button"
                onClick={() => toast(`Раздел: ${l}`)}
                className="text-left hover:underline"
              >
                {l}
              </button>
            ))}
          </div>
          <div className="mt-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="inline-flex w-fit items-center gap-2 border border-nflx-border px-4 py-2 text-sm hover:bg-nflx-surface"
            >
              <ArrowUp size={16} /> Наверх
            </button>
            <p className="text-xs">© 1997-2026 Демонстрация в стиле Netflix</p>
          </div>
          <p className="mt-8 text-center text-sm text-nflx-red font-semibold tracking-wide">
            проверка для EternalSunshine 18.06.2026
          </p>
        </div>
      </footer>

      {/* DIALOGS */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="bg-nflx-surface text-nflx-text border-nflx-border">
          <DialogHeader>
            <DialogTitle>Почти готово</DialogTitle>
            <DialogDescription className="text-nflx-text-muted">
              Мы отправили подтверждение на{" "}
              <span className="text-nflx-text font-medium">{email || "ваш email"}</span>.
              Это демо-страница — реальной регистрации не происходит.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button onClick={() => setDialogOpen(false)} className="bg-nflx-red hover:bg-nflx-red-hover text-nflx-on-red">
              Понятно
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={signInOpen} onOpenChange={setSignInOpen}>
        <DialogContent className="bg-nflx-surface text-nflx-text border-nflx-border">
          <DialogHeader>
            <DialogTitle className="text-2xl">Вход</DialogTitle>
          </DialogHeader>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              setSignInOpen(false);
              toast.success("Добро пожаловать (демо)");
            }}
            className="space-y-3"
          >
            <Input type="email" placeholder="Email или номер телефона" className="h-12 bg-nflx-surface-2 border-nflx-border text-nflx-text" />
            <Input type="password" placeholder="Пароль" className="h-12 bg-nflx-surface-2 border-nflx-border text-nflx-text" />
            <Button type="submit" className="w-full h-12 bg-nflx-red hover:bg-nflx-red-hover text-nflx-on-red text-base">
              Войти
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
