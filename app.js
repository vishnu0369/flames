// jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");


const app = express();
app.set('view engine','ejs');
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));

mongoose.connect("mongodb://localhost:27017/flamesDB")

const flamesSchema = new mongoose.Schema({
    name1:String,
    name2:String,
    result:String
});

const Flame = mongoose.model("Flame",flamesSchema);

app.get("/",function(req,res){
    res.render("home");
});

app.post("/result",function(req,res){        
    
        var n1 = req.body.name1;
        var n2 = req.body.name2;

        var temp1 = n1;
        var temp2 = n2;

        for (var i = 0; i < n1.length; i++) {
            var key = 0;
            for (var j = 0; j < n2.length; j++) {
                if (n1[i] === n2[j] && key !=1) {
                    var t = n1.slice(0, i);
                    t = t + " " + n1.slice(i + 1, n1.length);
                    n1 = t;
                    var t = n2.slice(0, j);
                    t = t + " " + n2.slice(j + 1, n2.length);
                    n2 = t;
                    // j = n2.length;
                    key = 1;
                }
            }
        }
        var l = 0;

        for (var i = 0; i < n1.length; i++) {
            if (n1[i] != " ") {
                l = l + 1;
            }
        }
        for (var i = 0; i < n2.length; i++) {
            if (n2[i] != " ") {
                l = l + 1;
            }
        }

        var flames = "flames";
        var z = 0;
        i = 0;
        while (z < 5) {
            for (var h = 0; h < l; h++, i++) {
                if (i >= flames.length) {
                    i = i - flames.length;
                }
                while (flames[i] == " ") {
                    i = i + 1;
                    if (i >= flames.length) {
                        i = i - flames.length;
                    }
                }

                if (i >= flames.length) {
                    i = i - flames.length;
                }

                if (h == l - 1) {
                    var t = flames.slice(0, i);
                    t = t + " " + flames.slice(i + 1, flames.length);
                    flames = t;
                    z = z + 1;
                }
            }
        }
        for (var x = 0; x < flames.length; x++) {
            if (flames[x] != " ") {
                flames = flames[x];
                break;
            }
        }

        

        var j = "";
        switch (flames) {
            case "f":
                j = "Friendship";
                break;
            case "l":
                j = "Love";
                break;
            case "a":
                j = "Affection"
                break;
            case "m":
                j = "Marriage";
                break;
            case "e":
                j = "Enemy";
                break;
            case "s":
                j = "Siblings";
                break;
        }


        var Details = new Flame({
            name1: req.body.name1,
            name2: req.body.name2,
            result: j
        });

        Details.save();


        var x =Math.random();
        x = x * 100;
        x = Math.floor(x) + 1;

        var ans = "The relation between " + temp1 + " and " + temp2 + " is " + j +" and is about " + x + "%";

        switch (flames) {
            case "f":
                res.render("result",{results:ans,imglink:"https://thumbs.dreamstime.com/z/horizontal-silhouette-two-friends-jumping-high-under-breathtaking-cloudy-sky-sunset-161089659.jpg"})
                break;
            case "l":
                res.render("result",{results:ans,imglink:"https://thumbs.dreamstime.com/z/romantic-photo-couple-love-picture-40909449.jpg"})
                break;
            case "a":
                res.render("result",{results:ans,imglink:"https://firstthings.org/wp-content/uploads/2021/04/marc-a-sporys-wHaQ4XJ9SgY-unsplash-1-1030x449.jpg"})
                break;
            case "m":
                res.render("result",{results:ans,imglink:"https://mystarsmemories.com/wp-content/uploads/2020/08/ani-kolleshi-O1fZYFpXvFQ-unsplash.jpg"})
                break;
            case "e":
                res.render("result",{results:ans,imglink:"https://merlinsmusings.files.wordpress.com/2019/05/alucard.hellsing.full_.2349579.png"})
                break;
            case "s":
                res.render("result",{results:ans,imglink:"https://uploads.spiritfanfiction.com/historias/capas/202105/nao-me-provoqueonee-san-22241133-060520210907.jpg"})
                break;
        }
});


app.listen("3000",function(req,res){
    console.log("your at local host 3000");
});