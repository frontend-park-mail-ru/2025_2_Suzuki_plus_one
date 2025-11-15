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
        this.#parent.innerHTML = template(data);
        
        const openCurAppealButton = document.getElementById("openCurAppeal");
        const curAppealWrapper = document.getElementById('curAppealWrapper');
        const closeBtn = document.getElementById('closeCurIframeBtn');

        curAppealWrapper.style.display = 'none';
        closeBtn.style.display = 'none';

        openCurAppealButton.addEventListener('click', function() {
            curAppealWrapper.style.display = 'block';
            closeBtn.style.display = 'block';
        });

        closeBtn.addEventListener('click', () => {
            curAppealWrapper.style.display = 'none';
            closeBtn.style.display = 'none';
        });


        document.addEventListener('click', function(event) {
            const isClickInsideIframe = curAppealWrapper.contains(event.target);
            const isClickOnOpenButton = event.target === openCurAppealButton;
    
            if (!isClickInsideIframe && !isClickOnOpenButton) {
                curAppealWrapper.style.display = 'none';
                closeBtn.style.display = 'none';
            }
        });
    }
}

export default SupportItem;
