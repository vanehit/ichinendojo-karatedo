export class ContactMessage {
    name;
    email;
    message;
    date;
    constructor(name, email, message, date = new Date()) {
        this.name = name;
        this.email = email;
        this.message = message;
        this.date = date;
    }
}
