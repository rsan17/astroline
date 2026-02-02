/**
 * PDF Report Template for Astroline
 * Uses @react-pdf/renderer to generate PDF from React components
 * 
 * NOTE: Emojis and special Unicode symbols are NOT supported in react-pdf
 * Use text labels instead
 */

import React from 'react';
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Font,
} from '@react-pdf/renderer';
import type { FullReport } from '@/types/report';
import { isUnknownSign } from '@/types/report';

// Register Noto Sans font with full Cyrillic support
Font.register({
  family: 'NotoSans',
  fonts: [
    {
      src: 'https://cdn.jsdelivr.net/npm/@fontsource/noto-sans@5.0.0/files/noto-sans-cyrillic-400-normal.woff',
      fontWeight: 400,
    },
    {
      src: 'https://cdn.jsdelivr.net/npm/@fontsource/noto-sans@5.0.0/files/noto-sans-cyrillic-700-normal.woff',
      fontWeight: 700,
    },
  ],
});

// Color palette
const colors = {
  background: '#0a0f1a',
  backgroundLight: '#141c2f',
  accent: '#4ECDC4',
  accentSecondary: '#667eea',
  textPrimary: '#f0f0f0',
  textSecondary: '#a0a0a0',
  textMuted: '#6b7280',
  borderColor: '#2a3548',
  gold: '#FFD700',
};

