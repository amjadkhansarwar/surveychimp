

const healthCheck = async () => {
    return (await fetch("http://localhost:3333/api/healtcheck")).json();
}

export default healthCheck;