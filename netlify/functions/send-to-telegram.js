exports.handler = async function(event, context) {
    const headers = {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
    };
    
    if (event.httpMethod === 'OPTIONS') {
        return { statusCode: 200, headers, body: '' };
    }
    
    try {
        const { chat_id, text } = JSON.parse(event.body);
        const BOT_TOKEN = process.env.BOT_TOKEN;
        
        const response = await fetch(
            `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`,
            {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ chat_id: chat_id, text: text })
            }
        );
        
        const data = await response.json();
        
        return {
            statusCode: 200,
            headers,
            body: JSON.stringify(data)
        };
    } catch(error) {
        return {
            statusCode: 500,
            headers,
            body: JSON.stringify({ ok: false, error: error.message })
        };
    }
};
