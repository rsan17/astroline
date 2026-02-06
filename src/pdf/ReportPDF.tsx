/**
 * PDF Report Template for Astroline
 * Extended version with comprehensive multi-page content
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
  background: '#0E1420',
  backgroundLight: '#1A2233',
  accent: '#2EE4D9',
  accentLight: '#6CF2E8',
  textPrimary: '#D5E8F0',
  textSecondary: '#8EA3B5',
  textMuted: '#6b7280',
  borderColor: 'rgba(46, 228, 217, 0.1)',
  borderAccent: 'rgba(46, 228, 217, 0.2)',
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
    borderBottomColor: colors.borderAccent,
  },
  logo: {
    fontSize: 18,
    fontWeight: 700,
    color: colors.accent,
  },
  date: {
    fontSize: 9,
    color: colors.textMuted,
  },
  // Section Header
  sectionHeader: {
    marginBottom: 20,
    paddingBottom: 12,
    borderBottomWidth: 2,
    borderBottomColor: colors.accent,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 700,
    color: colors.accent,
    marginBottom: 6,
  },
  divider: {
    width: 60,
    height: 3,
    backgroundColor: colors.accent,
    marginTop: 8,
  },
  // Cover page
  coverPage: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  coverLogo: {
    fontSize: 28,
    fontWeight: 700,
    color: colors.accent,
    marginBottom: 60,
  },
  coverTitle: {
    fontSize: 36,
    fontWeight: 700,
    color: colors.accent,
    marginBottom: 12,
    textAlign: 'center',
  },
  coverSubtitle: {
    fontSize: 14,
    color: colors.textSecondary,
    marginBottom: 40,
    textAlign: 'center',
  },
  coverInfo: {
    marginTop: 30,
    padding: 24,
    backgroundColor: colors.backgroundLight,
    borderRadius: 16,
    width: '80%',
  },
  coverInfoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: colors.borderColor,
  },
  coverInfoLabel: {
    fontSize: 10,
    color: colors.textSecondary,
  },
  coverInfoValue: {
    fontSize: 10,
    color: colors.accent,
    fontWeight: 700,
  },
  // Card
  card: {
    backgroundColor: colors.backgroundLight,
    borderRadius: 14,
    padding: 18,
    marginBottom: 14,
  },
  cardTitle: {
    fontSize: 13,
    fontWeight: 700,
    color: colors.accentLight,
    marginBottom: 10,
  },
  cardSubtitle: {
    fontSize: 10,
    color: colors.accent,
    fontWeight: 700,
    marginBottom: 8,
  },
  cardText: {
    fontSize: 10,
    color: colors.textPrimary,
    lineHeight: 1.6,
    marginBottom: 10,
  },
  // Subsection title
  subsectionTitle: {
    fontSize: 14,
    fontWeight: 700,
    color: colors.accentLight,
    marginTop: 16,
    marginBottom: 10,
  },
  // Paragraph
  paragraph: {
    fontSize: 10,
    color: colors.textPrimary,
    lineHeight: 1.6,
    marginBottom: 12,
  },
  // Grid layouts
  grid2: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 14,
  },
  gridItem: {
    width: '48%',
  },
  // Natal chart
  natalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  natalCard: {
    width: '31%',
    backgroundColor: colors.backgroundLight,
    borderRadius: 10,
    padding: 14,
    alignItems: 'center',
  },
  natalLabel: {
    fontSize: 8,
    color: colors.textSecondary,
    marginBottom: 6,
    textTransform: 'uppercase',
  },
  natalSign: {
    fontSize: 13,
    fontWeight: 700,
    color: colors.textPrimary,
    textAlign: 'center',
  },
  // Traits grid
  traitsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  traitItem: {
    width: '48%',
    backgroundColor: colors.backgroundLight,
    borderRadius: 12,
    padding: 14,
    marginBottom: 12,
    borderLeftWidth: 3,
    borderLeftColor: colors.accent,
  },
  traitName: {
    fontSize: 11,
    fontWeight: 700,
    color: colors.accentLight,
    marginBottom: 4,
  },
  traitDesc: {
    fontSize: 9,
    color: colors.textSecondary,
    lineHeight: 1.4,
  },
  // Forecast grid
  forecastGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  forecastCard: {
    width: '48%',
    backgroundColor: colors.backgroundLight,
    borderRadius: 14,
    padding: 16,
    marginBottom: 14,
  },
  forecastQuarter: {
    fontSize: 12,
    fontWeight: 700,
    color: colors.accent,
    marginBottom: 4,
  },
  forecastTitle: {
    fontSize: 10,
    fontWeight: 700,
    color: colors.accentLight,
    marginBottom: 10,
  },
  forecastLabel: {
    fontSize: 9,
    fontWeight: 700,
    color: colors.accent,
    marginTop: 8,
    marginBottom: 4,
  },
  forecastText: {
    fontSize: 9,
    color: colors.textPrimary,
    lineHeight: 1.5,
  },
  // Compatibility
  compatItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 12,
    backgroundColor: colors.backgroundLight,
    borderRadius: 10,
    marginBottom: 10,
  },
  compatSign: {
    fontSize: 11,
    fontWeight: 700,
    color: colors.textPrimary,
  },
  compatPercent: {
    fontSize: 16,
    fontWeight: 700,
    color: colors.accent,
  },
  compatDesc: {
    fontSize: 9,
    color: colors.textSecondary,
    marginTop: 6,
    lineHeight: 1.4,
  },
  // Lucky grid
  luckyGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  luckyCard: {
    width: '48%',
    backgroundColor: colors.backgroundLight,
    borderRadius: 14,
    padding: 18,
    marginBottom: 14,
    alignItems: 'center',
  },
  luckyTitle: {
    fontSize: 10,
    fontWeight: 700,
    color: colors.accentLight,
    marginBottom: 8,
  },
  luckyValue: {
    fontSize: 14,
    fontWeight: 700,
    color: colors.accent,
    marginBottom: 6,
    textAlign: 'center',
  },
  luckyDesc: {
    fontSize: 9,
    color: colors.textSecondary,
    lineHeight: 1.4,
    textAlign: 'center',
  },
  // Thank you card
  thankYouCard: {
    backgroundColor: colors.accent,
    padding: 32,
    borderRadius: 16,
    alignItems: 'center',
    marginTop: 20,
  },
  thankYouTitle: {
    fontSize: 18,
    fontWeight: 700,
    color: colors.background,
    marginBottom: 10,
  },
  thankYouText: {
    fontSize: 11,
    color: colors.background,
    marginBottom: 6,
    textAlign: 'center',
  },
  thankYouWebsite: {
    fontSize: 12,
    fontWeight: 700,
    color: colors.background,
    marginTop: 12,
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
    borderTopColor: colors.borderAccent,
  },
  footerText: {
    fontSize: 8,
    color: colors.textMuted,
  },
  pageNumber: {
    fontSize: 8,
    color: colors.textMuted,
  },
  // Detailed item
  detailedItem: {
    marginBottom: 12,
  },
  detailedTitle: {
    fontSize: 10,
    fontWeight: 700,
    color: colors.accentLight,
    marginBottom: 4,
  },
  detailedDesc: {
    fontSize: 9,
    color: colors.textSecondary,
    lineHeight: 1.5,
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
  
  return (
    <Page size="A4" style={styles.page}>
      <View style={styles.coverPage}>
        <Text style={styles.coverLogo}>Astroline</Text>
        <Text style={styles.coverTitle}>Астрологічний Звіт</Text>
        <Text style={styles.coverSubtitle}>
          Розширена інтерпретація натальної карти та нумерологічного профілю
        </Text>
        
        <View style={styles.coverInfo}>
          <View style={styles.coverInfoRow}>
            <Text style={styles.coverInfoLabel}>Сонячний знак</Text>
            <Text style={styles.coverInfoValue}>{sunSign.name}</Text>
          </View>
          <View style={styles.coverInfoRow}>
            <Text style={styles.coverInfoLabel}>Місячний знак</Text>
            <Text style={styles.coverInfoValue}>
              {isUnknownSign(moonSign) ? 'Невідомо' : moonSign.name}
            </Text>
          </View>
          <View style={styles.coverInfoRow}>
            <Text style={styles.coverInfoLabel}>Асцендент</Text>
            <Text style={styles.coverInfoValue}>
              {isUnknownSign(risingSign) ? 'Невідомо' : risingSign.name}
            </Text>
          </View>
          <View style={styles.coverInfoRow}>
            <Text style={styles.coverInfoLabel}>Дата народження</Text>
            <Text style={styles.coverInfoValue}>{report.userData.birthDate}</Text>
          </View>
          {report.userData.birthTime && (
            <View style={styles.coverInfoRow}>
              <Text style={styles.coverInfoLabel}>Час народження</Text>
              <Text style={styles.coverInfoValue}>{report.userData.birthTime}</Text>
            </View>
          )}
          {report.userData.birthPlace && (
            <View style={[styles.coverInfoRow, { borderBottomWidth: 0, marginBottom: 0 }]}>
              <Text style={styles.coverInfoLabel}>Місце народження</Text>
              <Text style={styles.coverInfoValue}>{report.userData.birthPlace}</Text>
            </View>
          )}
        </View>
      </View>
      
      <View style={styles.footer}>
        <Text style={styles.footerText}>© 2026 Astroline | astrolog.cards</Text>
      </View>
    </Page>
  );
}

// Natal Chart Page - Extended with multi-paragraph descriptions
function NatalChartPage({ report }: ReportPDFProps) {
  const { sunSign, moonSign, risingSign, sunDescription, sunDescriptionExtended, 
          moonDescription, moonDescriptionExtended, risingDescription, risingDescriptionExtended } = report.natalChart;
  
  return (
    <Page size="A4" style={styles.page}>
      <View style={styles.header}>
        <Text style={styles.logo}>Astroline</Text>
        <Text style={styles.date}>Звіт від {new Date().toLocaleDateString('uk-UA')}</Text>
      </View>
      
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Натальна Карта</Text>
        <View style={styles.divider} />
      </View>
      
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
      
      {/* Sun Sign Description */}
      <Text style={styles.subsectionTitle}>Сонячний знак — {sunSign.name}</Text>
      <Text style={styles.paragraph}>{sunDescription}</Text>
      {sunDescriptionExtended?.map((para, i) => (
        <Text key={i} style={styles.paragraph}>{para}</Text>
      ))}
      
      <View style={styles.footer}>
        <Text style={styles.footerText}>© 2026 Astroline</Text>
        <Text render={({ pageNumber, totalPages }) => `${pageNumber} / ${totalPages}`} style={styles.pageNumber} />
      </View>
    </Page>
  );
}

