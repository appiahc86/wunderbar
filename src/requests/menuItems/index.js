import axios from "@/axios";


export const listMenuItems = async (page, pageSize) => {
    try {

        const response = await axios.get('/menuItems',
            {
                params: {
                    page,
                    pageSize
                }
            }
        )

        if (response.status === 200) {
            return {
                menuItems: response.data.menuItems,
                totalRecords: response.data.totalRecords,
                path: response.data.path,
                error: null
            };
        }

    } catch (e) {
        if (e.response) return {error: e.response.data};

        if (e.request && e.request.status === 0)
            return {error: `Leider wurde die Verbindung zum Server abgelehnt. Bitte überprüfen Sie Ihre Internetverbindung oder versuchen Sie es später erneut`};
    }
}