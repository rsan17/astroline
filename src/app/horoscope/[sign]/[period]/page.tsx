import { notFound } from 'next/navigation';
import Link from 'next/link';
import type { Metadata } from 'next';
import { ArrowRight, Heart, Briefcase, Sparkles, TrendingUp, Calendar } from 'lucide-react';
import { Breadcrumbs, RelatedLinks, JsonLd } from '@/components/seo';
import {
  ZODIAC_SIGNS,
  HOROSCOPE_PERIODS,
  getZodiacBySlug,
  getPeriodBySlug,
} from '@/lib/constants/zodiac';
import {
  generateHoroscopeMetadata,
  createHoroscopeJsonLd,
  BASE_URL,
} from '@/lib/seo';

interface PageProps {
  params: Promise<{ sign: string; period: string }>;
}

export async function generateStaticParams() {
  const params: { sign: string; period: string }[] = [];

  for (const sign of ZODIAC_SIGNS) {
    for (const period of HOROSCOPE_PERIODS) {
      params.push({
        sign: sign.slug,
        period: period.slug,
      });
    }
  }

  return params;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { sign, period } = await params;
  return generateHoroscopeMetadata(sign, period);
}

// Generate pseudo-random but consistent horoscope content based on sign and date
function generateHoroscopeContent(signSlug: string, periodSlug: string) {
  const sign = getZodiacBySlug(signSlug);
  if (!sign) return null;

  // Seed based on sign and current date for consistency within the same day
  const today = new Date();
  const seed = signSlug.length + today.getDate() + today.getMonth();

  const loveMessages = [
    'Зірки обіцяють романтичні сюрпризи. Будьте відкриті до нових зустрічей та емоцій.',
    'Час зміцнити існуючі стосунки. Приділіть увагу партнеру та близьким людям.',
    'Венера сприяє гармонії у стосунках. Чудовий період для освідчень та важливих розмов.',
    'Можливі непорозуміння з партнером. Проявіть терпіння та розуміння.',
  ];

  const careerMessages = [
    'Професійна сфера набирає обертів. Час для нових проєктів та ініціатив.',
    'Колеги та керівництво оцінять вашу працю. Можливе підвищення або премія.',
    'Зосередьтеся на деталях. Уникайте поспішних рішень у фінансових питаннях.',
    'Творча енергія на піку. Використайте це для реалізації амбітних планів.',
  ];

  const healthMessages = [
    'Зверніть увагу на відпочинок. Ваше тіло потребує відновлення енергії.',
    'Чудовий час для початку нових здорових звичок та фізичної активності.',
    'Уникайте стресових ситуацій. Медитація та йога принесуть користь.',
    'Енергетичний потенціал високий. Використайте його для досягнення цілей.',
  ];

  const luckyNumbers = [
    (seed * 3) % 49 + 1,
    (seed * 7) % 49 + 1,
    (seed * 11) % 49 + 1,
  ].sort((a, b) => a - b);

  const luckyColors = ['Бірюзовий', 'Золотий', 'Срібний', 'Фіолетовий', 'Смарагдовий'];
  const luckyColor = luckyColors[seed % luckyColors.length];

  return {
    love: loveMessages[seed % loveMessages.length],
    career: careerMessages[(seed + 1) % careerMessages.length],
    health: healthMessages[(seed + 2) % healthMessages.length],
    luckyNumbers,
    luckyColor,
    overallRating: 3 + (seed % 3), // 3-5 stars
  };
}

