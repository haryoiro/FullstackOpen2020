import noteService from './services/notes'
import noteReducer, { initializeNotes } from './reducers/noteReducer'
import filterReducer from './reducers/filterReducer'

import {
  createStore,
  combineReducers,
  applyMiddleware,
} from 'redux'
import thunk from 'redux-thunk'
import {
  composeWithDevTools
} from 'redux-devtools-extension'


const reducer = combineReducers({
  notes: noteReducer,
  filter: filterReducer,
})

// thunkはredux-middlewareであり、storeとともに初期化する必要がある。
const store = createStore(
  reducer,
  composeWithDevTools(
    applyMiddleware(thunk)
  )
)

noteService.getAll().then((notes) =>
  store.dispatch(initializeNotes(notes))
)

export default store