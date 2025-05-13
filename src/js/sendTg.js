import axios from "axios"
    
console.log(import.meta.env.VITE_TG_TOKEN);
console.log(import.meta.env.VITE_TG_CHAT_ID);

const TOKEN = import.meta.env.VITE_TG_TOKEN;
const CHAT_ID = import.meta.env.VITE_TG_CHAT_ID;

    const TG_BASE_URL = `https://api.telegram.org/bot${TOKEN}`


    document.getElementById("form-tg").addEventListener("submit", handleSubmit)

    function handleSubmit(e) {
        e.preventDefault();

        // const notifyBoxSuccesElem = document.querySelector(".notify-box-success")
        // const notifyBoxFailElem = document.querySelector(".notify-box-fail")

        const form = e.currentTarget;
        const formEls = form.elements;

        const name = formEls.name.value;
        const phone = formEls.phone.value;

        const msg = `<b>Заявка із сайта</b>\n<b>Ім'я: ${name}</b>\n<b>Телефон: ${phone}</b>`;

        const sendText = async () => {
            console.log("SEND_MSG_TEXT")
            const METHOD = "sendMessage"
            const TG_URL = `${TG_BASE_URL}/${METHOD}`
            try {
                const res = await axios.post(TG_URL, {
                    parse_mode: "html",
                    chat_id: CHAT_ID,
                    text: msg,
                    // disable_notification: true
                })

                // notifyBoxSuccesElem.classList.add("active")
                console.log("SEND_MSG_TEXT---SUCCESS")
            } catch (e) {
                // notifyBoxFailElem.classList.add("active")
                console.log("SEND_MSG_TEXT---ERROR")
            } finally {
                // if (notifyBoxSuccesElem.classList.contains("active")) {
                //     setTimeout(() => { notifyBoxSuccesElem.classList.remove("active") }, 3000)
                // }
                // if (notifyBoxFailElem.classList.contains("active")) {
                //     setTimeout(() => { notifyBoxFailElem.classList.remove("active") }, 5000)
                // }
                console.log("SEND_MSG_TEXT---END")
            }
        };

        sendText();

        form.reset();
    }

