import { notFound } from 'next/navigation';
import Link from 'next/link';
import type { Metadata } from 'next';
import { ArrowRight, Flame, Mountain, Wind, Droplets, Heart, Briefcase, Star } from 'lucide-react';
import { Breadcrumbs, RelatedLinks, JsonLd } from '@/components/seo';
import {
  ZODIAC_SIGNS,
  ELEMENTS,
  MODALITIES,
  getZodiacBySlug,
} from '@/lib/constants/zodiac';
import {
  generateZodiacMetadata,
  createZodiacSignJsonLd,
  createFAQJsonLd,
  BASE_URL,
} from '@/lib/seo';

interface PageProps {
  params: Promise<{ sign: string }>;
}

export async function generateStaticParams() {
  return ZODIAC_SIGNS.map((sign) => ({
    sign: sign.slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { sign } = await params;
  return generateZodiacMetadata(sign);
}

const elementIcons = {
  fire: Flame,
  earth: Mountain,
  air: Wind,
  water: Droplets,
};

export default async function ZodiacSignPage({ params }: PageProps) {
  const { sign: signSlug } = await params;
  const sign = getZodiacBySlug(signSlug);

  if (!sign) {
    notFound();
  }

  const element = ELEMENTS[sign.element];
  const modality = MODALITIES[sign.modality];
  const ElementIcon = elementIcons[sign.element];

  // Get compatible signs data
  const compatibleSignsData = sign.compatibleSigns
    .map((slug) => getZodiacBySlug(slug))
    .filter(Boolean);

  // FAQ data for this sign
  const faqs = [
    {
      question: `Які риси характерні для ${sign.nameUkGenitive}?`,
      answer: `${sign.nameUk} відзначається такими рисами: ${sign.traits.join(', ')}. Сильні сторони включають ${sign.strengths.slice(0, 3).join(', ')}.`,
    },
    {
      question: `З якими знаками ${sign.nameUk} найбільш сумісний?`,
      answer: `${sign.nameUk} найкраще сумісний з ${compatibleSignsData.map((s) => s?.nameUk).join(', ')}. Ці знаки доповнюють енергію ${sign.nameUkGenitive}.`,
    },
    {
      question: `Яка планета керує знаком ${sign.nameUk}?`,
      answer: `${sign.nameUk} знаходиться під керуванням ${sign.rulingPlanetUk}. Ця планета впливає на характер та долю людей, народжених під цим знаком.`,
    },
  ];

  const breadcrumbItems = [
    { name: 'Знаки зодіаку', url: `${BASE_URL}/zodiac` },
    { name: sign.nameUk, url: `${BASE_URL}/zodiac/${sign.slug}` },
  ];

  return (
    <div className="min-h-screen">
      {/* JSON-LD */}
      <JsonLd
        data={[
          createZodiacSignJsonLd(sign),
          createFAQJsonLd(faqs),
        ]}
      />

      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="text-xl font-bold gradient-text">
            ✨ Astroline
          </Link>
          <Link href="/quiz?new=true" className="btn-secondary text-sm py-2 px-4">
            Пройти тест
          </Link>
        </div>
      </nav>

      <main className="pt-24 pb-12">
        <div className="max-w-4xl mx-auto px-4">
          {/* Breadcrumbs */}
          <Breadcrumbs items={breadcrumbItems} className="mb-8" />

          {/* Hero Section */}
          <header className="text-center mb-16">
            <div className="text-8xl mb-6 animate-float">{sign.symbol}</div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
              {sign.nameUk} <span className="gradient-text">{sign.symbol}</span>
            </h1>
            <p className="text-xl text-text-secondary mb-4">{sign.dates}</p>
            <div className="flex items-center justify-center gap-4 text-sm text-text-muted">
              <span className="flex items-center gap-1">
                <ElementIcon className="w-4 h-4" />
                {element.nameUk}
              </span>
              <span>•</span>
              <span>{modality.nameUk}</span>
              <span>•</span>
              <span>{sign.rulingPlanetUk}</span>
            </div>
          </header>

          {/* Description */}
          <section className="glass rounded-3xl p-8 mb-12">
            <h2 className="text-2xl md:text-3xl font-bold mb-6">
              Характеристика {sign.nameUkGenitive}
            </h2>
            <p className="text-lg text-text-secondary leading-relaxed">
              {sign.description}
            </p>
          </section>

          {/* Traits */}
          <section className="mb-12">
            <h2 className="text-2xl md:text-3xl font-bold mb-6 flex items-center gap-3">
              <Star className="w-8 h-8 text-accent" />
              Риси характеру
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {sign.traits.map((trait, index) => (
                <div
                  key={trait}
                  className="glass rounded-xl p-4 text-center"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <span className="text-text-primary font-medium">{trait}</span>
                </div>
              ))}
            </div>
          </section>

          {/* Strengths & Weaknesses */}
          <section className="grid md:grid-cols-2 gap-6 mb-12">
            <div className="glass rounded-3xl p-6">
              <h3 className="text-xl font-bold mb-4 text-green-400">💪 Сильні сторони</h3>
              <ul className="space-y-2">
                {sign.strengths.map((strength) => (
                  <li key={strength} className="flex items-center gap-2 text-text-secondary">
                    <span className="w-2 h-2 rounded-full bg-green-400" />
                    {strength}
                  </li>
                ))}
              </ul>
            </div>
            <div className="glass rounded-3xl p-6">
              <h3 className="text-xl font-bold mb-4 text-amber-400">⚠️ Слабкі сторони</h3>
              <ul className="space-y-2">
                {sign.weaknesses.map((weakness) => (
                  <li key={weakness} className="flex items-center gap-2 text-text-secondary">
                    <span className="w-2 h-2 rounded-full bg-amber-400" />
                    {weakness}
                  </li>
                ))}
              </ul>
            </div>
          </section>

          {/* Element & Modality */}
          <section className="grid md:grid-cols-2 gap-6 mb-12">
            <div className="glass rounded-3xl p-6">
              <div className="flex items-center gap-3 mb-4">
                <ElementIcon className="w-8 h-8 text-accent" />
                <h3 className="text-xl font-bold">Стихія: {element.nameUk}</h3>
              </div>
              <p className="text-text-secondary">{element.description}</p>
            </div>
            <div className="glass rounded-3xl p-6">
              <h3 className="text-xl font-bold mb-4">
                Модальність: {modality.nameUk}
              </h3>
              <p className="text-text-secondary">{modality.description}</p>
            </div>
          </section>

          {/* Compatibility Preview */}
          <section className="mb-12">
            <h2 className="text-2xl md:text-3xl font-bold mb-6 flex items-center gap-3">
              <Heart className="w-8 h-8 text-accent" />
              Сумісність
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {compatibleSignsData.slice(0, 4).map((compatSign) => (
                <Link
                  key={compatSign?.slug}
                  href={`/compatibility/${sign.slug}/${compatSign?.slug}`}
                  className="glass rounded-xl p-4 text-center hover:border-accent/30 hover:bg-white/[0.07] transition-all group"
                >
                  <div className="text-3xl mb-2">{compatSign?.symbol}</div>
                  <div className="text-sm text-text-secondary group-hover:text-accent transition-colors">
                    {compatSign?.nameUk}
                  </div>
                  <div className="text-xs text-accent mt-1">Висока сумісність</div>
                </Link>
              ))}
            </div>
          </section>

          {/* FAQ Section */}
          <section className="mb-12">
            <h2 className="text-2xl md:text-3xl font-bold mb-6">
              Часті запитання про {sign.nameUkGenitive}
            </h2>
            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <div key={index} className="glass rounded-2xl p-6">
                  <h3 className="font-semibold text-text-primary mb-2">
                    {faq.question}
                  </h3>
                  <p className="text-text-secondary">{faq.answer}</p>
                </div>
              ))}
            </div>
          </section>

          {/* CTA */}
          <section className="glass rounded-3xl p-8 text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              Отримайте <span className="gradient-text">персональний звіт</span>
            </h2>
            <p className="text-text-secondary mb-6 max-w-lg mx-auto">
              Дізнайтеся більше про себе з детальним астрологічним звітом, 
              натальною картою та прогнозом на 2026 рік
            </p>
            <Link
              href="/quiz?new=true"
              className="btn-primary inline-flex items-center gap-2"
            >
              Почати безкоштовний тест
              <ArrowRight className="w-5 h-5" />
            </Link>
          </section>
        </div>

        {/* Related Links */}
        <RelatedLinks currentSignSlug={sign.slug} type="all" />
      </main>

      {/* Footer */}
      <footer className="border-t border-white/10 py-12 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <Link href="/" className="text-xl font-bold gradient-text mb-4 inline-block">
            ✨ Astroline
          </Link>
          <p className="text-text-muted text-sm">
            © 2026 Astroline. Усі права захищені.
          </p>
        </div>
      </footer>
    </div>
  );
}
