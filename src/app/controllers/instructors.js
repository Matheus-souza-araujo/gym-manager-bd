const { age, date } = require('../../lib/utils')
const Instructor = require ('../models/Instructor')


module.exports = {
    index(req, res) {

        Instructor.all(function(instructors){
            return res.render("instructors/index", {instructors})
        })
    },

    create(req, res) {
        return res.render("instructors/create")
    },

    post(req, res) {
        const keys = Object.keys(req.body) /*é um construtor*/

        for (key of keys) {
            //req.body.avatar_url
            if (req.body[key] == "") {
                return res.send("please, fill all fieds!")
            }

        }

        Instructor.create(req.body, function(Instructor){
            return /*res.redirect(`/instructors/${instructor.id}`)*/
        })
    },

    show(req, res) {
        Instructor.find(req.params.id, function(instructor){
            if(!instructor) res.send("Instrutor not found")

            instructor.age = age(instructor.birth)
            instructor.services = instructor.services.split(",")

            instructor.created_at = date(instructor.created_at).format

            return res.render("instructors/show", {instructor})
        })
    },

    edit(req, res){
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