import * as Popper from "https://cdn.jsdelivr.net/npm/@popperjs/core@2/dist/esm/index.js";

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

socket.on("SERVER_RETURN_MESSAGE", (data) => {
    const myId = document.querySelector("[my-id]").getAttribute("my-id")
    const body = document.querySelector(".chat .inner-body")

    const div = document.createElement('div');
    let htmlFullName = "";
    if (myId == data.userId) {
        div.classList.add("inner-outgoing")
    }
    else {
        div.classList.add("inner-incoming")

    }

    div.innerHTML = `
        ${htmlFullName}
        <div class="inner-content">${data.content}</div>
    `

    body.appendChild(div)

    body.scrollTop = body.scrollHeight;
})

const bodyChat = document.querySelector(".chat .inner-body")
if (bodyChat) {
    bodyChat.scrollTop = bodyChat.scrollHeight;
}

// Show icon chat
// Show icon chat
const buttonIcon = document.querySelector('.button-icon');
const tooltip = document.querySelector('.tooltip');

let popperInstance = null;

if (buttonIcon && tooltip) {

    buttonIcon.addEventListener('click', () => {

        const isShown = tooltip.classList.toggle('show');

        if (isShown) {

            popperInstance = Popper.createPopper(buttonIcon, tooltip, {
                placement: 'top',
                strategy: 'fixed'
            });
        } else {

            if (popperInstance) {
                popperInstance.destroy();
                popperInstance = null;
            }
        }

    });

}

const emojiPicker = document.querySelector('emoji-picker')
if (emojiPicker) {
    const inputChat = document.querySelector(".chat .inner-form input[name='content']")
    emojiPicker.addEventListener('emoji-click', (event) => {
        const icon = event.detail.unicode;
        inputChat.value = inputChat.value + icon;
    })
}


// End show icon chat