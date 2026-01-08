import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Img,
  Link,
  Preview,
  Section,
  Text,
  Button,
  Hr,
  Row,
  Column,
} from '@react-email/components';
import * as React from 'react';

interface ReportEmailProps {
  sunSign: string;
  sunSymbol: string;
  moonSign: string;
  moonSymbol: string;
  risingSign: string;
  risingSymbol: string;
  reportUrl: string;
  recipientName?: string;
}

export function ReportEmail({
  sunSign = 'Лев',
  sunSymbol = '♌',
  moonSign = 'Риби',
  moonSymbol = '♓',
  risingSign = 'Скорпіон',
  risingSymbol = '♏',
  reportUrl = 'https://astroline.com/report/123',
  recipientName,
}: ReportEmailProps) {
  return (
    <Html>
      <Head />
      <Preview>Ваш персональний астрологічний звіт від Astroline ✨</Preview>
      <Body style={main}>
        <Container style={container}>
          {/* Header */}
          <Section style={header}>
            <Text style={logo}>✨ Astroline</Text>
          </Section>

          {/* Hero section */}
          <Section style={heroSection}>
            <Text style={zodiacSymbol}>{sunSymbol}</Text>
            <Heading style={heading}>
              {recipientName ? `Привіт, ${recipientName}!` : `Вітаємо, ${sunSign}!`}
            </Heading>
            <Text style={subheading}>
              Ваш персональний астрологічний звіт готовий
            </Text>
          </Section>

          {/* Natal chart summary */}
          <Section style={chartSection}>
            <Heading as="h2" style={sectionTitle}>
              🌌 Ваша натальна карта
            </Heading>
            
            <Row style={chartRow}>
              <Column style={chartColumn}>
                <Text style={chartIcon}>☀️</Text>
                <Text style={chartLabel}>Сонце</Text>
                <Text style={chartValue}>{sunSymbol} {sunSign}</Text>
              </Column>
              <Column style={chartColumn}>
                <Text style={chartIcon}>🌙</Text>
                <Text style={chartLabel}>Місяць</Text>
                <Text style={chartValue}>{moonSymbol} {moonSign}</Text>
              </Column>
              <Column style={chartColumn}>
                <Text style={chartIcon}>⬆️</Text>
                <Text style={chartLabel}>Асцендент</Text>
                <Text style={chartValue}>{risingSymbol} {risingSign}</Text>
              </Column>
            </Row>
          </Section>

          <Hr style={divider} />

          {/* Report highlights */}
          <Section style={highlightsSection}>
            <Heading as="h2" style={sectionTitle}>
              📊 Що всередині вашого звіту
            </Heading>
            
            <Text style={highlightItem}>✓ Детальний аналіз натальної карти</Text>
            <Text style={highlightItem}>✓ Характеристика особистості</Text>
            <Text style={highlightItem}>✓ Прогноз на 2026 рік по кварталах</Text>
            <Text style={highlightItem}>✓ Кохання та сумісність</Text>
            <Text style={highlightItem}>✓ Кар'єра та фінанси</Text>
            <Text style={highlightItem}>✓ Щасливі числа, дні та кольори</Text>
          </Section>

          {/* CTA Button */}
          <Section style={ctaSection}>
            <Button style={ctaButton} href={reportUrl}>
              🔮 Переглянути повний звіт
            </Button>
          </Section>

          <Hr style={divider} />

          {/* Footer */}
          <Section style={footer}>
            <Text style={footerText}>
              Цей лист надіслано з Astroline — вашого персонального астрологічного гіда.
            </Text>
            <Text style={footerLinks}>
              <Link href="https://astroline.com" style={footerLink}>
                Наш сайт
              </Link>
              {' • '}
              <Link href="https://astroline.com/privacy" style={footerLink}>
                Конфіденційність
              </Link>
              {' • '}
              <Link href="https://astroline.com/unsubscribe" style={footerLink}>
                Відписатися
              </Link>
            </Text>
            <Text style={copyright}>
              © 2026 Astroline. Усі права захищені.
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
}

export default ReportEmail;

// Styles
const main = {
  backgroundColor: '#0a0f1a',
  fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
};

const container = {
  margin: '0 auto',
  padding: '40px 20px',
  maxWidth: '600px',
};

const header = {
  textAlign: 'center' as const,
  marginBottom: '30px',
};

const logo = {
  fontSize: '24px',
  fontWeight: 'bold',
  background: 'linear-gradient(135deg, #4ECDC4, #44A08D)',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  color: '#4ECDC4',
};

const heroSection = {
  textAlign: 'center' as const,
  padding: '40px 20px',
  background: 'linear-gradient(135deg, rgba(78, 205, 196, 0.1), rgba(102, 126, 234, 0.1))',
  borderRadius: '16px',
  marginBottom: '30px',
};

const zodiacSymbol = {
  fontSize: '64px',
  marginBottom: '20px',
};

const heading = {
  color: '#f0f0f0',
  fontSize: '28px',
  fontWeight: 'bold',
  margin: '0 0 10px',
};

const subheading = {
  color: '#a0a0a0',
  fontSize: '16px',
  margin: '0',
};

const chartSection = {
  padding: '20px',
  background: 'rgba(255, 255, 255, 0.05)',
  borderRadius: '12px',
  marginBottom: '20px',
};

const sectionTitle = {
  color: '#f0f0f0',
  fontSize: '18px',
  fontWeight: 'bold',
  textAlign: 'center' as const,
  marginBottom: '20px',
};

const chartRow = {
  width: '100%',
};

const chartColumn = {
  textAlign: 'center' as const,
  padding: '10px',
};

const chartIcon = {
  fontSize: '24px',
  margin: '0 0 5px',
};

const chartLabel = {
  color: '#a0a0a0',
  fontSize: '12px',
  margin: '0 0 5px',
};

const chartValue = {
  color: '#4ECDC4',
  fontSize: '14px',
  fontWeight: 'bold',
  margin: '0',
};

const divider = {
  borderColor: 'rgba(255, 255, 255, 0.1)',
  margin: '30px 0',
};

const highlightsSection = {
  padding: '20px',
};

const highlightItem = {
  color: '#a0a0a0',
  fontSize: '14px',
  margin: '8px 0',
  paddingLeft: '10px',
};

const ctaSection = {
  textAlign: 'center' as const,
  padding: '30px 0',
};

const ctaButton = {
  backgroundColor: '#4ECDC4',
  color: '#0a0f1a',
  padding: '16px 40px',
  borderRadius: '50px',
  fontSize: '16px',
  fontWeight: 'bold',
  textDecoration: 'none',
  display: 'inline-block',
};

const footer = {
  textAlign: 'center' as const,
  padding: '20px',
};

const footerText = {
  color: '#6b7280',
  fontSize: '12px',
  margin: '0 0 15px',
};

const footerLinks = {
  margin: '0 0 15px',
};

const footerLink = {
  color: '#a0a0a0',
  fontSize: '12px',
  textDecoration: 'none',
};

const copyright = {
  color: '#4b5563',
  fontSize: '11px',
  margin: '0',
};