// Styles
const styles = StyleSheet.create({
  page: {
    backgroundColor: colors.background,
    padding: 40,
    fontFamily: 'NotoSans',
    color: colors.textPrimary,
  },
  // Header
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 25,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: colors.borderColor,
  },
  logo: {
    fontSize: 16,
    fontWeight: 700,
    color: colors.accent,
  },
  date: {
    fontSize: 9,
    color: colors.textMuted,
  },
  // Cover page
  coverPage: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  coverSymbol: {
    fontSize: 72,
    fontWeight: 700,
    color: colors.accent,
    marginBottom: 15,
  },
  coverTitle: {
    fontSize: 28,
    fontWeight: 700,
    color: colors.textPrimary,
    marginBottom: 8,
    textAlign: 'center',
  },
  coverSubtitle: {
    fontSize: 18,
    color: colors.accent,
    marginBottom: 35,
    textAlign: 'center',
  },
  coverInfo: {
    marginTop: 15,
    padding: 20,
    backgroundColor: colors.backgroundLight,
    borderRadius: 8,
    width: '75%',
  },
  coverInfoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
    paddingBottom: 8,
    borderBottomWidth: 1,
    borderBottomColor: colors.borderColor,
  },
  coverInfoLabel: {
    fontSize: 10,
    color: colors.textSecondary,
  },
  coverInfoValue: {
    fontSize: 10,
    color: colors.textPrimary,
    fontWeight: 700,
  },
  // Section
  section: {
    marginBottom: 20,
  },
  sectionHeader: {
    marginBottom: 15,
    paddingBottom: 8,
    borderBottomWidth: 2,
    borderBottomColor: colors.accent,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 700,
    color: colors.accent,
  },
  sectionContent: {
    paddingLeft: 0,
  },
  // Card
  card: {
    backgroundColor: colors.backgroundLight,
    borderRadius: 6,
    padding: 12,
    marginBottom: 10,
  },
  cardTitle: {
    fontSize: 11,
    fontWeight: 700,
    color: colors.accent,
    marginBottom: 8,
  },
  cardText: {
    fontSize: 9,
    color: colors.textSecondary,
    lineHeight: 1.6,
  },
  // Natal chart
  natalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  natalCard: {
    width: '31%',
    backgroundColor: colors.backgroundLight,
    borderRadius: 6,
    padding: 12,
    alignItems: 'center',
  },
  natalLabel: {
    fontSize: 8,
    color: colors.textSecondary,
    marginBottom: 6,
    textTransform: 'uppercase',
  },
  natalSign: {
    fontSize: 14,
    fontWeight: 700,
    color: colors.textPrimary,
    textAlign: 'center',
  },
  // Traits
  traitRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 12,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: colors.borderColor,
  },
  traitContent: {
    flex: 1,
  },
  traitTitle: {
    fontSize: 10,
    fontWeight: 700,
    color: colors.textPrimary,
    marginBottom: 4,
  },
  traitDesc: {
    fontSize: 9,
    color: colors.textSecondary,
    lineHeight: 1.5,
  },
  traitBar: {
    height: 4,
    backgroundColor: colors.borderColor,
    borderRadius: 2,
    marginTop: 6,
  },
  traitBarFill: {
    height: 4,
    backgroundColor: colors.accent,
    borderRadius: 2,
  },
  // Forecast
  quarterCard: {
    backgroundColor: colors.backgroundLight,
    borderRadius: 6,
    padding: 12,
    marginBottom: 10,
  },
  quarterHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  quarterTitle: {
    fontSize: 11,
    fontWeight: 700,
    color: colors.accent,
  },
  quarterPeriod: {
    fontSize: 8,
    color: colors.textMuted,
  },
  quarterDesc: {
    fontSize: 9,
    color: colors.textSecondary,
    lineHeight: 1.5,
    marginBottom: 8,
  },
  quarterFocus: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  focusTag: {
    backgroundColor: '#1a3a3a',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 4,
    marginRight: 5,
    marginBottom: 3,
  },
  focusTagText: {
    fontSize: 8,
    color: colors.accent,
  },
  // Compatibility
  compatRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  compatCard: {
    width: '31%',
    backgroundColor: colors.backgroundLight,
    borderRadius: 6,
    padding: 10,
    alignItems: 'center',
  },
  compatSign: {
    fontSize: 11,
    fontWeight: 700,
    color: colors.textPrimary,
    marginBottom: 4,
  },
  compatPercent: {
    fontSize: 16,
    fontWeight: 700,
    color: colors.accent,
  },
  // Lucky section
  luckyGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  luckyCard: {
    width: '48%',
    backgroundColor: colors.backgroundLight,
    borderRadius: 6,
    padding: 12,
    marginBottom: 10,
  },
  luckyLabel: {
    fontSize: 9,
    color: colors.textSecondary,
    marginBottom: 6,
  },
  luckyValue: {
    fontSize: 11,
    fontWeight: 700,
    color: colors.accent,
  },
  // Lists
  listItem: {
    flexDirection: 'row',
    marginBottom: 5,
  },
  listBullet: {
    fontSize: 9,
    color: colors.accent,
    marginRight: 8,
    width: 10,
  },
  listText: {
    fontSize: 9,
    color: colors.textSecondary,
    flex: 1,
    lineHeight: 1.4,
  },
  // Numerology
  numCard: {
    backgroundColor: colors.backgroundLight,
    borderRadius: 6,
    padding: 15,
    marginBottom: 10,
    alignItems: 'center',
  },
  numNumber: {
    fontSize: 42,
    fontWeight: 700,
    color: colors.gold,
    marginBottom: 5,
  },
  numLabel: {
    fontSize: 10,
    color: colors.textSecondary,
    marginBottom: 8,
    textAlign: 'center',
  },
  numDesc: {
    fontSize: 9,
    color: colors.textSecondary,
    textAlign: 'center',
    lineHeight: 1.5,
  },
  numRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  numSmallCard: {
    width: '48%',
    backgroundColor: colors.backgroundLight,
    borderRadius: 6,
    padding: 12,
    alignItems: 'center',
  },
  numSmallNumber: {
    fontSize: 28,
    fontWeight: 700,
    color: colors.accentSecondary,
    marginBottom: 4,
  },
  numSmallLabel: {
    fontSize: 8,
    color: colors.textSecondary,
    textAlign: 'center',
  },
  // Footer
  footer: {
    position: 'absolute',
    bottom: 25,
    left: 40,
    right: 40,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: colors.borderColor,
  },
  footerText: {
    fontSize: 8,
    color: colors.textMuted,
  },
  pageNumber: {
    fontSize: 8,
    color: colors.textMuted,
  },
  // Divider
  divider: {
    height: 1,
    backgroundColor: colors.borderColor,
    marginVertical: 15,
  },
});

interface ReportPDFProps {
  report: FullReport;
}

