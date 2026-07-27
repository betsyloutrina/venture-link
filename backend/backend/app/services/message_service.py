const API_BASE_URL = "http://127.0.0.1:8000";

export const sendMessage = async (senderId, receiverId, content) => {
    const response = await fetch(`${API_BASE_URL}/messages/?sender_id=${senderId}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            receiver_id: receiverId,
            content: content
        }),
    });
    if (!response.ok) throw new Error("Failed to send message");
    return response.json();
};

export const fetchUserMessages = async (userId) => {
    const response = await fetch(`${API_BASE_URL}/messages/${userId}`);
    if (!response.ok) throw new Error("Failed to fetch messages");
    return response.json();
};