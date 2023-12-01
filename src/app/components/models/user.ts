
export class User {

    constructor(
        public id: number,
        public name: string,
        public email: string,
        public password: string,
        public password_repeat: string,
        public key_role: number,
        public telefono: string,
        public card: string,
        public fecha_vencimiento: string,
        public cvv: string,


    ) { }

}

