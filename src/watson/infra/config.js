// #Watson assistant Environment variables Dallas
createInstance('2018-11-08', process.env.ASSISTANT_USERNAME, process.env.ASSISTANT_PASSWORD_DALLAS, process.env.ASSISTANT_URL_DALLAS, 12 * 1000, {'X-Watson-Learning-Opt-Out': 'false'})

// #Watson assistant Environment variables Sydney
createInstance('2018-11-08', process.env.ASSISTANT_USERNAME, process.env.ASSISTANT_PASSWORD_SYDNEY, process.env.ASSISTANT_URL_SYDNEY, 8 * 1000, {'X-Watson-Learning-Opt-Out': 'false'})

// #Watson assistant Environment variables Frankfurt
createInstance('2018-11-08', process.env.ASSISTANT_USERNAME, process.env.ASSISTANT_PASSWORD_FRANKFURT, process.env.ASSISTANT_URL_FRANKFURT, 8 * 1000, {'X-Watson-Learning-Opt-Out': 'false'})

// #Watson assistant Environment variables London
createInstance('2018-11-08', process.env.ASSISTANT_USERNAME, process.env.ASSISTANT_PASSWORD_LONDON, process.env.ASSISTANT_URL_LONDON, 8 * 1000, {'X-Watson-Learning-Opt-Out': 'false'})

// #Watson assistant Environment variables Tokyo
createInstance('2018-11-08', process.env.ASSISTANT_USERNAME, process.env.ASSISTANT_PASSWORD_TOKYO, process.env.ASSISTANT_URL_TOKYO, 8 * 1000, {'X-Watson-Learning-Opt-Out': 'false'})

// #Watson assistant Environment variables Washington DC
createInstance('2018-11-08', process.env.ASSISTANT_ID_WASHINGTON, process.env.ASSISTANT_PASSWORD_WASHINGTON, process.env.ASSISTANT_URL_WASHINGTON, 8 * 1000, {'X-Watson-Learning-Opt-Out': 'false'})

export const WATSON_ASSITANTS = {
    dallas: {
        username:'2018-11-08',
        version: process.env.ASSISTANT_USERNAME,
        password: process.env.ASSISTANT_PASSWORD_DALLAS,
        url: process.env.ASSISTANT_URL_DALLAS,
        timeout: 12 * 1000,
        header: {'X-Watson-Learning-Opt-Out': 'false'}
    },
    sydney: {
        version: '2018-11-08',
        username: process.env.ASSISTANT_USERNAME,
        password: process.env.ASSISTANT_PASSWORD_SYDNEY,
        url: process.env.ASSISTANT_PASSWORD_DALLAS,
        timeout: 8 * 1000,
        header: {'X-Watson-Learning-Opt-Out': 'false'}
    },
    frankfurt: {
        version: '2018-11-08',
        username: process.env.ASSISTANT_USERNAME,
        password: process.env.ASSISTANT_PASSWORD_FRANKFURT,
        url: process.env.ASSISTANT_URL_FRANKFURT,
        timeout: 8 * 1000,
        header: {'X-Watson-Learning-Opt-Out': 'false'}
    },
    london: {
        version: '2018-11-08',
        username: process.env.ASSISTANT_USERNAME,
        password: process.env.ASSISTANT_PASSWORD_LONDON,
        url: process.env.ASSISTANT_URL_LONDON,
        timeout: 8 * 1000,
        header: {'X-Watson-Learning-Opt-Out': 'false'}
    },
    tokio: {
        version: '2018-11-08',
        username: process.env.ASSISTANT_USERNAME,
        password: process.env.ASSISTANT_PASSWORD_TOKYO,
        url: process.env.ASSISTANT_URL_TOKYO,
        timeout: 8 * 1000,
        header: {'X-Watson-Learning-Opt-Out': 'false'}
    },
    washington: {
        version: '2018-11-08',
        username: process.env.ASSISTANT_ID_WASHINGTON,
        password: process.env.ASSISTANT_PASSWORD_WASHINGTON,
        url: process.env.ASSISTANT_URL_WASHINGTON,
        timeout: 8 * 1000,
        header: {'X-Watson-Learning-Opt-Out': 'false'}
    }
}

"region": region,
"assistant_id": ASSISTANT_ID_DALLAS,
"assistant": new AssistantV2({
    version,
    username,
    password,
    url,
    timeout,
    headers,
})