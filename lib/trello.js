var Trello = require("node-trello");

module.exports = function(conf){
    var trello = new Trello(conf.key, conf.token);
    var component = {};

    add = function(email, name, cb){  
        var boards = conf.boards.slice();

        addNext = function(){
            var board = boards.pop();
            if (board) {
                args = {
                    email: email,
                    fullName: name,
                    type: 'normal'
                };
                trello.put("/1/boards/"+board+"/members", args, function(err, data) {
                    if (err) {
                        cb({error: { 
                            id: "api",
                            description: err,
                            message: "Trello API returned an error"
                        }});
                    } else {
                        addNext();
                    }
                });
            } else {
                cb({});
            }
        };

        addNext();
    };

    component.add = function(c, cb){
        var email = c.email;
        var name = c.name;

        add(email, name, function(){
            cb();
        });
    };

    return component;
};