// Cover Page Component
function CoverPage({ report }: ReportPDFProps) {
  const sunSign = report.natalChart.sunSign;
  const moonSign = report.natalChart.moonSign;
  const risingSign = report.natalChart.risingSign;
  
  // Get first letter of sign name for visual display
  const signInitial = sunSign.name.charAt(0).toUpperCase();
  
  return (
    <Page size="A4" style={styles.page}>
      <View style={styles.coverPage}>
        <Text style={styles.coverSymbol}>{signInitial}</Text>
        <Text style={styles.coverTitle}>Астрологічний Звіт</Text>
        <Text style={styles.coverSubtitle}>{sunSign.name}</Text>
        
        <View style={styles.coverInfo}>
          <View style={styles.coverInfoRow}>
            <Text style={styles.coverInfoLabel}>Дата народження:</Text>
            <Text style={styles.coverInfoValue}>{report.userData.birthDate}</Text>
          </View>
          {report.userData.birthTime && (
            <View style={styles.coverInfoRow}>
              <Text style={styles.coverInfoLabel}>Час народження:</Text>
              <Text style={styles.coverInfoValue}>{report.userData.birthTime}</Text>
            </View>
          )}
          {report.userData.birthPlace && (
            <View style={styles.coverInfoRow}>
              <Text style={styles.coverInfoLabel}>Місце народження:</Text>
              <Text style={styles.coverInfoValue}>{report.userData.birthPlace}</Text>
            </View>
          )}
          <View style={styles.coverInfoRow}>
            <Text style={styles.coverInfoLabel}>Сонячний знак:</Text>
            <Text style={styles.coverInfoValue}>{sunSign.name}</Text>
          </View>
          {!isUnknownSign(moonSign) && (
            <View style={styles.coverInfoRow}>
              <Text style={styles.coverInfoLabel}>Місячний знак:</Text>
              <Text style={styles.coverInfoValue}>{moonSign.name}</Text>
            </View>
          )}
          {!isUnknownSign(risingSign) && (
            <View style={[styles.coverInfoRow, { borderBottomWidth: 0, marginBottom: 0 }]}>
              <Text style={styles.coverInfoLabel}>Асцендент:</Text>
              <Text style={styles.coverInfoValue}>{risingSign.name}</Text>
            </View>
          )}
        </View>
      </View>
      
      <View style={styles.footer}>
        <Text style={styles.footerText}>© 2026 Astroline</Text>
        <Text style={styles.footerText}>astrolog.cards</Text>
      </View>
    </Page>
  );
}

