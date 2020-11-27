const { age, date } = require('../../lib/utils')



module.exports = {
    index(req, res) {
        return res.render("members/index")
    },

    create(req, res) {
        return res.render("members/create")
    },

    post(req, res) {
        const keys = Object.keys(req.body) /*é um construtor*/

        for (key of keys) {
            //req.body.avatar_url
            if (req.body[key] == "") {
                return res.send("please, fill all fieds!")
            }

        }
        let { avatar_url, birth, name, services, gender } = req.body

        return
    },

    show(req, res) {
        return
    },

    put(req, res) {
        const keys = Object.keys(req.body) /*é um construtor*/

        for (key of keys) {
            //req.body.avatar_url
            if (req.body[key] == "") {
                return res.send("please, fill all fieds!")
            }

        }
        let { avatar_url, birth, name, services, gender } = req.body

        return
    },

    delete(req, res) {
        return
    },
}