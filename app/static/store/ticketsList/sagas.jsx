import { put, call, takeLatest, all } from 'redux-saga/effects';
import { delay } from 'redux-saga';
import { getTickets as getTicketsApi } from 'api/tickets';
import * as actionTypes from './actionTypes';
import * as actions from './actions';

function* getTickets() {
  try {
    const tickets = yield getTicketsApi();

    const ticketsList = tickets.map((item, index) => ({
      origin:          item.origin,
      originName:      item.origin_name,
      destination:     item.destination,
      destinationName: item.destination_name,
      departureDate:   item.departure_date,
      departureTime:   item.departure_time,
      arrivalDate:     item.arrival_date,
      arrivalTime:     item.arrival_time,
      carrier:         item.carrier,
      stops:           item.stops,
      price:           item.price,
      uid:             index,
    }));

    yield put(actions.fetchTicketsSuccess(ticketsList));
  } catch (err) {
    yield put(actions.fetchTicketsFailure());
    return {};
  }
}

function* replyGetPockemones() {
  yield delay(5000);
  yield call(getTickets);
}


export default function* entitiesSaga() {
  yield all([
    takeLatest(actionTypes.FETCH_TICKETS_REQUEST, getTickets),
    takeLatest(actionTypes.FETCH_TICKETS_FAILURE, replyGetPockemones),
  ]);
}
