import EmailValidator from 'email-validator';

  /*
    Takes a @suggestions array and the user @input string and give the 3 best suggestions
    regarding the current input
  */
export function filterSuggestions(suggestions, input) {
  //if the input is a valid email address, no suggestion should be displayed
  if (EmailValidator.validate(input)) {
      return [];
  }
  // if the input contains the character "@", the 3 best matches should be displayed
  if (input && input.includes('@')) {
    const providers = suggestions
    .filter(p => p.startsWith(input.split('@')[1]))
    .slice(0, 3);
    if (providers.length !== 0) {
      return providers
    }
  }
  // if the input doesn't contain the character "@", the 3 most popular providers should be displayed
  return suggestions.slice(0, 3);
}


  /*
    Apply a @provider string to the end of the @input string (after the '@' character) to form the
    chosen email address.
  */
export function applyProvider(input, provider) {
    if (input) {
        if (input.includes('@')) {
            return input.split('@')[0] + '@' + provider;
        }
        return input + '@' + provider;
    }
}
