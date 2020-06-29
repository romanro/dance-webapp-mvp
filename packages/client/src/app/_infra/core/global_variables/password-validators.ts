import { Validators } from '@angular/forms';

import { RegisterValidators } from '../validators';

export const PASSWORD_VALIDATORS = [
  Validators.required,
  // RegisterValidators.patternValidator(/\d/, { hasNumber: true }),
  // RegisterValidators.patternValidator(/[A-Z]/, { hasCapitalCase: true }),
  // RegisterValidators.patternValidator(/[a-z]/, { hasSmallCase: true }),
  // RegisterValidators.patternValidator(/[ !@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/, { hasSpecialCharacters: true }),
  Validators.minLength(8)
]
