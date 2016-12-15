var services = {};
var e = process.env;

if (e.TRELLO_KEY && env.TRELLO_TOKEN && env.TRELLO_BOARDS) {
    services.trello = require('./lib/trello')({
        key: e.TRELLO_KEY,
        token: e.TRELLO_TOKEN,
        boards: e.TRELLO_BOARDS.split(',')
    });
}

component = {

    getServices: function(){
        return Object.keys(services);
    },

    add: function(service, conf, cb){
        if (!cb || typeof cb != 'function') {
            throw "bad args, must have cb"; 
        } 
        else if (!conf.name) {
            cb({error: { id: 'missing arg',
                description: "Missing parameter `name`"
            }});
        }
        else if (!conf.email) {
            cb({error: {
                id: 'missing arg',
                description: "Missing parameter `email`"
            }});
        }
        else if (!services[service]) {
            cb({error: {
                id: 'bad arg',
                description: "No such service `"+service+"`"
            }});
        }
        else {
            services[service].add(conf, cb);
        }
    }
}
