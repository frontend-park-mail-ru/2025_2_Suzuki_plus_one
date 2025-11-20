import template from './ui/supportItem.hbs';
import './styles/supportItem.scss';

class SupportItem {
    #parent;
    #app;

    constructor(parent, appInstance) {
        this.#parent = parent;
        this.#app = appInstance;
    }

    render(data) {
        const html = template(data);
        this.#parent.insertAdjacentHTML("beforeend", html);
    
        const items = this.#parent.querySelectorAll(".openCurAppeal");
    
        const curAppealWrapper = document.getElementById("curAppealWrapper");
        const iframe = document.getElementById("curAppealIframe");
        const closeBtn = document.getElementById("closeCurIframeBtn");
    
        items.forEach(item => {
            item.addEventListener("click", () => {
                const id = data.appeal_id;
                console.log(id);
                iframe.src = `/currentAppeal/${id}`;
    
                curAppealWrapper.style.display = "block";
                closeBtn.style.display = "block";
            });
        });
    
        closeBtn.addEventListener("click", () => {
            curAppealWrapper.style.display = "none";
            closeBtn.style.display = "none";
    
            iframe.src = "";
        });
    }
}

export default SupportItem;