// Natal Chart Page
function NatalChartPage({ report }: ReportPDFProps) {
  const { sunSign, moonSign, risingSign, sunDescription, moonDescription, risingDescription } = report.natalChart;
  
  return (
    <Page size="A4" style={styles.page}>
      <View style={styles.header}>
        <Text style={styles.logo}>(Astroline</Text>
        <Text style={styles.date}>Звіт від {new Date().toLocaleDateString('uk-UA')}</Text>
      </View>
      
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Натальна Карта</Text>
        </View>
        
        <View style={styles.sectionContent}>
          <View style={styles.natalRow}>
            <View style={styles.natalCard}>
              <Text style={styles.natalLabel}>Сонце</Text>
              <Text style={styles.natalSign}>{sunSign.name}</Text>
            </View>
            <View style={styles.natalCard}>
              <Text style={styles.natalLabel}>Місяць</Text>
              <Text style={styles.natalSign}>
                {isUnknownSign(moonSign) ? 'Невідомо' : moonSign.name}
              </Text>
            </View>
            <View style={styles.natalCard}>
              <Text style={styles.natalLabel}>Асцендент</Text>
              <Text style={styles.natalSign}>
                {isUnknownSign(risingSign) ? 'Невідомо' : risingSign.name}
              </Text>
            </View>
          </View>
          
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Сонячний знак - {sunSign.name}</Text>
            <Text style={styles.cardText}>{sunDescription}</Text>
          </View>
          
          {moonDescription && !isUnknownSign(moonSign) && (
            <View style={styles.card}>
              <Text style={styles.cardTitle}>Місячний знак - {moonSign.name}</Text>
              <Text style={styles.cardText}>{moonDescription}</Text>
            </View>
          )}
          
          {risingDescription && !isUnknownSign(risingSign) && (
            <View style={styles.card}>
              <Text style={styles.cardTitle}>Асцендент - {risingSign.name}</Text>
              <Text style={styles.cardText}>{risingDescription}</Text>
            </View>
          )}
        </View>
      </View>
      
      <View style={styles.footer}>
        <Text style={styles.footerText}>© 2026 Astroline</Text>
        <Text render={({ pageNumber, totalPages }) => `${pageNumber} / ${totalPages}`} style={styles.pageNumber} />
      </View>
    </Page>
  );
}

// Numerology Page
function NumerologyPage({ report }: ReportPDFProps) {
  if (!report.numerology) return null;
  
  const { lifePathNumber, lifePathMeaning, birthdayNumber, birthdayMeaning, personalYear2026, personalYearMeaning, isMasterNumber } = report.numerology;
  
  return (
    <Page size="A4" style={styles.page}>
      <View style={styles.header}>
        <Text style={styles.logo}>(Astroline</Text>
        <Text style={styles.date}>Нумерологія</Text>
      </View>
      
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Нумерологічний Профіль</Text>
        </View>
        
        <View style={styles.sectionContent}>
          <View style={styles.numCard}>
            <Text style={styles.numNumber}>{lifePathNumber}</Text>
            <Text style={styles.numLabel}>
              Число Життєвого Шляху{isMasterNumber ? ' (Майстер-число)' : ''}
            </Text>
            <Text style={styles.numDesc}>{lifePathMeaning}</Text>
          </View>
          
          <View style={styles.numRow}>
            <View style={styles.numSmallCard}>
              <Text style={styles.numSmallNumber}>{birthdayNumber}</Text>
              <Text style={styles.numSmallLabel}>Число Дня Народження</Text>
            </View>
            <View style={styles.numSmallCard}>
              <Text style={styles.numSmallNumber}>{personalYear2026}</Text>
              <Text style={styles.numSmallLabel}>Персональний Рік 2026</Text>
            </View>
          </View>
          
          <View style={styles.divider} />
          
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Число Дня Народження</Text>
            <Text style={styles.cardText}>{birthdayMeaning}</Text>
          </View>
          
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Персональний Рік 2026</Text>
            <Text style={styles.cardText}>{personalYearMeaning}</Text>
          </View>
        </View>
      </View>
      
      <View style={styles.footer}>
        <Text style={styles.footerText}>© 2026 Astroline</Text>
        <Text render={({ pageNumber, totalPages }) => `${pageNumber} / ${totalPages}`} style={styles.pageNumber} />
      </View>
    </Page>
  );
}

// Personality Page
function PersonalityPage({ report }: ReportPDFProps) {
  const traits = report.personality.slice(0, 6);
  
  return (
    <Page size="A4" style={styles.page}>
      <View style={styles.header}>
        <Text style={styles.logo}>(Astroline</Text>
        <Text style={styles.date}>Особистість</Text>
      </View>
      
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Риси Особистості</Text>
        </View>
        
        <View style={styles.sectionContent}>
          {traits.map((trait, index) => (
            <View key={index} style={styles.traitRow}>
              <View style={styles.traitContent}>
                <Text style={styles.traitTitle}>{trait.title}</Text>
                <Text style={styles.traitDesc}>{trait.description}</Text>
                <View style={styles.traitBar}>
                  <View style={[styles.traitBarFill, { width: `${trait.strength}%` }]} />
                </View>
              </View>
            </View>
          ))}
        </View>
      </View>
      
      <View style={styles.footer}>
        <Text style={styles.footerText}>© 2026 Astroline</Text>
        <Text render={({ pageNumber, totalPages }) => `${pageNumber} / ${totalPages}`} style={styles.pageNumber} />
      </View>
    </Page>
  );
}

// Forecast Page
function ForecastPage({ report }: ReportPDFProps) {
  return (
    <Page size="A4" style={styles.page}>
      <View style={styles.header}>
        <Text style={styles.logo}>(Astroline</Text>
        <Text style={styles.date}>Прогноз 2026</Text>
      </View>
      
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Прогноз на 2026 рік</Text>
        </View>
        
        <View style={styles.sectionContent}>
          {report.forecast2026.map((quarter, index) => (
            <View key={index} style={styles.quarterCard}>
              <View style={styles.quarterHeader}>
                <Text style={styles.quarterTitle}>{quarter.title}</Text>
                <Text style={styles.quarterPeriod}>{quarter.quarter}</Text>
              </View>
              <Text style={styles.quarterDesc}>{quarter.description}</Text>
              <View style={styles.quarterFocus}>
                {quarter.focus.map((f, i) => (
                  <View key={i} style={styles.focusTag}>
                    <Text style={styles.focusTagText}>{f}</Text>
                  </View>
                ))}
              </View>
            </View>
          ))}
        </View>
      </View>
      
      <View style={styles.footer}>
        <Text style={styles.footerText}>© 2026 Astroline</Text>
        <Text render={({ pageNumber, totalPages }) => `${pageNumber} / ${totalPages}`} style={styles.pageNumber} />
      </View>
    </Page>
  );
}

// Love Page
function LovePage({ report }: ReportPDFProps) {
  const { love } = report;
  
  return (
    <Page size="A4" style={styles.page}>
      <View style={styles.header}>
        <Text style={styles.logo}>(Astroline</Text>
        <Text style={styles.date}>Кохання</Text>
      </View>
      
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Кохання та Стосунки</Text>
        </View>
        
        <View style={styles.sectionContent}>
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Огляд</Text>
            <Text style={styles.cardText}>{love.overview}</Text>
          </View>
          
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Сильні сторони у стосунках</Text>
            {love.strengths.map((s, i) => (
              <View key={i} style={styles.listItem}>
                <Text style={styles.listBullet}>-</Text>
                <Text style={styles.listText}>{s}</Text>
              </View>
            ))}
          </View>
          
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Виклики</Text>
            {love.challenges.map((c, i) => (
              <View key={i} style={styles.listItem}>
                <Text style={styles.listBullet}>-</Text>
                <Text style={styles.listText}>{c}</Text>
              </View>
            ))}
          </View>
          
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Порада</Text>
            <Text style={styles.cardText}>{love.advice}</Text>
          </View>
          
          <View style={styles.divider} />
          
          <Text style={[styles.cardTitle, { marginBottom: 10 }]}>Найкраща сумісність</Text>
          <View style={styles.compatRow}>
            {love.topMatches.slice(0, 3).map((match, i) => (
              <View key={i} style={styles.compatCard}>
                <Text style={styles.compatSign}>{match.sign}</Text>
                <Text style={styles.compatPercent}>{match.percentage}%</Text>
              </View>
            ))}
          </View>
        </View>
      </View>
      
      <View style={styles.footer}>
        <Text style={styles.footerText}>© 2026 Astroline</Text>
        <Text render={({ pageNumber, totalPages }) => `${pageNumber} / ${totalPages}`} style={styles.pageNumber} />
      </View>
    </Page>
  );
}

// Career Page
function CareerPage({ report }: ReportPDFProps) {
  const { career } = report;
  
  return (
    <Page size="A4" style={styles.page}>
      <View style={styles.header}>
        <Text style={styles.logo}>(Astroline</Text>
        <Text style={styles.date}>Кар'єра</Text>
      </View>
      
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Кар'єра та Фінанси</Text>
        </View>
        
        <View style={styles.sectionContent}>
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Огляд</Text>
            <Text style={styles.cardText}>{career.overview}</Text>
          </View>
          
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Професійні сильні сторони</Text>
            {career.strengths.map((s, i) => (
              <View key={i} style={styles.listItem}>
                <Text style={styles.listBullet}>-</Text>
                <Text style={styles.listText}>{s}</Text>
              </View>
            ))}
          </View>
          
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Ідеальні кар'єрні напрямки</Text>
            {career.idealCareers.map((c, i) => (
              <View key={i} style={styles.listItem}>
                <Text style={styles.listBullet}>-</Text>
                <Text style={styles.listText}>{c}</Text>
              </View>
            ))}
          </View>
          
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Фінансові поради</Text>
            {career.financeTips.map((t, i) => (
              <View key={i} style={styles.listItem}>
                <Text style={styles.listBullet}>-</Text>
                <Text style={styles.listText}>{t}</Text>
              </View>
            ))}
          </View>
          
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Фокус на 2026 рік</Text>
            <Text style={styles.cardText}>{career.yearFocus}</Text>
          </View>
        </View>
      </View>
      
      <View style={styles.footer}>
        <Text style={styles.footerText}>© 2026 Astroline</Text>
        <Text render={({ pageNumber, totalPages }) => `${pageNumber} / ${totalPages}`} style={styles.pageNumber} />
      </View>
    </Page>
  );
}

// Lucky Page
function LuckyPage({ report }: ReportPDFProps) {
  const { lucky } = report;
  
  return (
    <Page size="A4" style={styles.page}>
      <View style={styles.header}>
        <Text style={styles.logo}>(Astroline</Text>
        <Text style={styles.date}>Щасливі атрибути</Text>
      </View>
      
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Щасливі Атрибути</Text>
        </View>
        
        <View style={styles.sectionContent}>
          <View style={styles.luckyGrid}>
            <View style={styles.luckyCard}>
              <Text style={styles.luckyLabel}>Щасливі числа</Text>
              <Text style={styles.luckyValue}>{lucky.numbers.join(', ')}</Text>
              {lucky.numbersExplanation && (
                <Text style={[styles.cardText, { marginTop: 5 }]}>{lucky.numbersExplanation}</Text>
              )}
            </View>
            
            <View style={styles.luckyCard}>
              <Text style={styles.luckyLabel}>Щасливі дні</Text>
              <Text style={styles.luckyValue}>{lucky.days.join(', ')}</Text>
              {lucky.daysExplanation && (
                <Text style={[styles.cardText, { marginTop: 5 }]}>{lucky.daysExplanation}</Text>
              )}
            </View>
            
            <View style={styles.luckyCard}>
              <Text style={styles.luckyLabel}>Щасливі кольори</Text>
              <Text style={styles.luckyValue}>{lucky.colors.join(', ')}</Text>
              {lucky.colorsExplanation && (
                <Text style={[styles.cardText, { marginTop: 5 }]}>{lucky.colorsExplanation}</Text>
              )}
            </View>
            
            <View style={styles.luckyCard}>
              <Text style={styles.luckyLabel}>Щасливі камені</Text>
              <Text style={styles.luckyValue}>{lucky.gems.join(', ')}</Text>
              {lucky.gemsExplanation && (
                <Text style={[styles.cardText, { marginTop: 5 }]}>{lucky.gemsExplanation}</Text>
              )}
            </View>
          </View>
          
          <View style={[styles.card, { marginTop: 10 }]}>
            <Text style={styles.cardTitle}>Щасливий напрямок</Text>
            <Text style={styles.luckyValue}>{lucky.direction}</Text>
            {lucky.directionExplanation && (
              <Text style={[styles.cardText, { marginTop: 5 }]}>{lucky.directionExplanation}</Text>
            )}
          </View>
        </View>
      </View>
      
      <View style={styles.divider} />
      
      {/* Thank you section */}
      <View style={[styles.card, { alignItems: 'center' as const }]}>
        <Text style={[styles.cardTitle, { textAlign: 'center' as const, marginBottom: 10 }]}>
          Дякуємо за довіру!
        </Text>
        <Text style={[styles.cardText, { textAlign: 'center' as const }]}>
          Цей звіт згенеровано спеціально для вас командою Astroline.
        </Text>
        <Text style={[styles.cardText, { textAlign: 'center' as const }]}>
          Бажаємо вам успіхів у 2026 році!
        </Text>
        <Text style={[styles.cardText, { textAlign: 'center' as const, marginTop: 10, color: colors.accent }]}>
          astrolog.cards
        </Text>
      </View>
      
      <View style={styles.footer}>
        <Text style={styles.footerText}>© 2026 Astroline</Text>
        <Text render={({ pageNumber, totalPages }) => `${pageNumber} / ${totalPages}`} style={styles.pageNumber} />
      </View>
    </Page>
  );
}

// Main PDF Document
export function ReportPDF({ report }: ReportPDFProps) {
  return (
    <Document
      title={`Астрологічний Звіт - ${report.natalChart.sunSign.name}`}
      author="Astroline"
      subject="Персональний астрологічний звіт"
      creator="astrolog.cards"
    >
      <CoverPage report={report} />
      <NatalChartPage report={report} />
      {report.numerology && <NumerologyPage report={report} />}
      <PersonalityPage report={report} />
      <ForecastPage report={report} />
      <LovePage report={report} />
      <CareerPage report={report} />
      <LuckyPage report={report} />
    </Document>
  );
}

export default ReportPDF;
