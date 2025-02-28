class Item {
    constructor({ id, item_id, item_name, quantity, location, alert_level, database_id, database_name, organization_id }) {
        this.id = id;                         // Primary Key
        this.item_id = item_id;               // Unique identifier (Supabase)
        this.item_name = item_name;           // Name of the item
        this.quantity = quantity || 0;        // Default quantity = 0
        this.location = location || '';       // Location where item is stored
        this.alert_level = alert_level || 0;  // Default alert level = 0
        this.database_id = database_id;       // Related database ID
        this.database_name = database_name;   // Name of the database
        this.organization_id = organization_id; // Organization that owns this item
    }

    // Validate required fields before insert
    static validate(item) {
        if (!item.item_name || !item.organization_id || !item.database_id) {
            throw new Error("Missing required fields: 'item_id', 'organization_id', and 'database_id' are mandatory.");
        }
        if(typeof item.id !== 'undefined') {
            throw new Error("Item 'id' must not be provided; it is auto-generated.");
        }
    }
}

module.exports = Item;
