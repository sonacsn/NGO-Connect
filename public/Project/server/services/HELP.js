app.post  ('/api/assignment/admin/user',     auth, adduser);
app.get('/api/assignment/admin/user/:id', auth, GetUserById);
app.get   ('/api/assignment/admin/user',     auth, findAllUsers);
app.put   ('/api/assignment/admin/user/:id', auth, updateUserByAdmin);
app.delete('/api/assignment/admin/user/:id', auth, deleteUserById);













    function updateUserByAdmin(req, res) {
        if(isAdmin(req.user))
        {
        var user = req.body;
        var userId = req.params.id;
        user_model
            .Update(userId, user)
            .then(function(newuser){
                console.log(newuser)
                res.json(newuser)});

    }
        else
            res.send(403)
    }
function GetUserById(req, res) {
    var userId = req.params.id;
    user_model.findById(userId)
        .then(function(user){
            res.json(user)});
}


        function deleteUserById(req, res) {
            if(isAdmin(req.user))
            {
            var userId = req.params.id;
            user_model
                .Delete(userId)
                .then(function(updateduser){
                    res.json(updateduser)});
        }

        else
         res.send(403)
    }


function adduser(req, res)
{
    if(isAdmin(req.user))
    {
        var user = req.body;
        user_model.Create(user)
            .then(function(users){
                res.json(users)});

    }
    else
        res.send(403)
}

function findAllUsers(req, res)
{
    if(isAdmin(req.user)) {
        user_model.FindAll()
            .then(function (users) {
                res.json(users)
            });
    }
    else
        res.send(403)
}


function isAdmin(user) {
    if(user.roles.indexOf("admin") > 0) {
        return true
    }
    return false;
}