export class TicketForm {
    constructor(
        public price: string,
        public type: string,
        public number: string,
        public flightId:string,
        public origin: string,
        public destination: string,
        public departureDate: string,
        public departureTime: string,
        public image:string
    ) { }
}