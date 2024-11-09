export async function handler(event) {
    // Restrict the function to handle only specific POST requests
    if (event.httpMethod === "POST" && event.path === "/redirect-url") {
        return {
            statusCode: 303,
            headers: {
                Location: "/redirect-url"
            }
        };
    }
    return {
        statusCode: 405, // Method Not Allowed for other requests
        body: "Method Not Allowed"
    };
}
