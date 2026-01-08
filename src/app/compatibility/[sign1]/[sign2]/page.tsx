import { notFound } from 'next/navigation';
import Link from 'next/link';
import type { Metadata } from 'next';
import { ArrowRight, Heart, Users, Briefcase, MessageCircle, Flame } from 'lucide-react';
import { Breadcrumbs, JsonLd } from '@/components/seo';
import {
  ZODIAC_SIGNS,
  ELEMENTS,
  getZodiacBySlug,
  getCompatibilityPercentage,
} from '@/lib/constants/zodiac';
import {
  generateCompatibilityMetadata,
  createArticleJsonLd,
  BASE_URL,
} from '@/lib/seo';

interface PageProps {
  params: Promise<{ sign1: string; sign2: string }>;
}

export async function generateStaticParams() {
  const params: { sign1: string; sign2: string }[] = [];

  // Generate all unique combinations (including same sign)
  for (let i = 0; i < ZODIAC_SIGNS.length; i++) {
    for (let j = i; j < ZODIAC_SIGNS.length; j++) {
      params.push({
        sign1: ZODIAC_SIGNS[i].slug,
        sign2: ZODIAC_SIGNS[j].slug,
      });
      // Also add reverse order for SEO
      if (i !== j) {
        params.push({
          sign1: ZODIAC_SIGNS[j].slug,
          sign2: ZODIAC_SIGNS[i].slug,
        });
      }
    }
  }

  return params;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { sign1, sign2 } = await params;
  return generateCompatibilityMetadata(sign1, sign2);
}

function generateCompatibilityDetails(sign1Slug: string, sign2Slug: string) {
  const sign1 = getZodiacBySlug(sign1Slug);
  const sign2 = getZodiacBySlug(sign2Slug);

  if (!sign1 || !sign2) return null;

  const basePercentage = getCompatibilityPercentage(sign1Slug, sign2Slug);
  const element1 = ELEMENTS[sign1.element];
  const element2 = ELEMENTS[sign2.element];

  // Calculate individual aspect scores based on element compatibility
  const elementCompatibility = sign1.element === sign2.element ? 85 : 
    (sign1.element === 'fire' && sign2.element === 'air') || 
    (sign1.element === 'air' && sign2.element === 'fire') ||
    (sign1.element === 'earth' && sign2.element === 'water') ||
    (sign1.element === 'water' && sign2.element === 'earth') ? 80 : 55;

  const loveScore = Math.min(100, basePercentage + Math.floor(Math.random() * 10) - 5);
  const friendshipScore = Math.min(100, basePercentage + Math.floor(Math.random() * 15) - 7);
  const workScore = Math.min(100, basePercentage + Math.floor(Math.random() * 10) - 5);
  const communicationScore = Math.min(100, elementCompatibility + Math.floor(Math.random() * 10));

  const isHighlyCompatible = sign1.compatibleSigns.includes(sign2Slug) || sign2.compatibleSigns.includes(sign1Slug);
  const isLowCompatibility = sign1.incompatibleSigns.includes(sign2Slug) || sign2.incompatibleSigns.includes(sign1Slug);
  const isSameSign = sign1Slug === sign2Slug;

  let overviewText = '';
  if (isSameSign) {
    overviewText = `Два ${sign1.nameUkGenitive} разом — це союз глибокого розуміння та спільних цінностей. Ви інтуїтивно відчуваєте один одного, але будьте обережні з конкуренцією та схожими слабкостями.`;
  } else if (isHighlyCompatible) {
    overviewText = `${sign1.nameUk} та ${sign2.nameUk} утворюють гармонійну пару. Ваші енергії доповнюють одна одну, створюючи баланс та взаєморозуміння. Цей союз має великий потенціал для довготривалих стосунків.`;
  } else if (isLowCompatibility) {
    overviewText = `Стосунки між ${sign1.nameUk} та ${sign2.nameUk} вимагають роботи та компромісів. Ваші енергії часто конфліктують, але саме це може стати джерелом зростання та розвитку обох партнерів.`;
  } else {
    overviewText = `${sign1.nameUk} та ${sign2.nameUk} мають середній рівень сумісності. Ваші стосунки залежатимуть від індивідуальних особливостей та готовності працювати над розумінням один одного.`;
  }

  const strengthsTexts = {
    high: [
      'Глибоке емоційне розуміння',
      'Спільні цінності та цілі',
      'Взаємна підтримка та повага',
      'Природна хімія та притягнення',
    ],
    medium: [
      'Можливість навчатися один в одного',
      'Баланс різних підходів',
      'Стимул для особистого зростання',
    ],
    low: [
      'Можливість розширити світогляд',
      'Виклик для самовдосконалення',
      'Унікальна динаміка стосунків',
    ],
  };

  const challengesTexts = {
    high: [
      'Занадто схожі підходи можуть бути нудними',
      'Конкуренція за лідерство',
    ],
    medium: [
      'Різні темпераменти',
      'Необхідність компромісів',
      'Різні способи вираження емоцій',
    ],
    low: [
      'Фундаментальні відмінності у цінностях',
      'Різні потреби в стосунках',
      'Складності у комунікації',
      'Конфлікт енергій',
    ],
  };

  const level = isHighlyCompatible ? 'high' : isLowCompatibility ? 'low' : 'medium';

  return {
    overallPercentage: basePercentage,
    loveScore,
    friendshipScore,
    workScore,
    communicationScore,
    overview: overviewText,
    strengths: strengthsTexts[level],
    challenges: challengesTexts[level],
    element1: element1.nameUk,
    element2: element2.nameUk,
    isSameElement: sign1.element === sign2.element,
  };
}

