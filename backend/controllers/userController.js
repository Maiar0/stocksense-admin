const supabase = require('../config/supabaseClient');

//Get all users
const getUsers = async(req,res)=> {
    const {data, error} = await supabase.auth.admin.listUsers();
    if(error) return res.status(400).json({error: error.message});
    res.json(data);
};

//Create a new User
const createUser = async (req,res) => {
    const {email, password} = req.body
    const {data, error} = await supabase.auth.admin.createUser({email, password, email_confirm: true});
    if(error) return res.status(400).json({error: error.message});
    res.json(data);
};

const updateUser = async (req, res) => {
    const { id } = req.params; // User ID from URL
    const { full_name, role, organization_id } = req.body; // Fields to update

    if (!id) {
        return res.status(400).json({ error: "User ID is required." });
    }

    const updatedFields = {};
    if (full_name !== undefined) updatedFields.user_metadata = { full_name };
    if (role !== undefined) updatedFields.user_metadata = { ...updatedFields.user_metadata, role };
    if (organization_id !== undefined) updatedFields.user_metadata = { ...updatedFields.user_metadata, organization_id };

    console.log("Updating user with ID:", id, "Updated fields:", updatedFields);

    const { data, error } = await supabase.auth.admin.updateUserById(id, updatedFields);

    console.log("Supabase Response:", data, "Error:", error ? error.message : "None");

    if (error) {
        console.error("Supabase Update Error:", error.message);
        return res.status(400).json({ error: error.message });
    }

    res.json({ message: "User updated successfully", data });
};


const deleteUser = async (req, res) => {
    const { id } = req.params;

    if (!id) {
        return res.status(400).json({ error: "User ID is required." });
    }

    console.log("Attempting to delete user with ID:", id);

    // ✅ Use Supabase Authentication Admin API to delete the user
    const { data, error } = await supabase.auth.admin.deleteUser(id);

    console.log("Supabase Response:", data, "Error:", error ? error.message : "None");

    if (error) {
        console.error("Supabase Delete Error:", error.message);
        return res.status(400).json({ error: error.message });
    }

    res.json({ message: "User deleted successfully", data });
};



module.exports = {getUsers, createUser, updateUser, deleteUser};
