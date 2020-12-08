const { age, date } = require('../../lib/utils')
const Member = require ('../models/Member')


module.exports = {
    index(req, res) {

        Member.all(function(members){
            return res.render("members/index", {members})
        })
    },

    create(req, res) {
        Member.instructorsSelectOpstions(function(options){
            return res.render("members/create", {instructorsOptions: options})
        })

    },

    post(req, res) {
        const keys = Object.keys(req.body) /*é um construtor*/

        for (key of keys) {
            //req.body.avatar_url
            if (req.body[key] == "") {
                return res.send("please, fill all fieds!")
            }

        }

        Member.create(req.body, function(Member){
            return res.redirect(`/instructors/${instructor.id}`)
        })
    },

    show(req, res) {
        Member.find(req.params.id, function(member){
            if(!member) res.send("Member not found")

            member.birth = date(member.birth).birthDay


            return res.render("members/show", {member})
        })
    },

    edit(req, res){

        Member.find(req.params.id, function(member){
            if(!member) res.send("Member not found")

            member.birth = date(member.birth).iso

            Member.instructorsSelectOpstions(function(options){
                return res.render("members/edit", {member, instructorsOptions: options})
            })
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
        Member.update(req.body, function(){
            return res.redirect(`/members/${req.body.id}`)
        })

        return
    },

    delete(req, res) {
        Member.delete(req.body.id, function(){
            return res.redirect(`/members`)
        })
    },
}