function ProgressBar({ value, color = 'accent' }: { value: number; color?: string }) {
  const colorClasses = {
    accent: 'from-accent to-teal-400',
    pink: 'from-pink-500 to-rose-400',
    blue: 'from-blue-500 to-cyan-400',
    green: 'from-green-500 to-emerald-400',
    purple: 'from-purple-500 to-violet-400',
  };

  return (
    <div className="w-full h-3 bg-white/10 rounded-full overflow-hidden">
      <div
        className={`h-full bg-gradient-to-r ${colorClasses[color as keyof typeof colorClasses] || colorClasses.accent} transition-all duration-1000`}
        style={{ width: `${value}%` }}
      />
    </div>
  );
}

export default async function CompatibilityPage({ params }: PageProps) {
  const { sign1: sign1Slug, sign2: sign2Slug } = await params;
  const sign1 = getZodiacBySlug(sign1Slug);
  const sign2 = getZodiacBySlug(sign2Slug);

  if (!sign1 || !sign2) {
    notFound();
  }

  const details = generateCompatibilityDetails(sign1Slug, sign2Slug);
  if (!details) {
    notFound();
  }

  const breadcrumbItems = [
    { name: 'Сумісність', url: `${BASE_URL}/compatibility` },
    { name: `${sign1.nameUk} і ${sign2.nameUk}`, url: `${BASE_URL}/compatibility/${sign1.slug}/${sign2.slug}` },
  ];

  const jsonLd = createArticleJsonLd({
    title: `Сумісність ${sign1.nameUkGenitive} та ${sign2.nameUkGenitive}`,
    description: details.overview,
    url: `${BASE_URL}/compatibility/${sign1.slug}/${sign2.slug}`,
  });

  return (
    <div className="min-h-screen">
      {/* JSON-LD */}
      <JsonLd data={jsonLd} />

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
            <div className="flex items-center justify-center gap-4 mb-6">
              <div className="text-6xl md:text-7xl">{sign1.symbol}</div>
              <Heart className="w-8 h-8 text-accent animate-pulse" />
              <div className="text-6xl md:text-7xl">{sign2.symbol}</div>
            </div>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
              Сумісність <span className="gradient-text">{sign1.nameUkGenitive}</span> та{' '}
              <span className="gradient-text">{sign2.nameUkGenitive}</span>
            </h1>
            <div className="flex items-center justify-center gap-4 text-text-secondary">
              <span>{sign1.dates}</span>
              <span>•</span>
              <span>{sign2.dates}</span>
            </div>
          </header>

          {/* Overall Score */}
          <div className="glass rounded-3xl p-8 mb-8 text-center">
            <p className="text-text-secondary mb-4">Загальна сумісність</p>
            <div className="text-7xl font-bold gradient-text mb-4">
              {details.overallPercentage}%
            </div>
            <ProgressBar value={details.overallPercentage} />
          </div>

          {/* Overview */}
          <section className="glass rounded-3xl p-8 mb-8">
            <h2 className="text-2xl font-bold mb-4">Огляд сумісності</h2>
            <p className="text-lg text-text-secondary leading-relaxed">
              {details.overview}
            </p>
            {details.isSameElement && (
              <div className="mt-4 p-4 rounded-xl bg-accent/10 border border-accent/20">
                <p className="text-sm text-accent">
                  <Flame className="w-4 h-4 inline mr-2" />
                  Обидва знаки належать до стихії {details.element1}, що створює 
                  глибоке взаєморозуміння на енергетичному рівні.
                </p>
              </div>
            )}
          </section>

          {/* Aspect Scores */}
          <section className="grid md:grid-cols-2 gap-6 mb-8">
            <div className="glass rounded-2xl p-6">
              <div className="flex items-center gap-3 mb-4">
                <Heart className="w-6 h-6 text-pink-400" />
                <h3 className="text-xl font-bold">Кохання</h3>
                <span className="ml-auto text-2xl font-bold text-pink-400">
                  {details.loveScore}%
                </span>
              </div>
              <ProgressBar value={details.loveScore} color="pink" />
              <p className="text-sm text-text-secondary mt-3">
                Романтична та емоційна сумісність
              </p>
            </div>

            <div className="glass rounded-2xl p-6">
              <div className="flex items-center gap-3 mb-4">
                <Users className="w-6 h-6 text-blue-400" />
                <h3 className="text-xl font-bold">Дружба</h3>
                <span className="ml-auto text-2xl font-bold text-blue-400">
                  {details.friendshipScore}%
                </span>
              </div>
              <ProgressBar value={details.friendshipScore} color="blue" />
              <p className="text-sm text-text-secondary mt-3">
                Потенціал для міцної дружби
              </p>
            </div>

            <div className="glass rounded-2xl p-6">
              <div className="flex items-center gap-3 mb-4">
                <Briefcase className="w-6 h-6 text-green-400" />
                <h3 className="text-xl font-bold">Робота</h3>
                <span className="ml-auto text-2xl font-bold text-green-400">
                  {details.workScore}%
                </span>
              </div>
              <ProgressBar value={details.workScore} color="green" />
              <p className="text-sm text-text-secondary mt-3">
                Професійна співпраця
              </p>
            </div>

            <div className="glass rounded-2xl p-6">
              <div className="flex items-center gap-3 mb-4">
                <MessageCircle className="w-6 h-6 text-purple-400" />
                <h3 className="text-xl font-bold">Комунікація</h3>
                <span className="ml-auto text-2xl font-bold text-purple-400">
                  {details.communicationScore}%
                </span>
              </div>
              <ProgressBar value={details.communicationScore} color="purple" />
              <p className="text-sm text-text-secondary mt-3">
                Взаєморозуміння у спілкуванні
              </p>
            </div>
          </section>

          {/* Strengths & Challenges */}
          <section className="grid md:grid-cols-2 gap-6 mb-12">
            <div className="glass rounded-3xl p-6">
              <h3 className="text-xl font-bold mb-4 text-green-400">💚 Сильні сторони</h3>
              <ul className="space-y-3">
                {details.strengths.map((strength, index) => (
                  <li key={index} className="flex items-start gap-2 text-text-secondary">
                    <span className="w-2 h-2 rounded-full bg-green-400 mt-2 flex-shrink-0" />
                    {strength}
                  </li>
                ))}
              </ul>
            </div>
            <div className="glass rounded-3xl p-6">
              <h3 className="text-xl font-bold mb-4 text-amber-400">⚡ Виклики</h3>
              <ul className="space-y-3">
                {details.challenges.map((challenge, index) => (
                  <li key={index} className="flex items-start gap-2 text-text-secondary">
                    <span className="w-2 h-2 rounded-full bg-amber-400 mt-2 flex-shrink-0" />
                    {challenge}
                  </li>
                ))}
              </ul>
            </div>
          </section>

          {/* Links to Individual Signs */}
          <section className="grid md:grid-cols-2 gap-4 mb-12">
            <Link
              href={`/zodiac/${sign1.slug}`}
              className="glass rounded-2xl p-6 flex items-center gap-4 hover:border-accent/30 hover:bg-white/[0.07] transition-all group"
            >
              <span className="text-4xl">{sign1.symbol}</span>
              <div>
                <h3 className="font-bold group-hover:text-accent transition-colors">
                  {sign1.nameUk}
                </h3>
                <p className="text-sm text-text-muted">{sign1.dates}</p>
              </div>
              <ArrowRight className="w-5 h-5 ml-auto text-text-muted group-hover:text-accent group-hover:translate-x-1 transition-all" />
            </Link>

            <Link
              href={`/zodiac/${sign2.slug}`}
              className="glass rounded-2xl p-6 flex items-center gap-4 hover:border-accent/30 hover:bg-white/[0.07] transition-all group"
            >
              <span className="text-4xl">{sign2.symbol}</span>
              <div>
                <h3 className="font-bold group-hover:text-accent transition-colors">
                  {sign2.nameUk}
                </h3>
                <p className="text-sm text-text-muted">{sign2.dates}</p>
              </div>
              <ArrowRight className="w-5 h-5 ml-auto text-text-muted group-hover:text-accent group-hover:translate-x-1 transition-all" />
            </Link>
          </section>

          {/* Other Compatibility Options */}
          <section className="mb-12">
            <h2 className="text-xl font-bold mb-4">Інші варіанти сумісності для {sign1.nameUkGenitive}</h2>
            <div className="grid grid-cols-4 md:grid-cols-6 gap-2">
              {ZODIAC_SIGNS.filter((s) => s.slug !== sign1.slug && s.slug !== sign2.slug)
                .slice(0, 6)
                .map((s) => (
                  <Link
                    key={s.slug}
                    href={`/compatibility/${sign1.slug}/${s.slug}`}
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
              Дізнайтеся <span className="gradient-text">більше про себе</span>
            </h2>
            <p className="text-text-secondary mb-6 max-w-lg mx-auto">
              Отримайте детальний персональний звіт з аналізом натальної карти, 
              сумісності та прогнозом на 2026 рік
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
