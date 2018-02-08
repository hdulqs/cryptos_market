import axios from 'axios'


export const show_create_alarm_modal = (bool) => {
  return {
    type: 'SHOW_CREATE_ALARM_MODAL',
    payload: bool
  }
}
export const user_alarms_fetched = (alarms) => {
  return {
    type: 'USER_ALARMS_FETCHED',
    payload: alarms
  }
}
export const alarm_created = (alarm) => {
  return {
    type: 'ALARM_CREATED',
    payload: alarm
  }
}
export const add_alarm_error = (error) => {
  return {
    type: 'CREATE_ALARM_ERROR',
    payload: error
  }
}
export const toggled_alarm = (alarm) => {
  return {
    type: 'TOGGLED_ALARM',
    payload: alarm
  }
}

export const destroyed_alarm = (alarm) => {
  return {
    type: 'DESTROYED_ALARM',
    payload: alarm
  }
}


export const set_show_create_alarm_modal = (bool) => {
  return (dispatch) => {
    dispatch(show_create_alarm_modal(bool))
  }
}

export const fetch_user_alarms = (jwt_token) => {
  return (dispatch) => {
    axios.get('/api/v1/private/alarms', {headers: {Authorization: jwt_token, responseType: 'json'}})
      .then((response) => {
        dispatch(user_alarms_fetched({alarms: response.data.data.alarms}))
      })
      .catch((error) => {
        console.log(error)
      })
  }
}


export const post_create_alarm = (payload) => {
  return (dispatch) => {
    axios.post('/api/v1/private/alarms', payload, {headers: {Authorization: localStorage.jwt, responseType: 'json'}})
      .then((response) => {
        console.log(response.data)
        dispatch(alarm_created(response.data))
        dispatch(show_create_alarm_modal(false))
      })
      .catch((error) => {
        if(error.response.status === 422){
          dispatch(add_alarm_error({errors: error.response.data.error}))
          //reset_local_storage_session()
        }
        console.log(error)
      })
  }
}

export const toggle_alarm_activation = (payload) => {
  return (dispatch) => {
    axios.patch('/api/v1/private/alarms/toggle_activation', {symbol: payload}, {headers: {Authorization: localStorage.jwt, responseType: 'json'}})
      .then((response) => {
        console.log(response.data)
        dispatch(toggled_alarm(response.data))
      })
      .catch((error) => {
        if(error.response.status === 422){
          //dispatch(add_asset_error({errors: error.response.data.error}))
          //reset_local_storage_session()
        }
        console.log(error)
      })
  }
}

export const destroy_alarm = (payload) => {
  return (dispatch) => {
    axios.patch('/api/v1/private/alarms/destroy_alarm', {symbol: payload}, {headers: {Authorization: localStorage.jwt, responseType: 'json'}})
      .then((response) => {
        console.log(response.data)
        dispatch(destroyed_alarm({asset_symbol: payload}))
      })
      .catch((error) => {
        if(error.response.status === 422){
          //dispatch(add_asset_error({errors: error.response.data.error}))
          //reset_local_storage_session()
        }
        console.log(error)
      })
  }
}




export const set_create_alarm_error = (errors) => {
  return (dispatch) => {
    dispatch(add_alarm_error({errors: errors}))
  }
}
