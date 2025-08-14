const express = require("express");
const bodyParser = require("body-parser");

const app = express();

// ✅ Set EJS as the template engine
app.set("view engine", "ejs");

// ✅ Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public")); // for styles.css, images, etc.

// ✅ Store tasks
let items = [];
let workitems = [];

// 📌 GET Home page
app.get("/", function (req, res) {
  const today = new Date();

  const options = {
    weekday: "long",
    day: "numeric",
    month: "long",
  };

  const day = today.toLocaleDateString("en-US", options);

  res.render("list", { listTitle: day, newListItems: items });
});

// 📌 POST - Add new task
app.post("/", function (req, res) {
  let item = req.body.newItem;

  if (req.body.list === "work") {
    workitems.push(item);
    res.redirect("/work");
  } else {
    items.push(item);
    res.redirect("/");
  }
});

app.get("/work", function (req, res) {
  res.render("list", { listTitle: "work List", newListItems: workitems });
});

app.get("/about", function (req, res) {
  res.render("about");
});
// ✅ Start the server
app.listen(3000, function () {
  console.log("🚀 Server is running on port 3000");
});
