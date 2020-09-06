import { createSelector } from 'reselect';
import { INITIAL_STATE } from './reducer';

/**
 * Direct selector to the welcome state domain
 */

const selecHome = (state) => state.welcome || INITIAL_STATE;

const makeSelectHome = () => createSelector(selecHome, (substate) => substate);

export default makeSelectHome;
export { selecHome };
