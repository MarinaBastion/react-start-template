export type ProfileGetResponse = {
    id: string;
    name: string;
    email: string;
    signUpDate: Date;
    commandId: string;
  };
  export type ProfileResponse = {
   profile: ProfileGetResponse,
   token: string
  };