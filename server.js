const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const Userdetail = require("./models/userdetailSchema");
const connectDB = require("./config/db");

const app = express();
mongoose.set("useFindAndModify", false);

//middleware
app.use(express.json());
app.use(cors());

//database connection
connectDB();

//routes

app.get("/", async (req, res) => {
  try {
    const alldetails = await Userdetail.find({});
    res.status(200).json(alldetails);
  } catch (error) {
    res.status(404).json(error);
  }
});

app.post("/adduser", async (req, res) => {
  try {
    const { firstName, lastName, email } = req.body;
    const id = (await Userdetail.collection.countDocuments()) + 1;
    const details = await new Userdetail({
      firstName: firstName,
      lastName: lastName,
      email: email,
      index: id,
    });

    //save to database
    details.save((err) => {
      if (err) {
        return res.status(500).json({
          error: "user already exists",
          errorMessage: err,
        });
      }
      res.status(200).json({
        status: "success",
      });
    });
    //send response
  } catch (error) {
    res.status(404).json(error);
  }
});

app.get("/:id", async (req, res) => {
  try {
    const singleUser = await Userdetail.findById(req.params.id);
    res.status(200).json(singleUser);
  } catch (error) {
    res.status(404).json(error);
  }
});

app.delete("/:id", async (req, res) => {
  try {
    const singleUser = await Userdetail.findByIdAndDelete(req.params.id);
    res.status(200).json("deleted user");
  } catch (error) {
    res.status(404).json("unable to delete");
  }
});

app.put("/:id", async (req, res) => {
  try {
    console.log(req.body);
    const singleUser = await Userdetail.findByIdAndUpdate(
      req.params.id,
      req.body
    );
    res.status(200).json("did it work");
  } catch (error) {
    res.status(404).json("unable to update");
  }
});

//server createion
const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`server started on port ${port}`));
