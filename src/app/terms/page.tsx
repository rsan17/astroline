import { Metadata } from 'next';
import Link from 'next/link';
import { FileText, CheckCircle, CreditCard, Sparkles, AlertTriangle, RefreshCw, ArrowLeft } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Умови використання | Astroline',
  description: 'Ознайомтесь з умовами використання сервісу Astroline для астрологічних прогнозів та аналізу.',
};

const sections = [
  {
    icon: <Sparkles className="w-6 h-6" />,
    title: 'Опис сервісу',
    content: `Astroline надає такі послуги:

• **Персоналізовані астрологічні звіти** на основі дати, часу та місця народження
• **Аналіз натальної карти** з визначенням сонячного, місячного знаків та асценденту
• **AI-аналіз долоні** для додаткових інсайтів
• **Прогнози сумісності** з іншими знаками зодіаку
• **Кар'єрні та любовні поради** на основі астрологічного профілю

Сервіс призначений для розважальних та інформаційних цілей. Астрологічні прогнози не є науково доведеними та не замінюють професійні консультації.`,
  },
  {
    icon: <CheckCircle className="w-6 h-6" />,
    title: 'Обов\'язки користувача',
    content: `Користуючись Astroline, ви погоджуєтесь:

• Надавати **точну інформацію** про дату, час та місце народження
• **Не використовувати** сервіс для незаконних цілей
• **Не поширювати** отримані звіти комерційно без дозволу
• **Не намагатися** обійти системи безпеки або платіжні механізми
• Бути віком **18 років або старше** (або мати дозвіл батьків)

Ви несете відповідальність за збереження конфіденційності вашого облікового запису та пароля.`,
  },
  {
    icon: <CreditCard className="w-6 h-6" />,
    title: 'Оплата та підписка',
    content: `**Вартість послуг:**
• Повний астрологічний звіт — одноразова оплата
• Усі ціни вказані в гривнях (UAH) або доларах (USD)

**Умови оплати:**
• Оплата здійснюється через захищену систему **Stripe**
• Після оплати ви отримуєте миттєвий доступ до звіту
• Звіт надсилається на вашу електронну пошту

**Гарантія повернення:**
• **7-денна гарантія** повернення коштів без питань
• Для повернення зверніться на support@astroline.ua`,
  },
  {
    icon: <FileText className="w-6 h-6" />,
    title: 'Інтелектуальна власність',
    content: `**Права Astroline:**
• Весь контент, дизайн та код сайту є власністю Astroline
• Алгоритми генерації звітів захищені авторським правом
• Торгова марка "Astroline" та логотип є зареєстрованими

**Ваші права на звіт:**
• Ви отримуєте **особисту ліцензію** на використання вашого звіту
• Можете ділитися звітом з друзями та родиною
• **Заборонено** комерційне використання або перепродаж

Порушення авторських прав переслідується законом.`,
  },
  {
    icon: <AlertTriangle className="w-6 h-6" />,
    title: 'Обмеження відповідальності',
    content: `**Важливі застереження:**

• Astroline надає послуги **"як є"** без гарантій точності прогнозів
• Астрологія є **розважальним контентом**, не науковим методом
• Ми **не несемо відповідальності** за рішення, прийняті на основі звітів
• Максимальна відповідальність обмежена сумою оплаченої послуги

**Рекомендації:**
• Для важливих життєвих рішень консультуйтесь з професіоналами
• Звіти призначені для самопізнання та розваги`,
  },
  {
    icon: <RefreshCw className="w-6 h-6" />,
    title: 'Зміни умов',
    content: `**Оновлення умов:**
• Ми можемо оновлювати ці умови час від часу
• Про суттєві зміни повідомляємо на сайті або електронною поштою
• Продовження використання сервісу означає згоду з новими умовами

**Припинення доступу:**
• Ми залишаємо за собою право припинити доступ за порушення умов
• Ви можете припинити використання сервісу в будь-який момент

**Вирішення спорів:**
• Спори вирішуються відповідно до законодавства України
• Юрисдикція — суди міста Києва

*Останнє оновлення: Січень 2026*`,
  },
];

export default function TermsPage() {
  return (
    <div className="min-h-screen star-field">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-white/5 pt-[env(safe-area-inset-top)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <Link
            href="/"
            className="text-lg md:text-xl font-bold gradient-text"
          >
            ✨ Astroline
          </Link>
          <Link
            href="/"
            className="btn-secondary text-sm py-2 px-4 flex items-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            На головну
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="pt-24 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12 md:mb-16">
            <div className="inline-flex items-center justify-center w-16 h-16 md:w-20 md:h-20 rounded-2xl bg-gradient-to-br from-accent/20 to-purple-500/20 border border-white/10 mb-6">
              <FileText className="w-8 h-8 md:w-10 md:h-10 text-accent" />
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
              Умови <span className="gradient-text">використання</span>
            </h1>
            <p className="text-text-secondary text-lg max-w-2xl mx-auto">
              Ознайомтесь з правилами використання сервісу Astroline.
            </p>
          </div>

          {/* Content Sections */}
          <div className="space-y-6">
            {sections.map((section, index) => (
              <article
                key={index}
                className="glass rounded-2xl p-6 md:p-8 hover:border-accent/20 transition-all duration-300"
              >
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-gradient-to-br from-accent/20 to-teal-500/20 flex items-center justify-center text-accent">
                    {section.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h2 className="text-xl md:text-2xl font-bold text-text-primary mb-4">
                      {section.title}
                    </h2>
                    <div className="text-text-secondary leading-relaxed whitespace-pre-line prose prose-invert prose-sm max-w-none">
                      {section.content.split('**').map((part, i) => 
                        i % 2 === 1 ? (
                          <strong key={i} className="text-text-primary font-semibold">{part}</strong>
                        ) : (
                          <span key={i}>{part}</span>
                        )
                      )}
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>

          {/* Back Link */}
          <div className="mt-12 text-center">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-accent hover:text-accent/80 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Повернутися на головну
            </Link>
          </div>
        </div>
      </main>

      {/* Minimal Footer */}
      <footer className="border-t border-white/10 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-text-muted text-sm">
            © 2026 Astroline. Усі права захищені.
          </p>
        </div>
      </footer>
    </div>
  );
}
