import { auto_color } from 'common/utils';

const generateGraphs = () => {
  const graphs = [];
  const hosts = {
    search_aviasales:  'web',
    iphone_aviasales:  'iPhone',
    ipad_aviasales:    'iPad',
    android_aviasales: 'Android',
    m_aviasales:       'mobile',
    wl_aviasales:      'Other',
  };

  let i = 0;
  for (const host in hosts) {
    graphs.push({
      valueAxis:                   'percent',
      id:                          `${host}_str`,
      bullet:                      'round',
      bulletBorderAlpha:           1,
      bulletColor:                 auto_color(6, i),
      bulletSize:                  5,
      hideBulletsCount:            50,
      lineThickness:               2,
      title:                       `STR: ${hosts[host]}`,
      useLineColorForBulletBorder: true,
      valueField:                  `${host}_str`,
      lineColor:                   auto_color(6, i),
    });
    i += 1;
  }

  return graphs;
};


export const getOptionsChart = () => {
  return {
    type:           'serial',
    theme:          'none',
    pathToImages:   '//www.amcharts.com/lib/3/images/',
    dataDateFormat: 'YYYY-MM-DD',
    legend:         {
      useGraphSettings: true,
      align:            'center',
      valueWidth:       90,
    },
    valueAxes:      [{
      id:        'percent',
      axisAlpha: 0,
      position:  'right',
    }],
    graphs:         generateGraphs(),
    chartScrollbar: {
      graph:           'search_aviasales_str',
      scrollbarHeight: 30,
    },
    chartCursor:    {
      categoryBalloonDateFormat: 'MMM DD',
      cursorPosition:            'mouse',
      pan:                       true,
      valueLineEnabled:          false,
      valueLineBalloonEnabled:   true,
    },
    categoryField:  'date',
    categoryAxis:   {
      parseDates:       true,
      dashLength:       1,
      minorGridEnabled: true,
      position:         'top',
      minPeriod:        'DD',
    },
  };
};
