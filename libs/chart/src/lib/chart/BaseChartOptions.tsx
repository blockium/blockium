import { useTranslation } from 'react-i18next';
// material
import { useTheme } from '@mui/material/styles';
// chart
import { ApexOptions } from 'apexcharts';
// blockium
import { useColorMode } from '@blockium/theme';
import { fDecimal, fNumber } from '@blockium/utils';

// i18n
// Current supported languages
import en from 'apexcharts/dist/locales/en.json';
import ptBR from 'apexcharts/dist/locales/pt-br.json';
const locales = {
  en: 'en',
  'pt-BR': 'pt-br',
  // Add new locales here, using the i18next.language as the key
};
type LocaleKey = keyof typeof locales;

export const BaseChartOptions = () => {
  const theme = useTheme();
  const colorMode = useColorMode();
  const { t, i18n } = useTranslation();
  // I18n
  const locale = locales[i18n.language as LocaleKey];

  const LABEL_TOTAL = {
    show: true,
    label: t('ui:chart.total'),
    color: theme.palette.text.primary,
    ...theme.typography.subtitle2,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    formatter: (w: any) => {
      const total = w.globals.seriesTotals.reduce((a: number, b: number) => {
        return a + b;
      }, 0);
      return fDecimal(total / w.globals.series.length, 1) + '%';
    },
  };

  const LABEL_VALUE = {
    offsetY: 8,
    color: theme.palette.text.primary,
    ...theme.typography.h3,
    formatter: (value: string | number) => {
      const val = typeof value === 'string' ? Number.parseFloat(value) : value;
      return fNumber(val) + '%';
    },
  };

  const options: ApexOptions = {
    theme: {
      mode: colorMode.mode,
    },

    // Colors
    colors: [
      theme.palette.primary.main,
      theme.palette.chart.yellow[0],
      theme.palette.chart.blue[0],
      theme.palette.chart.violet[0],
      theme.palette.chart.green[0],
      theme.palette.chart.red[0],
    ],

    // Chart
    chart: {
      toolbar: { show: false },
      zoom: { enabled: false },
      // animations: { enabled: false },
      foreColor: theme.palette.text.disabled,
      fontFamily: theme.typography.fontFamily,
      background: theme.palette.background.paper,
      // localization
      locales: [en, ptBR],
      defaultLocale: locale,
    },

    // States
    states: {
      hover: {
        filter: {
          type: 'lighten',
          value: 0.04,
        },
      },
      active: {
        filter: {
          type: 'darken',
          value: 0.88,
        },
      },
    },

    // Fill
    fill: {
      opacity: 1,
      gradient: {
        type: 'vertical',
        shadeIntensity: 0,
        opacityFrom: 0.4,
        opacityTo: 0,
        stops: [0, 100],
      },
    },

    // Datalabels
    dataLabels: LABEL_VALUE,

    // Stroke
    stroke: {
      width: 3,
      curve: 'smooth',
      lineCap: 'round',
    },

    // Grid
    grid: {
      strokeDashArray: 3,
      borderColor: theme.palette.divider,
    },

    // Xaxis
    xaxis: {
      axisBorder: { show: false },
      axisTicks: { show: false },
    },

    // Markers
    markers: {
      size: 0,
      strokeColors: theme.palette.background.paper,
    },

    // Tooltip
    tooltip: {
      x: {
        show: false,
      },
    },

    // Legend
    legend: {
      show: true,
      // floating: true,
      fontSize: '13',
      position: 'bottom',
      horizontalAlign: 'center',
      markers: {
        radius: 12,
      },
      fontWeight: 500,
      itemMargin: { horizontal: 12 },
      labels: {
        colors: theme.palette.text.primary,
      },
    },

    // plotOptions
    plotOptions: {
      // Bar
      bar: {
        columnWidth: '28%',
        borderRadius: 4,
      },
      // Pie + Donut
      pie: {
        donut: {
          labels: {
            show: true,
            value: LABEL_VALUE,
            total: LABEL_TOTAL,
          },
        },
      },
      // Radialbar
      radialBar: {
        track: {
          strokeWidth: '100%',
          background: theme.palette.grey[500_16],
        },
        dataLabels: {
          value: LABEL_VALUE,
          total: LABEL_TOTAL,
        },
      },
      // Radar
      radar: {
        polygons: {
          fill: { colors: ['transparent'] },
          strokeColors: theme.palette.divider,
          connectorColors: theme.palette.divider,
        },
      },
      // polarArea
      polarArea: {
        rings: {
          strokeColor: theme.palette.divider,
        },
        spokes: {
          connectorColors: theme.palette.divider,
        },
      },
    },

    // Responsive
    responsive: [
      {
        // sm
        breakpoint: theme.breakpoints.values.sm,
        options: {
          plotOptions: { bar: { columnWidth: '40%' } },
        },
      },
      {
        // md
        breakpoint: theme.breakpoints.values.md,
        options: {
          plotOptions: { bar: { columnWidth: '32%' } },
        },
      },
    ],
  };

  return options;
};
