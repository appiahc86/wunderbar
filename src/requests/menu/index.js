import axios from "@/axios";


export const listMenu = async () => {
    try {

        const response = await axios.get('/menu')

        if (response.status === 200) {
            return {menu: response.data.menu, error: null};
        }

    } catch (e) {
        if (e.response) return {error: e.response.data};
        if (e.request && e.request.status === 0)
            return {error: `Leider wurde die Verbindung zum Server abgelehnt. Bitte überprüfen Sie Ihre Internetverbindung oder versuchen Sie es später erneut`};
    }
}