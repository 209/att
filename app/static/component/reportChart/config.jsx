export default {
  pathToImages:   'build/amcharts/images/',
  type:           'serial',
  categoryField:  'date',
  dataDateFormat: 'YYYY-MM-DD HH',
  theme:          'default',
  categoryAxis:   {
    minPeriod:  'hh',
    parseDates: true,
  },
  chartCursor:    {
    enabled:                   true,
    categoryBalloonDateFormat: 'JJ:NN',
  },
  chartScrollbar: {
    enabled: false,
  },
  trendLines:     [],
  graphs:         [
    {
      bullet:     'round',
      id:         'AmGraph-1',
      title:      'Searches',
      valueField: 'searches',
    },
    {
      bullet:     'round',
      id:         'AmGraph-2',
      title:      'Clicks',
      valueField: 'clicks',
    },
  ],
  guides:         [],
  valueAxes:      [
    {
      id:    'ValueAxis-1',
      title: 'Axis title',
    },
  ],
  allLabels:      [],
  balloon:        {},
  legend:         {
    enabled:          true,
    useGraphSettings: true,
  },
  titles:         [
    {
      id:   'Title-1',
      size: 15,
      text: 'Chart Title',
    },
  ],
};
