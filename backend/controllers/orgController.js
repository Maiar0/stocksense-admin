const supabase = require('../config/supabaseClient');

const getOrgs = async (req, res) => {
    const { data, error } = await supabase
        .from('organizations')
        .select('*');

    if (error) return res.status(400).json({ error: error.message });
    
    res.json(data);
};

const createOrg = async (req, res) => {
    const { name } = req.body;
    
    if (!name) {
        return res.status(400).json({ error: "Organization name is required" });
    }

    const { data, error } = await supabase
        .from('organizations')
        .insert([{ name }])
        .select('*');

    if (error) return res.status(400).json({ error: error.message });

    res.json({ message: "Organization created successfully", data });
};

const updateOrg = async (req, res) => {
    const { id } = req.params;
    const { name } = req.body;

    if (!name) return res.status(400).json({ error: "New organization name is required" });

    const { data, error } = await supabase
        .from('organizations')
        .update({ name })
        .eq('id', id)
        .select('*');

    if (error) return res.status(400).json({ error: error.message });

    res.json({ message: "Organization updated successfully", data });
};

const deleteOrg = async (req, res) => {
    const { id } = req.params;

    const { data, error } = await supabase
        .from('organizations')
        .delete()
        .eq('id', id);

    if (error) return res.status(400).json({ error: error.message });

    res.json({ message: "Organization deleted successfully", data });
};

module.exports = { getOrgs, createOrg, updateOrg, deleteOrg };
