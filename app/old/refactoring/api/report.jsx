import jQuery from 'jquery';
import mamka from 'mamka';
import { SERVER_URL } from '../constants';
import { transitionTo } from 'common/utils';

export const requestPrepareReport = (data, context) => {
  return new Promise((resolve, reject) => {
    jQuery.ajax({
      url:        `${SERVER_URL}/hosts`,
      data,
      context,
      type:       'POST',
      dataType:   'json',
      timeout:    10000,
      beforeSend: request => {
        mamka('send_event', { name: 'hosts_resolution_change', meta: { data } });
        request.setRequestHeader('Authorization', `Bearer ${window.localStorage.getItem('token')}`);
      },
      success:    ({ result }) => {
        resolve(result);
      },
      error:      jqXHR => {
        (new Image()).src = `//metrics.aviasales.ru/?goal=BACKOFFICE_FAILED_REQUEST_HOSTS_ORDER_REPORT&rand=${Math.random()}`;

        const error = () => {
          reject(new Error({
            message: 'Could not order report. Please try again.'
          }));
        }

        try {
          if (JSON.parse(jqXHR.responseText).description === 'Token is expired') {
            transitionTo('/login');
          } else {
            error()
          }
        } catch (e) {
          error();
        }

      },
    });
  });
};
