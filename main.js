class Bears {
    constructor(name) {
        this.name = name
        this.room = null
    }

    send(massage, to) {
        this.room.send(massage, this, to)
    }

    receive(message, from) {
        console.log(`${from.name} => ${this.name} = ${message}`)
    }
}

class ContactRoom {
    constructor() {
        this.users = {}
    }

    register(user) {
        this.users[user.name] = user
        user.room = this
    }

    send(message, from, to) {
        if(to) {
          to.receive(message, from)  
        } else {
            Object.keys(this.users).forEach(key => {
                if(this.users[key] !== from) {
                    this.users[key].receive(message, from)
                }
            })
        }
    }
}

const jack = new Bears('Jack')
const billy = new Bears('Billy')
const rose = new Bears('Rose')

const room = new ContactRoom()

room.register(jack)
room.register(billy)
room.register(rose)


const sendMessages = (from, to) => {
    if(from === jack && to === rose) {
        return jack.send('hello, i love you!', rose)
    } else if(from === rose && to === billy) {
        let roseToBilly = rose.send('i love you Billy', billy)
        let billytoAll = billy.send('i can RUN!')
    }
}

sendMessages(jack, rose)
sendMessages(rose, billy)