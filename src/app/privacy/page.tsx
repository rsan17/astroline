import { Metadata } from 'next';
import Link from 'next/link';
import { Shield, Lock, Eye, Users, UserCheck, Mail, ArrowLeft } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Політика конфіденційності | Astroline',
  description: 'Дізнайтесь, як Astroline збирає, використовує та захищає ваші персональні дані.',
};

const sections = [
  {
    icon: <Eye className="w-6 h-6" />,
    title: 'Збір даних',
    content: `Ми збираємо наступну інформацію для надання наших послуг:
    
• **Персональні дані**: ім'я, електронна пошта, дата та час народження, місце народження
• **Дані квізу**: ваші відповіді на питання для персоналізації звіту
• **Зображення долоні**: для аналізу хіромантії (видаляються після обробки)
• **Технічні дані**: IP-адреса, тип браузера, пристрій для покращення сервісу`,
  },
  {
    icon: <Shield className="w-6 h-6" />,
    title: 'Використання даних',
    content: `Ваші дані використовуються виключно для:

• Створення персоналізованих астрологічних звітів
• Надсилання вашого звіту на електронну пошту
• Покращення якості наших послуг
• Зв'язку з вами щодо замовлення

Ми **ніколи** не продаємо та не передаємо ваші дані рекламодавцям чи третім сторонам для маркетингових цілей.`,
  },
  {
    icon: <Lock className="w-6 h-6" />,
    title: 'Захист даних',
    content: `Ми використовуємо найсучасніші методи захисту:

• **Шифрування SSL/TLS** для всіх з'єднань
• **Шифрування AES-256** для збереження даних
• Безпечна обробка платежів через **Stripe**
• Регулярні аудити безпеки
• Зберігання даних на захищених серверах

Фотографії долоні обробляються в реальному часі та **негайно видаляються** після аналізу.`,
  },
  {
    icon: <Users className="w-6 h-6" />,
    title: 'Треті сторони',
    content: `Ми співпрацюємо лише з перевіреними партнерами:

• **Stripe** — для безпечної обробки платежів
• **Resend** — для надсилання електронних листів
• **OpenAI** — для генерації персоналізованих звітів
• **Vercel** — для хостингу та доставки контенту

Усі партнери дотримуються суворих стандартів конфіденційності та безпеки.`,
  },
  {
    icon: <UserCheck className="w-6 h-6" />,
    title: 'Ваші права',
    content: `Відповідно до GDPR та українського законодавства, ви маєте право:

• **Доступу** — отримати копію ваших даних
• **Виправлення** — оновити неточну інформацію
• **Видалення** — запросити повне видалення ваших даних
• **Обмеження** — обмежити обробку ваших даних
• **Переносимість** — отримати дані у машиночитаному форматі
• **Відкликання згоди** — у будь-який момент`,
  },
  {
    icon: <Mail className="w-6 h-6" />,
    title: 'Контакти',
    content: `Якщо у вас є питання щодо конфіденційності або ви хочете скористатися своїми правами, зв'яжіться з нами:

• **Email**: privacy@astroline.ua
• **Адреса**: Україна, м. Київ

Ми відповідаємо на всі запити протягом 30 днів.

*Останнє оновлення: Січень 2026*`,
  },
];

export default function PrivacyPage() {
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
              <Shield className="w-8 h-8 md:w-10 md:h-10 text-accent" />
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
              Політика <span className="gradient-text">конфіденційності</span>
            </h1>
            <p className="text-text-secondary text-lg max-w-2xl mx-auto">
              Ваша приватність — наш пріоритет. Дізнайтесь, як ми захищаємо ваші дані.
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
