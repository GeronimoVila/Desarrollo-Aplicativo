const urlBase = 'http://localhost:4000/api';

export class Api {
    static defaultHeaders = {
        'Content-Type': 'application/json'
    };

    static setMessageForAutoCheck = null;

    static async fetch(service, options) {
        options = { headers: {}, ...options };
        options.headers = { ...Api.defaultHeaders, ...options.headers };

        if (options.body && typeof options.body !== 'string') {
            options.body = JSON.stringify(options.body);
        }

        let url = `${urlBase}/${service}`;

        if (options.search) {
            let search = options.search;
            if (typeof search !== 'string') {
                search = new URLSearchParams(search).toString();
            }
            url += '?' + search;
        }

        try {
            console.log('Fetching URL:', url); // Log de la URL
            console.log('Options:', options); // Log de las opciones

            const res = await fetch(url, options);
            
            if (res.ok) {
                return res.json(); // Retornar JSON directamente si la respuesta es exitosa
            }

            let message = '';
            try {
                const data = await res.json();
                message = data.message || data.error;
            } catch (e) {
                message = 'Error desconocido al parsear la respuesta';
            }

            if (Api.setMessageForAutoCheck) {
                Api.setMessageForAutoCheck(message);
            }

            throw new Error(message);
        } catch (error) {
            console.error('Error en fetch:', error); // Log de error
            throw new Error('Error en la petición: ' + error.message);
        }
    }

    static get(service, options) {
        return Api.fetch(service, { ...options, method: 'GET' });
    }

    static post(service, options) {
        return Api.fetch(service, { ...options, method: 'POST' });
    }

    static delete(service, options) {
        return Api.fetch(service, { ...options, method: 'DELETE' });
    }
}