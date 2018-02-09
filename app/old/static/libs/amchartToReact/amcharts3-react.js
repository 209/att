(function () {
  function getType(x) {
    // TODO make this faster ?
    return {}.toString.call(x);
  }

  function hasOwnKey(obj, key) {
    return {}.hasOwnProperty.call(obj, key);
  }


  function copyObject(x) {
    const output = {};

    // TODO use Object.keys ?
    for (const key in x) {
      if (hasOwnKey(x, key)) {
        output[key] = copy(x[key]);
      }
    }

    return output;
  }

  function copyArray(x) {
    const length = x.length;

    const output = new Array(length);

    for (let i = 0; i < length; ++i) {
      output[i] = copy(x[i]);
    }

    return output;
  }

  // TODO can this be made faster ?
  // TODO what about regexps, etc. ?
  function copy(x) {
    switch (getType(x)) {
      case '[object Array]':
        return copyArray(x);

      case '[object Object]':
        return copyObject(x);

      // TODO is this necessary ?
      case '[object Date]':
        return new Date(x.getTime());

      default:
        return x;
    }
  }


  function isNaN(x) {
    return x !== x;
  }

  function isNumberEqual(x, y) {
    return x === y || (isNaN(x) && isNaN(y));
  }


  function removeChartListeners(chart, x, y) {
    if (x !== y) {
      // TODO is this necessary ?
      if (x == null) {
        x = [];
      }

      // TODO is this necessary ?
      if (y == null) {
        y = [];
      }

      const xLength = x.length;
      const yLength = y.length;

      for (let i = 0; i < xLength; ++i) {
        const xValue = x[i];

        let has = false;

        // TODO make this faster ?
        for (let j = 0; j < yLength; ++j) {
          const yValue = y[j];

          // TODO is this correct ?
          if (xValue.event === yValue.event &&
            xValue.method === yValue.method) {
            has = true;
            break;
          }
        }

        if (!has) {
          // TODO is this correct ?
          chart.removeListener(chart, xValue.event, xValue.method);
        }
      }
    }
  }


  function updateArray(a, x, y) {
    let didUpdate = false;

    if (x !== y) {
      const xLength = x.length;
      const yLength = y.length;

      if (xLength !== yLength) {
        a.length = yLength;
        didUpdate = true;
      }

      for (let i = 0; i < yLength; ++i) {
        if (i < xLength) {
          if (update(a, i, x[i], y[i])) {
            didUpdate = true;
          }
        } else {
          // TODO make this faster ?
          a[i] = copy(y[i]);
          // TODO is this necessary ?
          didUpdate = true;
        }
      }
    }

    return didUpdate;
  }


  function update(obj, key, x, y) {
    let didUpdate = false;

    if (x !== y) {
      // https://github.com/amcharts/amcharts3-react/issues/40
      if (hasOwnKey(obj, key)) {
        const xType = getType(x);
        const yType = getType(y);

        if (xType === yType) {
          switch (xType) {
            case '[object Array]':
              // TODO hacky, remove this after the following bug is fixed:
              //      Zendesk #28040
              //      https://codepen.io/team/amcharts/pen/0d61f559cda74682c0ca55d9a24a0f77
              //      https://www.amcharts.com/kbase/forcing-grouping-stock-chart-data-specific-periods/
              if (key === 'groupToPeriods') {
                // TODO is the copy necessary ?
                obj[key] = copy(y);
                didUpdate = true;
              } else if (updateArray(obj[key], x, y)) {
                didUpdate = true;
              }
              break;

            case '[object Object]':
              if (updateObject(obj[key], x, y)) {
                didUpdate = true;
              }
              break;

            case '[object Date]':
              if (x.getTime() !== y.getTime()) {
                // TODO make this faster ?
                obj[key] = copy(y);
                didUpdate = true;
              }
              break;

            case '[object Number]':
              if (!isNumberEqual(x, y)) {
                // TODO is the copy necessary ?
                obj[key] = copy(y);
                didUpdate = true;
              }
              break;

            default:
              // TODO is the copy necessary ?
              obj[key] = copy(y);
              didUpdate = true;
              break;
          }

          // TODO is this correct ?
        } else {
          // TODO make this faster ?
          obj[key] = copy(y);
          didUpdate = true;
        }
      }
    }

    return didUpdate;
  }

  function updateObject(chart, oldObj, newObj) {
    let didUpdate = false;

    if (oldObj !== newObj) {
      // TODO use Object.keys ?
      for (var key in newObj) {
        if (hasOwnKey(newObj, key)) {
          // TODO make this faster ?
          if (hasOwnKey(oldObj, key)) {
            // TODO should this count as an update ?
            if (key === 'listeners') {
              // TODO make this faster ?
              removeChartListeners(chart, oldObj[key], newObj[key]);
            }

            if (update(chart, key, oldObj[key], newObj[key])) {
              didUpdate = true;
            }
          } else {
            // TODO make this faster ?
            chart[key] = copy(newObj[key]);
            didUpdate = true;
          }
        }
      }

      // TODO use Object.keys ?
      for (var key in oldObj) {
        if (hasOwnKey(oldObj, key) && !hasOwnKey(newObj, key)) {
          if (key === 'listeners') {
            removeChartListeners(chart, oldObj[key], []);
          }

          delete chart[key];
          didUpdate = true;
        }
      }
    }

    return didUpdate;
  }


  let id = 0;

  AmCharts.React = createReactClass({
    getInitialState() {
      return {
        id:    `__AmCharts_React_${++id}__`,
        chart: null,
      };
    },

    componentDidMount() {
      // AmCharts mutates the config object, so we have to make a deep copy to prevent that
      const props = copy(this.props.options);

      const chart = AmCharts.makeChart(this.state.id, props, this.props.delay);

      this.setState({
        chart,
      });
    },

    shouldComponentUpdate(nextProps) {
      if (this.state.chart) {
        return updateObject(this.state.chart, this.props.options, nextProps.options);
      }

      return true;
    },

    componentWillUpdate() {
      if (this.state.chart) {
        this.state.chart.validateNow(true);
        this.state.chart.validateData();
      }
    },

    componentWillUnmount() {
      if (this.state.chart) {
        this.state.chart.clear();
      }
    },

    render() {
      return React.createElement('div', {
        id:    this.state.id,
        style: this.props.style,
      });
    },
  });
}());
