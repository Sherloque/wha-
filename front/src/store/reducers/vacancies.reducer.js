const initialState = {
    vacancies: {},
    recruitersVacancies:{}
  }
  
  function vacanciesRedcuer(state = initialState, action) {
    switch (action.type) {
      case 'GET_VACANCIES':
        return { ...state, vacancies: action.payload };
      case 'GET_RECRUITERS_VACANCIES':
        return { ...state, recruitersVacancies: action.payload }; 
      default:
        return state;
    }
  }
  
  export default vacanciesRedcuer;