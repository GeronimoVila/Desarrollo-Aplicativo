export class ForbiddenError extends Error {
    constructor(message) {
        super(message);  // Llama al constructor de la clase Error
        this.name = "ForbiddenError";  // Define el nombre del error personalizado
    }
}