// Natal Chart Page 2 - Moon and Rising
function NatalChartPage2({ report }: ReportPDFProps) {
  const { moonSign, risingSign, moonDescription, moonDescriptionExtended, 
          risingDescription, risingDescriptionExtended } = report.natalChart;
  
  return (
    <Page size="A4" style={styles.page}>
      <View style={styles.header}>
        <Text style={styles.logo}>Astroline</Text>
        <Text style={styles.date}>Натальна Карта (продовження)</Text>
      </View>
      
      {/* Moon Sign Description */}
      {moonDescription && !isUnknownSign(moonSign) && (
        <>
          <Text style={styles.subsectionTitle}>Місячний знак — {moonSign.name}</Text>
          <Text style={styles.paragraph}>{moonDescription}</Text>
          {moonDescriptionExtended?.map((para, i) => (
            <Text key={i} style={styles.paragraph}>{para}</Text>
          ))}
        </>
      )}
      
      {/* Rising Sign Description */}
      {risingDescription && !isUnknownSign(risingSign) && (
        <>
          <Text style={styles.subsectionTitle}>Асцендент — {risingSign.name}</Text>
          <Text style={styles.paragraph}>{risingDescription}</Text>
          {risingDescriptionExtended?.map((para, i) => (
            <Text key={i} style={styles.paragraph}>{para}</Text>
          ))}
        </>
      )}
      
      <View style={styles.footer}>
        <Text style={styles.footerText}>© 2026 Astroline</Text>
        <Text render={({ pageNumber, totalPages }) => `${pageNumber} / ${totalPages}`} style={styles.pageNumber} />
      </View>
    </Page>
  );
}

