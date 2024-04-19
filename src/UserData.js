const userData = [
    {
        "user_id": "1",
        "name": "Frontend Team",
        "user_email": "Frontend Team",
        "organization_name": "Org A"
    },
    {
        "user_id": "2",
        "name": "Backend Team",
        "user_email": "Backend Team",
        "organization_name": "Org B"
    },
    {
        "user_id": "3",
        "name": "Product Team",
        "user_email": "Product Team",
        "organization_name": "Org C"
    }
];

// Function to get user data by ID
function getUserDataById(userId) {
    return userData.find(user => user.user_id === userId);
}


// Exporting the function
module.exports = {
    getUserDataById,
    userData
};
