//Aplicación que envia correos  
interface Emailer {
    send(): void; //método
}

class EmailProvider implements Emailer {
    //implementa la interfaz y el método
    public send(): void {
        console.log("Enviando email del EmailProvider"); //ésta es la implementación
    }
}

class EmailProvider2 {
    public sendMail(): void {
        console.log("Enviando email del EmailProvider2");
    }
}
 
class EmailProvider2Adapter implements Emailer{
    constructor(
        private emailProvider: EmailProvider2
    ) {}

    public send(): void {
        this.emailProvider.sendMail();
    }
}

function sendEmail (emailer: Emailer) {
}

//Acá se hace la adaptación
const emailer = new EmailProvider2Adapter(new EmailProvider2());

sendEmail(emailer);