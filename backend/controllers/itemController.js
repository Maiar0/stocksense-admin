const supabase = require('../config/supabaseClient');

// Get all items
const getItems = async (req, res) => {
    const { data, error } = await supabase.from('items').select('*');
    if (error) return res.status(400).json({ error: error.message });
    res.json(data);
};

// Create a new item
const createItem = async (req, res) => {
    const { item_id, item_name, quantity, location, alert_level, organization_id, database_id, database_name } = req.body;

    // Ensure required fields are present
    if (!item_name || !organization_id || !database_id) {
        return res.status(400).json({ error: "Missing required fields: item_name, organization_id, and database_id are mandatory." });
    }

    // Insert into Supabase
    const { data, error } = await supabase
        .from('items')
        .insert([{ item_id, item_name, quantity, location, alert_level, organization_id, database_id, database_name }]).select('*');

    if (error) {
        console.error("Supabase Insert Error:", error.message);
        return res.status(400).json({ error: error.message });
    }

    res.json(data);
};

const updateItem = async(req,res)=> {
    const {id} = req.params;
    const { item_name, quantity, location, alert_level, database_id, database_name, organization_id } = req.body;
    if(!id) return res.status(400).json({error: "Item ID is required"});

    const updatedFields = {};
    if (item_name !== undefined) updatedFields.item_name = item_name;
    if (quantity !== undefined) updatedFields.quantity = quantity;
    if (location !== undefined) updatedFields.location = location;
    if (alert_level !== undefined) updatedFields.alert_level = alert_level;
    if (database_id !== undefined) updatedFields.database_id = database_id;
    if (database_name !== undefined) updatedFields.database_name = database_name;
    if (organization_id !== undefined) updatedFields.organization_id = organization_id;

    const {data, error} = await supabase
    .from('items')
    .update(updatedFields)
    .eq('id', id)
    .select('*');

    if(error) return res.status(400).json({error: error.message});

    res.json({ message: "Item updated successfully", data})
}

const deleteItem = async (req, res) => {
    let id = req.params.id;
    // Ensure the ID is correctly extracted
    if (id === undefined || id === null || id === '') {
        return res.status(400).json({ error: "Item primary ID is required." });
    }

    // Convert ID to integer if necessary
    id = parseInt(id, 10);

    if (isNaN(id)) {
        return res.status(400).json({ error: "Invalid item ID. Must be an integer." });
    }

    const { data, error } = await supabase
        .from('items')
        .delete()
        .eq('id', id)
        .select('*');//This enables return data 

    if (error) {return res.status(400).json({ error: error.message });}
    res.json({ message: "Item deleted successfully", data });
};

module.exports = { getItems, createItem, updateItem, deleteItem };
