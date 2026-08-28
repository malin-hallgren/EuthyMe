export default function ListUsers() {

    const ListUsers = async (event) => {
        event.preventDefault();
        const response = await fetch('https://localhost:7210/api/user', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        const responseData = await response.json();
        if(responseData.length > 0) {
            responseData.forEach(user => {
                console.log(user);
            });
        }
    }

    return (
        <button onClick={ListUsers}>Hämta användare</button>
    )
}