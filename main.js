if (mqtt) {
    console.log('Mqtt')
}

const options = {
    clean: true, // retain session
    connectTimeout: 4000, // Timeout period
    // Authentication information
    clientId: 'emqx_test',

    username: undefined,
    password: undefined,
}


const clientId = Date.now()

// Connect string, and specify the connection method by the protocol
// ws Unencrypted WebSocket connection
// wss Encrypted WebSocket connection
// mqtt Unencrypted TCP connection
// mqtts Encrypted TCP connection
// wxs WeChat applet connection
// alis Alipay applet connection
const connectUrl = 'ws://192.168.1.204:9001'
const client = mqtt.connect(connectUrl, {})

client.on('connect', function () {
    console.log('Connectefd')

    const nameParent = document.getElementById('clientId');
    const nameTag = document.createElement('span')
    nameTag.innerText = clientId
    nameParent.appendChild(nameTag)

    client.subscribe('#', function (err) {
      if (!err) {
        console.log('Publishing')
        client.publish('discover', JSON.stringify({clientId: clientId, topic: 'new-device'}))
      }
    })
})

const skinColors = ['#4CC3D9', '#EF2D5E', '#FFC65D', '#7BC8A4']

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

const changeColorBtn = document.getElementById('select-button')
changeColorBtn.addEventListener('click', () => {
    console.log('Client', client)
    client.publish('change-color', JSON.stringify({clientId: clientId, topic: 'change-color', color: skinColors[getRandomInt(skinColors.length)]}))
})
  