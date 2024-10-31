const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

export const fetchEvents = async () => {
    try {
        const response = await fetch(`${API_BASE_URL}/events`);
        if (!response.ok) {
            console.error('Failed to fetch events:', response.statusText);
            return [];
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching events:', error);
        return [];
    }
};
