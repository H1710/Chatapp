export interface IUserLogin {
  email: string;
  password: string;
}

export interface IUserRegiter {
  email: string;
  password: string;
  confirmPassword: string;
  OTPCode: string;
  firstname: string;
  lastname: string;
}

export type FirstStepRegister = Pick<
  IUserRegiter,
  'email' | 'password' | 'confirmPassword'
>;

export type SubmitOTPRegister = Pick<IUserRegiter, 'OTPCode' | 'email'>;

export type InfoUserRegister = Pick<IUserRegiter, 'firstname' | 'lastname'>;
