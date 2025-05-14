import axios from "axios"

const TOKEN = import.meta.env.VITE_TG_TOKEN;
const CHAT_ID = import.meta.env.VITE_TG_CHAT_ID;

    const TG_BASE_URL = `https://api.telegram.org/bot${TOKEN}`


    document.getElementById("form-tg").addEventListener("submit", handleSubmit)

    function handleSubmit(e) {
        e.preventDefault();

        const notifyElem = document.querySelector(".notification")
        const notifyBoxSuccessElem = document.querySelector(".notification-success")
        const notifyBoxFailElem = document.querySelector(".notification-fail")

        const form = e.currentTarget;
        const formEls = form.elements;

        const name = formEls.name.value;
        const phone = formEls.phone.value;

        const msg = `<b>Заявка із сайта</b>\n<b>Ім'я: ${name}</b>\n<b>Телефон: ${phone}</b>`;

        const sendText = async () => {
            notifyElem.classList.add("active")
          
            const METHOD = "sendMessage"
            const TG_URL = `${TG_BASE_URL}/${METHOD}`
            try {
                const res = await axios.post(TG_URL, {
                    parse_mode: "html",
                    chat_id: CHAT_ID,
                    text: msg,
                })

                notifyBoxSuccessElem.classList.add("active")

            } catch (e) {
                notifyBoxFailElem.classList.add("active")
            
            } finally {
                if (notifyBoxSuccessElem.classList.contains("active")) {
                    setTimeout(() => {
                        notifyBoxSuccessElem.classList.remove("active"); 
                        notifyElem.classList.remove("active")
                    }, 3000)
                }

                if (notifyBoxFailElem.classList.contains("active")) {
                    setTimeout(() => {
                        notifyBoxFailElem.classList.remove("active");
                        notifyElem.classList.remove("active")
                     }, 3000)
                }
          
            }
        };

        sendText();

        form.reset();
    }

