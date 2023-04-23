function IdValidator(fieldValue, validationRules) {
  function idValidation(fieldValue) {
    return fieldValue.length === 36;
  }

  function isRequired(fieldValue) {
    return fieldValue.trim() !== "";
  }

  let fieldIsValid = true;

  for (let rule in validationRules) {
    switch (rule) {
      case "idValidation":
        fieldIsValid = fieldIsValid && idValidation(fieldValue);
        break;

      case "isRequired":
        fieldIsValid = fieldIsValid && isRequired(fieldValue);
        break;

      default:
        fieldIsValid = true;
    }
  }

  return fieldIsValid;
}
export default IdValidator;
