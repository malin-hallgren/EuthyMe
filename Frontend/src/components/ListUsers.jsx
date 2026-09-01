
import api from '../api/axios.js';

export default function ListUsers() {
    
    const ListUsers = async (event) => {
        event.preventDefault();

        try {
            await api.get('/user')
            .then(response => response.data)
            .then(data => {
                console.log('Fetched users:', data);
            })
        }
        catch (error) {
            console.error('Error fetching users:', error);
        }
        
    }

    return (
        <button onClick={ListUsers}>Get Users</button>
    )
}