import template from "./ui/AppealStats.hbs";
import { fetchAllAppeals } from "@shared/api/appealApi.js";
import './styles/appealStats.scss';

class AppealStats {
    #parent;

    constructor(parent) {
        this.#parent = parent;
    }

    async render() {
        try {
            const response = await fetchAllAppeals();
            const appeals = response.appeals || [];

            const formattedAppeals = appeals.map((a, index) => ({
                id: a.id || index,
                tag: a.tag,
                name: a.name,
                status: a.status,
                created_at: a.created_at,
                displayStatus: this.#formatStatus(a.status)
            }));

            this.#parent.innerHTML = template({ appeals: formattedAppeals });

        } catch (err) {
            console.error("Failed to load appeals list:", err);
            this.#parent.innerHTML = `<div class="support-chat__error">
                Failed to load appeals: ${err.message}
            </div>`;
        }
    }

    #formatStatus(status) {
        if (status === "open") return "Open";
        if (status === "in_progress") return "In Progress";
        if (status === "closed") return "Closed";
        return status;
    }
}

export default AppealStats;
