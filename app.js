const BOT_IMG = "media/my_pb.webp";
const PERSON_IMG = "media/your_pb.webp";
const BOT_NAME = "Özgün";
const PERSON_NAME = "Du";

const msgerForm = get(".msger-inputarea");
const msgerInput = get(".msger-input");
const msgerChat = get(".msger-chat");

const BOT_MSGS = "Du Hurensohn!!!";

msgerForm.addEventListener("submit", event => {
  event.preventDefault();

  const msgText = msgerInput.value;
  if (!msgText) return;

  appendMessage(PERSON_NAME, PERSON_IMG, "right", msgText);
  msgerInput.value = "";

  botResponse();
});

function appendMessage(name, img, side, text) {
  const msgHTML = `
    <div class="msg ${side}-msg">
      <div class="msg-img" style="background-image: url(${img})"></div>
      <div class="msg-bubble">
        <div class="msg-info">
          <div class="msg-info-name">${name}</div>
          <div class="msg-info-time">${formatDate(new Date())}</div>
        </div>
        <div class="msg-text">${text}</div>
      </div>
    </div>
  `;

  msgerChat.insertAdjacentHTML("beforeend", msgHTML);
  msgerChat.scrollTop += 500;
}


async function chatgptResponse() {
    const prompt = msgerInput.value;
    const completions = await openai.Completion.create({
      engine: 'text-davinci-003',
      prompt,
      max_tokens: 1024,
      n: 1,
      stop: '\n',
    });
  
    const chatgptanswer = completions.choices[0].text.trim();
    return chatgptanswer
}


function botResponse() {
  const msgText = BOT_MSGS;
  const delay = msgText.split(" ").length * 100;

  setTimeout(() => {
    appendMessage(BOT_NAME, BOT_IMG, "left", BOT_MSGS);
  }, delay);
}

// Utils
function get(selector, root = document) {
  return root.querySelector(selector);
}

function formatDate(date) {
  const h = "0" + date.getHours();
  const m = "0" + date.getMinutes();
  return `${h.slice(-2)}:${m.slice(-2)}`;
}