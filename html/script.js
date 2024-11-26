document.getElementById('ask').addEventListener('submit', async function(event) {
    event.preventDefault();

    const categories = document.getElementById('categories').value;
    const query = document.getElementById('query').value;

    const responseContainer = document.getElementById('response');
    responseContainer.value = 'Loading...';

    try {
        const response = await fetch('/ask', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ categories, query }),
        });

        const data = await response.json();
        if (response.ok) {
            responseContainer.value = data.response;
            responseContainer.style.height = 'auto';
            responseContainer.style.height = `${responseContainer.scrollHeight}px`;
        } else {
            responseContainer.value = `Error: ${data.error}`;
        }
    } catch (error) {
        responseContainer.value = `Error: ${error.message}`;
    }
});
