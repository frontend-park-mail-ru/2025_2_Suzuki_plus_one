import template from './ui/supportItem.hbs';
import './styles/supportItem.scss';

class SupportItem {
    #parent;
    #app;

    constructor(parent, appInstance) {
        this.#parent = parent;
        this.#app = appInstance;
    }
    // render(data) {
    //     const item = template(data);

    //     const openBtn = item.querySelector(".openCurAppeal");
    //     const curAppealWrapper = document.getElementById("curAppealWrapper");
    //     const closeBtn = document.getElementById("closeCurIframeBtn");
    
    //     openBtn.addEventListener("click", () => {
    //         curAppealWrapper.style.display = "block";
    //         closeBtn.style.display = "block";
    //     });
    
    //     closeBtn.addEventListener("click", () => {
    //         curAppealWrapper.style.display = "none";
    //         closeBtn.style.display = "none";
    //     });

    //     this.#parent.innerHTML = item;
    // }

    render(data) {
        const html = template(data);
        this.#parent.insertAdjacentHTML("beforeend", html);
    
        const items = this.#parent.querySelectorAll(".openCurAppeal");
    
        const curAppealWrapper = document.getElementById("curAppealWrapper");
        const iframe = document.getElementById("curAppealIframe");
        const closeBtn = document.getElementById("closeCurIframeBtn");
    
        items.forEach(item => {
            item.addEventListener("click", () => {
                iframe.src = `/currentAppeal/${data.appeal_id}`;
    
                curAppealWrapper.style.display = "block";
                closeBtn.style.display = "block";
            });
        });
    
        closeBtn.addEventListener("click", () => {
            curAppealWrapper.style.display = "none";
            closeBtn.style.display = "none";
    
            iframe.src = ""; // сбрасываем iframe
        });
    }

    
    // render(data) {
    //     const html = template(data); // ← строка HTML
    
    //     // создаём контейнер
    //     const wrapper = document.createElement("div");
    //     wrapper.innerHTML = html;
    
    //     const item = wrapper.firstElementChild; // ← полноценный DOM-элемент
    
    //     // теперь querySelector работает
    //     // const openBtn = item.querySelector(".openCurAppeal");
    
    //     // const curAppealWrapper = document.getElementById("curAppealWrapper");
    //     // const closeBtn = document.getElementById("closeCurIframeBtn");
    
    //     // openBtn.addEventListener("click", () => {
    //     //     curAppealWrapper.style.display = "block";
    //     //     closeBtn.style.display = "block";
    
    //     //     // Вставляем нужный ID для iframe
    //     //     const iframe = document.getElementById("curAppealIframe");
    //     //     iframe.src = `/currentAppeal/${data.appeal_id}`;
    //     // });
    
    //     // closeBtn.addEventListener("click", () => {
    //     //     curAppealWrapper.style.display = "none";
    //     //     closeBtn.style.display = "none";
    //     // });
    
    //     this.#parent.appendChild(item);
    // }
    
    
}

export default SupportItem;
