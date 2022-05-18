const initialState = {
  FormValues: null,
  isDeployed: false,
  description: "",
};

export function FormReducers(state = initialState, action) {
  switch (action.type) {
    case "FORM_VALUES":
      return { ...state.FormValues, FormValues: action.payload };

    default:
      return state;
  }
}
