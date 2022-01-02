export class Alert {
  id: string | undefined;
  message: string;
  autoClose: boolean;

  constructor(id: string | undefined, message: string, autoClose: boolean) {
    this.id = id;
    this.message = message;
    this.autoClose = autoClose;
  }
}
