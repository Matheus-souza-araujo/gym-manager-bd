const { age, date } = require('../../lib/utils')
const Member = require ('../models/Member')


module.exports = {
    index(req, res) {

        Member.all(function(members){
            return res.render("members/index", {members})
        })
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

        Member.create(req.body, function(Member){
            return res.redirect(`/members/${req.body.id}`)
        })
    },

    show(req, res) {
        Member.find(req.params.id, function(member){
            if(!member) res.send("Instrutor not found")

            member.birth = date(member.birth).birthDay


            return res.render("members/show", {member})
        })
    },

    edit(req, res){

        Member.find(req.params.id, function(member){
            if(!member) res.send("Instrutor not found")

            member.birth = date(member.birth).iso

            return res.render("members/edit", { member })
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