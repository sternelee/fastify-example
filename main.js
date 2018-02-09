const fastify = require('fastify')()
const Sequelize = require('sequelize');
const sequelize = require('./sql')

var Users = sequelize.define('users', {
    id: {
        type: Sequelize.STRING(50),
        primaryKey: true
    },
    name: Sequelize.STRING(100),
    email: Sequelize.STRING(100)
}, {
        timestamps: false
    });

Users.findAll().then(users => {
    //console.log(users);
    users.map((user, i) => {
        console.log(user.get('name'))
    })
});

// Users.findOne().then(users => {
//     console.log(users.get('name'));
//   });

fastify.get('/', function(request, reply){
    reply.send({hello:'world'})
})

fastify
    .register(require('fastify-react'))
    .after(() => {
        fastify.next('/hello');
        fastify.next('/me');
    })

fastify.listen(3000, function(err){
    if(err) throw err;
    console.log(`server listening on ${fastify.server.address().port}`)
})