export default async function HoroscopePage({ params }: PageProps) {
  const { sign: signSlug, period: periodSlug } = await params;
  const sign = getZodiacBySlug(signSlug);
  const period = getPeriodBySlug(periodSlug);

  if (!sign || !period) {
    notFound();
  }

  const content = generateHoroscopeContent(signSlug, periodSlug);
  if (!content) {
    notFound();
  }

  const breadcrumbItems = [
    { name: 'Знаки зодіаку', url: `${BASE_URL}/zodiac` },
    { name: sign.nameUk, url: `${BASE_URL}/zodiac/${sign.slug}` },
    { name: `Гороскоп ${period.nameUk}`, url: `${BASE_URL}/horoscope/${sign.slug}/${period.slug}` },
  ];

  // Get today's date formatted
  const today = new Date();
  const dateOptions: Intl.DateTimeFormatOptions = { 
    weekday: 'long', 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  };
  const formattedDate = today.toLocaleDateString('uk-UA', dateOptions);

  return (
    <div className="min-h-screen">
      {/* JSON-LD */}
      <JsonLd data={createHoroscopeJsonLd(sign, periodSlug, period.nameUk)} />

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
          <header className="text-center mb-12">
            <div className="text-7xl mb-4">{sign.symbol}</div>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
              Гороскоп для <span className="gradient-text">{sign.nameUkGenitive}</span> {period.nameUk}
            </h1>
            <div className="flex items-center justify-center gap-2 text-text-secondary">
              <Calendar className="w-4 h-4" />
              <span>{formattedDate}</span>
            </div>
          </header>

          {/* Overall Rating */}
          <div className="glass rounded-3xl p-6 mb-8 text-center">
            <p className="text-text-secondary mb-2">Загальний прогноз</p>
            <div className="flex items-center justify-center gap-1 text-3xl">
              {[...Array(5)].map((_, i) => (
                <span
                  key={i}
                  className={i < content.overallRating ? 'text-gold' : 'text-white/20'}
                >
                  ★
                </span>
              ))}
            </div>
          </div>

          {/* Period Tabs */}
          <div className="flex flex-wrap justify-center gap-2 mb-12">
            {HOROSCOPE_PERIODS.map((p) => (
              <Link
                key={p.slug}
                href={`/horoscope/${sign.slug}/${p.slug}`}
                className={`px-4 py-2 rounded-full text-sm transition-all ${
                  p.slug === periodSlug
                    ? 'bg-accent text-background font-medium'
                    : 'glass hover:bg-white/10'
                }`}
              >
                {p.nameUk.charAt(0).toUpperCase() + p.nameUk.slice(1)}
              </Link>
            ))}
          </div>

          {/* Love Section */}
          <section className="glass rounded-3xl p-8 mb-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-full bg-pink-500/20 flex items-center justify-center">
                <Heart className="w-6 h-6 text-pink-400" />
              </div>
              <h2 className="text-2xl font-bold">Кохання та стосунки</h2>
            </div>
            <p className="text-lg text-text-secondary leading-relaxed">
              {content.love}
            </p>
          </section>

          {/* Career Section */}
          <section className="glass rounded-3xl p-8 mb-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-full bg-blue-500/20 flex items-center justify-center">
                <Briefcase className="w-6 h-6 text-blue-400" />
              </div>
              <h2 className="text-2xl font-bold">Кар'єра та фінанси</h2>
            </div>
            <p className="text-lg text-text-secondary leading-relaxed">
              {content.career}
            </p>
          </section>

          {/* Health Section */}
          <section className="glass rounded-3xl p-8 mb-8">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-full bg-green-500/20 flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-green-400" />
              </div>
              <h2 className="text-2xl font-bold">Здоров'я та енергія</h2>
            </div>
            <p className="text-lg text-text-secondary leading-relaxed">
              {content.health}
            </p>
          </section>

          {/* Lucky Section */}
          <section className="grid md:grid-cols-2 gap-4 mb-12">
            <div className="glass rounded-2xl p-6 text-center">
              <Sparkles className="w-8 h-8 text-accent mx-auto mb-3" />
              <h3 className="font-bold mb-2">Щасливі числа</h3>
              <p className="text-2xl text-accent">
                {content.luckyNumbers.join(', ')}
              </p>
            </div>
            <div className="glass rounded-2xl p-6 text-center">
              <div className="w-8 h-8 rounded-full bg-accent mx-auto mb-3" />
              <h3 className="font-bold mb-2">Щасливий колір</h3>
              <p className="text-2xl text-accent">{content.luckyColor}</p>
            </div>
          </section>

          {/* Other Signs Quick Links */}
          <section className="mb-12">
            <h2 className="text-xl font-bold mb-4">Гороскоп {period.nameUk} для інших знаків</h2>
            <div className="grid grid-cols-4 md:grid-cols-6 gap-2">
              {ZODIAC_SIGNS.filter((s) => s.slug !== sign.slug).map((s) => (
                <Link
                  key={s.slug}
                  href={`/horoscope/${s.slug}/${periodSlug}`}
                  className="glass rounded-lg p-3 text-center hover:border-accent/30 hover:bg-white/[0.07] transition-all group"
                >
                  <span className="text-2xl group-hover:scale-110 inline-block transition-transform">
                    {s.symbol}
                  </span>
                  <span className="text-xs text-text-muted block mt-1">
                    {s.nameUk}
                  </span>
                </Link>
              ))}
            </div>
          </section>

          {/* CTA */}
          <section className="glass rounded-3xl p-8 text-center">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              Хочете <span className="gradient-text">детальніший прогноз</span>?
            </h2>
            <p className="text-text-secondary mb-6 max-w-lg mx-auto">
              Отримайте персоналізований астрологічний звіт з детальним аналізом 
              натальної карти та прогнозом на весь 2026 рік
            </p>
            <Link
              href="/quiz?new=true"
              className="btn-primary inline-flex items-center gap-2"
            >
              Отримати повний звіт
              <ArrowRight className="w-5 h-5" />
            </Link>
          </section>
        </div>

        {/* Related Links */}
        <RelatedLinks currentSignSlug={sign.slug} type="zodiac" limit={11} />
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
