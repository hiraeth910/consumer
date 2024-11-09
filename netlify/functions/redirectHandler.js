export async function handler(event) {
    // Check if the request is a POST and if the path matches
    if (event.httpMethod === "POST" && event.path === "/redirect-url") {
        return {
            statusCode: 303, // 303 is used for redirecting after POST
            headers: {
                Location: "https://consumer.telemoni.in/redirect-url" // Redirecting to the actual success page
            },
            body: JSON.stringify({
                message: "Redirecting to success page"
            })
        };
    }

    // If it's not a POST to /redirect-url, return a 405 Method Not Allowed
    return {
        statusCode: 405,
        body: "Method Not Allowed"
    };
}
