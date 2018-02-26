export class Empresa {

    public $key: string;

    constructor(
        public sigla: string,
        public nome: string,
        public descricao: string,
        public id: string,
    ) {}

}
