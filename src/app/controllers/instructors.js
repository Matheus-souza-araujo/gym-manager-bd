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
            return res.redirect(`/instructors/${req.body.id}`)
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

        Instructor.find(req.params.id, function(instructor){
            if(!instructor) res.send("Instrutor not found")

            instructor.birth = date(instructor.birth).iso

            return res.render("instructors/edit", { instructor })
        })
    },

    put(req, res) {
        const keys = Object.keys(req.body) /*é um construtor*/

        for (key of keys) {
            //req.body.avatar_url
            if (req.body[key] == "") {
                return res.send("please, fill all fieds!")
            }

        }
        Instructor.update(req.body, function(){
            return res.redirect(`/instructors/${req.body.id}`)
        })

        return
    },

    delete(req, res) {
        Instructor.delete(req.body.id, function(){
            return res.redirect(`/instructors`)
        })
    },
}