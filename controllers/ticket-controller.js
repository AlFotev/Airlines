const mongoose = require("mongoose");
const Ticket = require("../models/Ticket");
const User = require("../models/User");

module.exports = {
     create:async (req,res,next)=>{
        let data = req.body;
        let exist = false;
        let ticket = {
            price:data["price"],
            type:data["type"],
            number:data["number"],
            flightId:data["flightId"],
            origin: data["origin"],
            destination:data["destination"],
            departureDate:data["departureDate"], 
            departureTime:data["departureTime"],
            image:data["image"]
        }
      await Ticket.find({"flightId":ticket.flightId})
      .where("number")
      .equals(Number(ticket.number))
      .then(t=>{
        if(t.length > 0){
            exist = true;
        }else{
            exist = false;
        }
      })
      .catch(err=>{
          exist = false;
      })
      if(!exist){
      Ticket.create(ticket)
      .then(created=>{
          res.status(201).json({"ticket":created})
      })
      .catch(error=>{
          console.log(error);
      })
    }else{
        res.status(201).json({"ticket":"there's allready such a ticket"})
    }},
    getTickets:function(req,res,next){
      let flightId = req.params.id;
      Ticket.find({"flightId":flightId})
      .then(tickets=>{
          res.status(201).json({"tickets":tickets});
      })
      .catch(error=>{
          console.log(error)
      })
    },
    delete:function(req,res,next){
      
    },
    buy:async (req,res,next)=>{
        let allT_id = [];
        
        req.body.map(t=>allT_id.push(t["_id"]));
        await User.findById(req.params.id)
        .then(user=>{
            req.body.map(t=>{
                user.purchasedItems.push(t)
            })
            user.save(done=>{
                allT_id.map(t_id=>{
                    Ticket.findByIdAndRemove(t_id)
                    .then(yes=>{console.log("yes removed")})
                    .catch(fail=>{console.log(fail)})
                })
            }).then(success=>{
                res.status(201).json({"msg":"success"})
            }).catch(err=>{console.log(err)})
        })
    },
    getBoughtTickets:(req,res,next)=>{
        let id = req.params.id;
        User.findById(id)
        .then(user=>{
            res.status(201).json({"tickets":user.purchasedItems})
        })
        .catch(err=>{
            console.log(err)
        })
    }
}