// Numerology Page - Extended with subtitles
function NumerologyPage({ report }: ReportPDFProps) {
  if (!report.numerology) return null;
  
  const { lifePathNumber, lifePathSubtitle, lifePathMeaning, lifePathMeaningExtended,
          birthdayNumber, birthdaySubtitle, birthdayMeaning, birthdayMeaningExtended,
          personalYear2026, personalYearSubtitle, personalYearMeaning, personalYearMeaningExtended,
          isMasterNumber } = report.numerology;
  
  return (
    <Page size="A4" style={styles.page}>
      <View style={styles.header}>
        <Text style={styles.logo}>Astroline</Text>
        <Text style={styles.date}>Нумерологія</Text>
      </View>
      
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Нумерологічний Профіль</Text>
        <View style={styles.divider} />
      </View>
      
      {/* Life Path Number */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>
          Число Життєвого Шляху — {lifePathNumber}{isMasterNumber ? ' (Майстер-число)' : ''}
        </Text>
        {lifePathSubtitle && (
          <Text style={styles.cardSubtitle}>{lifePathSubtitle}</Text>
        )}
        <Text style={styles.cardText}>{lifePathMeaning}</Text>
        {lifePathMeaningExtended?.map((para, i) => (
          <Text key={i} style={styles.cardText}>{para}</Text>
        ))}
      </View>
      
      {/* Birthday Number */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Число Дня Народження — {birthdayNumber}</Text>
        {birthdaySubtitle && (
          <Text style={styles.cardSubtitle}>{birthdaySubtitle}</Text>
        )}
        <Text style={styles.cardText}>{birthdayMeaning}</Text>
        {birthdayMeaningExtended?.map((para, i) => (
          <Text key={i} style={styles.cardText}>{para}</Text>
        ))}
      </View>
      
      {/* Personal Year */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Персональний Рік 2026 — {personalYear2026}</Text>
        {personalYearSubtitle && (
          <Text style={styles.cardSubtitle}>{personalYearSubtitle}</Text>
        )}
        <Text style={styles.cardText}>{personalYearMeaning}</Text>
        {personalYearMeaningExtended?.map((para, i) => (
          <Text key={i} style={styles.cardText}>{para}</Text>
        ))}
      </View>
      
      <View style={styles.footer}>
        <Text style={styles.footerText}>© 2026 Astroline</Text>
        <Text render={({ pageNumber, totalPages }) => `${pageNumber} / ${totalPages}`} style={styles.pageNumber} />
      </View>
    </Page>
  );
}

// Personality Page with Hidden Talents
function PersonalityPage({ report }: ReportPDFProps) {
  const traits = report.personality.slice(0, 6);
  const hiddenTalents = report.hiddenTalents || [];
  
  return (
    <Page size="A4" style={styles.page}>
      <View style={styles.header}>
        <Text style={styles.logo}>Astroline</Text>
        <Text style={styles.date}>Особистість</Text>
      </View>
      
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Риси Особистості</Text>
        <View style={styles.divider} />
      </View>
      
      <View style={styles.traitsGrid}>
        {traits.map((trait, index) => (
          <View key={index} style={styles.traitItem}>
            <Text style={styles.traitName}>{trait.title}</Text>
            <Text style={styles.traitDesc}>{trait.description}</Text>
          </View>
        ))}
      </View>
      
      {/* Hidden Talents */}
      {hiddenTalents.length > 0 && (
        <>
          {hiddenTalents.map((talent, index) => (
            <View key={index} style={styles.card}>
              <Text style={styles.cardTitle}>{talent.title}</Text>
              <Text style={styles.cardText}>{talent.description}</Text>
              {talent.extendedDescription && (
                <Text style={styles.cardText}>{talent.extendedDescription}</Text>
              )}
            </View>
          ))}
        </>
      )}
      
      <View style={styles.footer}>
        <Text style={styles.footerText}>© 2026 Astroline</Text>
        <Text render={({ pageNumber, totalPages }) => `${pageNumber} / ${totalPages}`} style={styles.pageNumber} />
      </View>
    </Page>
  );
}

// Forecast Page - Structured with Career/Finance/Relationships
function ForecastPage({ report }: ReportPDFProps) {
  return (
    <Page size="A4" style={styles.page}>
      <View style={styles.header}>
        <Text style={styles.logo}>Astroline</Text>
        <Text style={styles.date}>Прогноз 2026</Text>
      </View>
      
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Прогноз на 2026 рік</Text>
        <View style={styles.divider} />
      </View>
      
      <View style={styles.forecastGrid}>
        {report.forecast2026.map((quarter, index) => (
          <View key={index} style={styles.forecastCard}>
            <Text style={styles.forecastQuarter}>{quarter.quarter}</Text>
            <Text style={styles.forecastTitle}>{quarter.title}</Text>
            
            {quarter.careerForecast && (
              <>
                <Text style={styles.forecastLabel}>Кар'єра:</Text>
                <Text style={styles.forecastText}>{quarter.careerForecast}</Text>
              </>
            )}
            
            {quarter.financeForecast && (
              <>
                <Text style={styles.forecastLabel}>Фінанси:</Text>
                <Text style={styles.forecastText}>{quarter.financeForecast}</Text>
              </>
            )}
            
            {quarter.relationshipsForecast && (
              <>
                <Text style={styles.forecastLabel}>Стосунки:</Text>
                <Text style={styles.forecastText}>{quarter.relationshipsForecast}</Text>
              </>
            )}
            
            {!quarter.careerForecast && quarter.description && (
              <Text style={styles.forecastText}>{quarter.description}</Text>
            )}
          </View>
        ))}
      </View>
      
      <View style={styles.footer}>
        <Text style={styles.footerText}>© 2026 Astroline</Text>
        <Text render={({ pageNumber, totalPages }) => `${pageNumber} / ${totalPages}`} style={styles.pageNumber} />
      </View>
    </Page>
  );
}

// Love Page - Extended with detailed content
function LovePage({ report }: ReportPDFProps) {
  const { love } = report;
  
  return (
    <Page size="A4" style={styles.page}>
      <View style={styles.header}>
        <Text style={styles.logo}>Astroline</Text>
        <Text style={styles.date}>Кохання</Text>
      </View>
      
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Кохання та Стосунки</Text>
        <View style={styles.divider} />
      </View>
      
      {/* Overview */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Огляд</Text>
        <Text style={styles.cardText}>{love.overview}</Text>
        {love.overviewExtended && (
          <Text style={styles.cardText}>{love.overviewExtended}</Text>
        )}
      </View>
      
      {/* Strengths and Challenges Grid */}
      <View style={styles.grid2}>
        <View style={styles.gridItem}>
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Сильні Сторони</Text>
            {love.strengthsDetailed ? (
              love.strengthsDetailed.map((item, i) => (
                <View key={i} style={styles.detailedItem}>
                  <Text style={styles.detailedTitle}>{item.title}</Text>
                  <Text style={styles.detailedDesc}>{item.description}</Text>
                </View>
              ))
            ) : (
              love.strengths.map((s, i) => (
                <Text key={i} style={styles.cardText}>• {s}</Text>
              ))
            )}
          </View>
        </View>
        
        <View style={styles.gridItem}>
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Виклики</Text>
            {love.challengesDetailed ? (
              love.challengesDetailed.map((item, i) => (
                <View key={i} style={styles.detailedItem}>
                  <Text style={styles.detailedTitle}>{item.title}</Text>
                  <Text style={styles.detailedDesc}>{item.description}</Text>
                </View>
              ))
            ) : (
              love.challenges.map((c, i) => (
                <Text key={i} style={styles.cardText}>• {c}</Text>
              ))
            )}
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

// Love Page 2 - Advice and Compatibility
function LovePage2({ report }: ReportPDFProps) {
  const { love } = report;
  
  return (
    <Page size="A4" style={styles.page}>
      <View style={styles.header}>
        <Text style={styles.logo}>Astroline</Text>
        <Text style={styles.date}>Кохання (продовження)</Text>
      </View>
      
      {/* Advice */}
      {love.adviceItems && love.adviceItems.length > 0 && (
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Поради для гармонійних стосунків</Text>
          {love.adviceItems.map((item, i) => (
            <View key={i} style={styles.detailedItem}>
              <Text style={styles.detailedTitle}>{item.title}</Text>
              <Text style={styles.detailedDesc}>{item.description}</Text>
            </View>
          ))}
        </View>
      )}
      
      {/* Compatibility */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Найкраща Сумісність</Text>
        {love.topMatches.slice(0, 3).map((match, i) => (
          <View key={i}>
            <View style={styles.compatItem}>
              <Text style={styles.compatSign}>{match.sign}</Text>
              <Text style={styles.compatPercent}>{match.percentage}%</Text>
            </View>
            {match.whyItWorks && (
              <Text style={styles.compatDesc}>{match.whyItWorks}</Text>
            )}
          </View>
        ))}
      </View>
      
      <View style={styles.footer}>
        <Text style={styles.footerText}>© 2026 Astroline</Text>
        <Text render={({ pageNumber, totalPages }) => `${pageNumber} / ${totalPages}`} style={styles.pageNumber} />
      </View>
    </Page>
  );
}

// Career Page - Extended with detailed content
function CareerPage({ report }: ReportPDFProps) {
  const { career } = report;
  
  return (
    <Page size="A4" style={styles.page}>
      <View style={styles.header}>
        <Text style={styles.logo}>Astroline</Text>
        <Text style={styles.date}>Кар'єра</Text>
      </View>
      
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Кар'єра та Фінанси</Text>
        <View style={styles.divider} />
      </View>
      
      {/* Professional Strengths */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Професійні Сильні Сторони</Text>
        {career.strengthsDetailed ? (
          career.strengthsDetailed.map((item, i) => (
            <View key={i} style={styles.detailedItem}>
              <Text style={styles.detailedTitle}>{item.title}</Text>
              <Text style={styles.detailedDesc}>{item.description}</Text>
            </View>
          ))
        ) : (
          career.strengths.map((s, i) => (
            <Text key={i} style={styles.cardText}>• {s}</Text>
          ))
        )}
      </View>
      
      {/* Ideal Careers */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Ідеальні Кар'єрні Напрямки</Text>
        {career.idealCareersDetailed ? (
          career.idealCareersDetailed.map((item, i) => (
            <View key={i} style={styles.detailedItem}>
              <Text style={styles.detailedTitle}>{item.title}</Text>
              <Text style={styles.detailedDesc}>{item.description}</Text>
            </View>
          ))
        ) : (
          career.idealCareers.map((c, i) => (
            <Text key={i} style={styles.cardText}>• {c}</Text>
          ))
        )}
      </View>
      
      <View style={styles.footer}>
        <Text style={styles.footerText}>© 2026 Astroline</Text>
        <Text render={({ pageNumber, totalPages }) => `${pageNumber} / ${totalPages}`} style={styles.pageNumber} />
      </View>
    </Page>
  );
}

// Career Page 2 - Financial Strategies and Focus
function CareerPage2({ report }: ReportPDFProps) {
  const { career } = report;
  
  return (
    <Page size="A4" style={styles.page}>
      <View style={styles.header}>
        <Text style={styles.logo}>Astroline</Text>
        <Text style={styles.date}>Кар'єра (продовження)</Text>
      </View>
      
      {/* Financial Strategies */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Фінансові Стратегії</Text>
        {career.financeTipsDetailed ? (
          career.financeTipsDetailed.map((item, i) => (
            <View key={i} style={styles.detailedItem}>
              <Text style={styles.detailedTitle}>{item.title}</Text>
              <Text style={styles.detailedDesc}>{item.description}</Text>
            </View>
          ))
        ) : (
          career.financeTips.map((t, i) => (
            <Text key={i} style={styles.cardText}>• {t}</Text>
          ))
        )}
      </View>
      
      {/* Year Focus */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Фокус на 2026 Рік</Text>
        {career.yearFocusItems ? (
          career.yearFocusItems.map((item, i) => (
            <View key={i} style={styles.detailedItem}>
              <Text style={styles.detailedTitle}>{item.title}</Text>
              <Text style={styles.detailedDesc}>{item.description}</Text>
            </View>
          ))
        ) : (
          <Text style={styles.cardText}>{career.yearFocus}</Text>
        )}
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
        <Text style={styles.logo}>Astroline</Text>
        <Text style={styles.date}>Щасливі атрибути</Text>
      </View>
      
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Щасливі Атрибути</Text>
        <View style={styles.divider} />
      </View>
      
      <View style={styles.luckyGrid}>
        <View style={styles.luckyCard}>
          <Text style={styles.luckyTitle}>Щасливі Числа</Text>
          <Text style={styles.luckyValue}>{lucky.numbers.join(', ')}</Text>
          {lucky.numbersExplanation && (
            <Text style={styles.luckyDesc}>{lucky.numbersExplanation}</Text>
          )}
        </View>
        
        <View style={styles.luckyCard}>
          <Text style={styles.luckyTitle}>Щасливі Дні</Text>
          <Text style={styles.luckyValue}>{lucky.days.join(', ')}</Text>
          {lucky.daysExplanation && (
            <Text style={styles.luckyDesc}>{lucky.daysExplanation}</Text>
          )}
        </View>
        
        <View style={styles.luckyCard}>
          <Text style={styles.luckyTitle}>Щасливі Кольори</Text>
          <Text style={styles.luckyValue}>{lucky.colors.join(', ')}</Text>
          {lucky.colorsExplanation && (
            <Text style={styles.luckyDesc}>{lucky.colorsExplanation}</Text>
          )}
        </View>
        
        <View style={styles.luckyCard}>
          <Text style={styles.luckyTitle}>Щасливі Камені</Text>
          <Text style={styles.luckyValue}>{lucky.gems.join(', ')}</Text>
          {lucky.gemsExplanation && (
            <Text style={styles.luckyDesc}>{lucky.gemsExplanation}</Text>
          )}
        </View>
      </View>
      
      {/* Direction */}
      <View style={[styles.luckyCard, { width: '100%' }]}>
        <Text style={styles.luckyTitle}>Щасливий Напрямок</Text>
        <Text style={styles.luckyValue}>{lucky.direction}</Text>
        {lucky.directionExplanation && (
          <Text style={styles.luckyDesc}>{lucky.directionExplanation}</Text>
        )}
      </View>
      
      {/* Thank You */}
      <View style={styles.thankYouCard}>
        <Text style={styles.thankYouTitle}>Дякуємо за довіру!</Text>
        <Text style={styles.thankYouText}>
          Цей звіт згенеровано спеціально для вас командою Astroline.
        </Text>
        <Text style={styles.thankYouText}>
          Бажаємо вам успіхів, росту та гармонії у 2026 році!
        </Text>
        <Text style={styles.thankYouWebsite}>astrolog.cards</Text>
        <Text style={[styles.thankYouText, { marginTop: 10, fontSize: 9 }]}>
          © 2026 Astroline
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
  const hasMoonOrRising = !isUnknownSign(report.natalChart.moonSign) || !isUnknownSign(report.natalChart.risingSign);
  const hasDetailedLove = report.love.adviceItems && report.love.adviceItems.length > 0;
  const hasDetailedCareer = report.career.financeTipsDetailed && report.career.financeTipsDetailed.length > 0;
  
  return (
    <Document
      title={`Астрологічний Звіт - ${report.natalChart.sunSign.name}`}
      author="Astroline"
      subject="Персональний астрологічний звіт"
      creator="astrolog.cards"
    >
      <CoverPage report={report} />
      <NatalChartPage report={report} />
      {hasMoonOrRising && <NatalChartPage2 report={report} />}
      {report.numerology && <NumerologyPage report={report} />}
      <PersonalityPage report={report} />
      <ForecastPage report={report} />
      <LovePage report={report} />
      {hasDetailedLove && <LovePage2 report={report} />}
      <CareerPage report={report} />
      {hasDetailedCareer && <CareerPage2 report={report} />}
      <LuckyPage report={report} />
    </Document>
  );
}

export default ReportPDF;
