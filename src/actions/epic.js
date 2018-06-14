import { FETCHING_DATA } from './types';
import { getDataSuccess, getDataFailure } from './creators/SubscriberActions';
import getPeople from '../api'

import 'rxjs'
import { Observable } from 'rxjs/Observable'

const fetchUserEpic = action$ =>
  action$.ofType(FETCHING_DATA)
    .mergeMap(action =>
      Observable.fromPromise(getPeople())
        .map(response => getDataSuccess(response))
        .catch(error => Observable.of(getDataFailure(error)))
      )

export default fetchUserEpic