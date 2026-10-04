import Image from "next/image";
import { OWNER } from "@/lib/owner";
import WaButton from "./WaButton";
import CallButton from "./CallButton";
import OwnerCard from "./OwnerCard";

const TRUST = [
  { title: "Visita técnica gratis", text: "Revisamos el problema y te explicamos qué hay que hacer." },
  { title: "Precio por escrito", text: "Sabes cuánto cuesta antes de que empiece." },
  { title: "Garantía firmada", text: "Cada trabajo queda respaldado por escrito." },
];

export default function HomeHero() {
  return (
    <section className="bg-white">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 pb-16 pt-10 sm:px-6 lg:grid-cols-[minmax(0,1.35fr)_minmax(0,1fr)] lg:items-center md:pb-24 md:pt-16">
        <div>
          <h1 className="text-[2rem] font-bold leading-[1.08] tracking-tight text-slate-900 sm:text-5xl md:text-[3.4rem]">
            Reparación de techos, pintura y plomería a domicilio en Medellín y el Valle de Aburrá
          </h1>
          <p className="mt-5 max-w-xl text-lg leading-relaxed text-slate-700">
            Somos el equipo de {OWNER.name}. Vamos a tu casa, revisamos el problema sin costo y te damos el
            precio por escrito antes de empezar.
          </p>
          <div className="mt-7 flex flex-col gap-3 sm:flex-row">
            <WaButton source="hero" pageType="home" label="Escríbenos por WhatsApp" size="lg" />
            <CallButton source="hero" pageType="home" size="lg" />
          </div>
          <dl className="mt-9 grid gap-4 sm:grid-cols-3">
            {TRUST.map((item) => (
              <div key={item.title} className="border-t border-slate-200 pt-3">
                <dt className="font-semibold text-slate-900">{item.title}</dt>
                <dd className="mt-1 text-sm text-slate-600">{item.text}</dd>
              </div>
            ))}
          </dl>
        </div>
        <div className="relative">
          <div className="relative aspect-[4/3] overflow-hidden rounded-3xl bg-paper lg:aspect-[4/5]">
            <Image
              src="/illustrations/hero-techo.webp"
              alt="Ilustración de un techo de teja de barro con canal y escalera, como los que reparamos en el Valle de Aburrá"
              fill
              priority
              sizes="(min-width: 1024px) 40vw, 100vw"
              className="object-cover object-top"
            />
          </div>
          <div className="relative -mt-16 px-4 lg:absolute lg:inset-x-0 lg:bottom-0 lg:mt-0 lg:translate-y-10 lg:px-6">
            <OwnerCard variant="hero" />
          </div>
        </div>
      </div>
    </section>
  );
}
