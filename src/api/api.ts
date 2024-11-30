export const fetchData = async <T>(url: string): Promise<T> => {
    const response = await fetch(`http://localhost:3001/${url}`);
    if (!response.ok) {
        throw new Error(`Error fetching data from ${url}`);
    }
    return response.json();
};
