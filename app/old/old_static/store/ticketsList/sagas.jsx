import { put, takeLatest, all } from 'redux-saga/effects';
import {
  getTicketsApi as fetchTicketsApi,
  getTicketsLocal as localTickets,
} from 'api/statistics';
import * as actionTypes from './actionTypes';
import * as actions from './actions';

function* fetchTickets() {
  try {
    return yield fetchTicketsApi();
  } catch (e) {
    return yield localTickets();
  }
}

function* getTickets() {
  const tickets = yield fetchTickets();

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
}

export default function* entitiesSaga() {
  yield all([
    takeLatest(actionTypes.FETCH_TICKETS_REQUEST, getTickets),
  ]);
}
