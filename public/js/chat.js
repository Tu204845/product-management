// CLIENT_SEND_MESSAGE
const formSendData = document.querySelector('.chat .inner-form');
// const socket = io();

if (formSendData) {
    formSendData.addEventListener('submit', (e) => {
        e.preventDefault()

        const content = e.target.elements.content.value;
        if (content) {
            socket.emit('CLIENT_SEND_MESSAGE', content);
            e.target.elements.content.value = "";
        }
    })
}