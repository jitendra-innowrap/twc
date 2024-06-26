
class storage {

    static set(key, cartItems) {
        localStorage.setItem(key, JSON.stringify(cartItems))
    }

    static get(key) {
        const data = localStorage?.getItem(key);
        if (data && data !== 'null') {
            try {
                return JSON.parse(data);
            } catch (error) {
                console.error(`Error parsing data from localStorage for key "${key}":`, error);
                return null;
            }
        }
        return null;
    }
}

export default storage