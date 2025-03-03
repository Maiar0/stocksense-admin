import config from "../config.js";

class DatabaseService {

    static async fetchData(endpoint, method = "GET", body = null) {
        try {
            const options = {
                method,
                headers: { "Content-Type": "application/json" }
            };

            if (body) options.body = JSON.stringify(body);

            const response = await fetch(`http://localhost:5000/api${endpoint}`, options);
            const result = await response.json();

            if (!response.ok) throw new Error(result.error || "Request failed");

            return result;
        } catch (error) {
            console.error(`Error in ${method} ${endpoint}:`, error);
            throw error;
        }
    }


    // User methods
    static createUser(data) {
        return this.fetchData("/users", "POST", data)
    }
    static getUsers() {
        return this.fetchData("/users");
    }
    static updateUser(userId, data) {
        return this.fetchData(`/users/${userId}`, "PUT", data)
    }
    static deleteUser(userId) {
        return this.fetchData(`/users/${userId}`, "DELETE");
    }

    // Organization methods
    static createOrganization(data) {
        return this.fetchData("/org", "POST", data);
    }

    static getOrganizations() {
        return this.fetchData("/org");
    }

    static updateOrganization(orgId, data) {
        return this.fetchData(`/org/${orgId}`, "PUT", data)
    }

    static deleteOrganization(orgId) {
        return this.fetchData(`/org/${orgId}`, "DELETE");
    }

    // Item methods
    static addItem(data) {
        return this.fetchData("/items", "POST", data);
    }

    static getItems() {
        return this.fetchData("/items");
    }

    static updateItem(itemId, data) {
        return this.fetchData(`/items/${itemId}`, "PUT", data);
    }

    static deleteItem(itemId) {
        return this.fetchData(`/items/${itemId}`, "DELETE");
    }
}

export default DatabaseService;
