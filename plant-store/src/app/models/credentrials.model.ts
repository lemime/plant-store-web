export class Credentials {
  login: string;
  password: string;
}

export class RegisterCredentials extends Credentials {
  confirmPassword: string;
}

export class ActivationCredentials {
  login: string;
  activationCode: string;
}

export class UserAuth {
  token: string;
}
