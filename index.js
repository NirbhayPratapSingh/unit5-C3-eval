const express = require("express");
const app = express();
const { v4: randtoken  } = require('uuid');
const fs = require("fs");

// created middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.post("/user/create", (req, res) => {

  fs.readFile("./db.json", { encoding: "utf-8" }, (err, data) => {
    const myparsed = JSON.parse(data);

    myparsed.users = [...myparsed.users, req.body];

    fs.writeFile("./db.json",JSON.stringify(myparsed),{ encoding: "utf-8" },() => {res.status(201).json({ status: "user created", id_of_user: req.body.id });
      }
    );
  });
});

app.use("/user/login", (req, res, next) => {
    fs.readFile("./db.json", { encoding: "utf-8" }, (err, data) => {
        const myparsed = JSON.parse(data);
        if (!req.body.username || !req.body.password) { return res.status(400).send("please provide username and password") }
        for (var i = 0; i < myparsed.users.length; i++) {

            if (myparsed.users[i].password == req.body.password && myparsed.users[i].username == req.body.username) 
            {
                var token = randtoken.generate(10);
                myparsed.users[i].token = token;
                
        
                return fs.writeFile( "./db.json",JSON.stringify(myparsed),{ encoding: "utf-8" },() => {
                    res.status(201).json({ status: "Login Successful", token: token });
                    }
                );

            }

        }
    })
   
})


app.post("/user/login", (req, res) => {
    fs.readFile("./db.json", { encoding: "utf-8" }, (err, data) => {

        const myparsed = JSON.parse(data);

        myparsed.users = [...myparsed.users, req.body];
    })

    res.send("user created");
})

app.post("/user/logout", (req, res) => {
    const { apiKey } = req.query;
    fs.readFile("./db.json", { encoding: "utf-8" }, (err, data) => {

        const myparsed = JSON.parse(data);
        myparsed.users = myparsed.users.map((oneuser) => {

            if (oneuser.token == apiKey)
             {
                delete oneuser.token;

                return fs.writeFile("./db.json", JSON.stringify(myparsed), { encoding: "utf-8" },() => {
                        res.status(201).json({ status: "logout successfully" });
                    }
                );
            }
        })
    })
})


const PORT=process.env.PORT || 8080;
app.listen(PORT)
