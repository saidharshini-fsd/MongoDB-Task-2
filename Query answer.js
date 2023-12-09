// 1.Find all the topics and tasks which are thought in the month of October
db.topics.aggregate([
    {
      $lookup: {
        from: "task",
        localField: "topic_id",
        foreignField: "task_id",
        as: "tasks",
      },
    },
  ])[
    // ANSWER:
    {
      _id: ObjectId("649109a543562da9f4130c06"),
      topic_id: 1,
      topic: "react",
      topic_date: "19-oct-2020",
      tasks: [
        {
          _id: ObjectId("64910f6c43562da9f4130c25"),
          task_id: 1,
          user_name: "Raja",
          task: "Fetch data from an API and display it in a React component.",
          "task-submited_date": "22-oct-2020",
        },
      ],
    },
    {
      _id: ObjectId("649109a543562da9f4130c07"),
      topic_id: 2,
      topic: "bootstrap",
      topic_date: "22-oct-2020",
      tasks: [
        {
          _id: ObjectId("64910f6c43562da9f4130c26"),
          task_id: 2,
          user_name: "Ganesh",
          task: "Build a responsive navigation bar using Bootstrap's Navbar component.",
          task_submited_date: "10-oct-2020",
        },
      ],
    },
    {
      _id: ObjectId("649109a543562da9f4130c08"),
      topic_id: 3,
      topic: "css",
      topic_date: "11-oct-2020",
      tasks: [
        {
          _id: ObjectId("64910f6c43562da9f4130c27"),
          task_id: 3,
          user_name: "Vinoth",
          task: "Apply different font styles, sizes, and colors to text.",
          task_submited_date: "14-oct-2020",
        },
      ],
    },
    {
      _id: ObjectId("649109a543562da9f4130c09"),
      topic_id: 4,
      topic: "node.js",
      topic_date: "11-oct-2020",
      tasks: [
        {
          _id: ObjectId("64910f6c43562da9f4130c28"),
          task_id: 4,
          user_name: "Prem",
          task: "Use the fs module to read from and write to files on the server.",
          task_submited_date: "09-oct-2020",
        },
      ],
    },
    {
      _id: ObjectId("649109a543562da9f4130c0a"),
      topic_id: 5,
      topic: "javascript",
      topic_date: "18-oct-2020",
      tasks: [
        {
          _id: ObjectId("64910f6c43562da9f4130c29"),
          task_id: 5,
          user_name: "Arun",
          task: "Create a function that takes two numbers as parameters and returns their sum.",
          task_submited_date: "25-oct-2020",
        },
      ],
    }
  ];
  
  // -------------------------------------------
  // 2.Find all the company drives which appeared between 15 oct-2020 and 31-oct-2020
  
  db.company_drives.find({
    drive_date: { $gte: "15-oct-2020", $lte: "31-oct-2020" },
  })[
    // RESULT:
    {
      _id: ObjectId("6491105343562da9f4130c2c"),
      "user-id": 1,
      user_name: "Raja",
      drive_date: "19-oct-2020",
      company_name: "flipkart",
    },
    {
      _id: ObjectId("6491105343562da9f4130c2d"),
      "user-id": 2,
      user_name: "Ganesh",
      drive_date: "21-oct-2020",
      company_name: "amazon",
    }
  ];
  
  // --------------------------------------------
  // 3.Find all the company drives and students who are appeared for the placement.
  
  db.company_drive.find()[
    // RESULT:
    {
      _id: ObjectId("6491105343562da9f4130c2c"),
      "user-id": 1,
      user_name: "Raja",
      drive_date: "19-oct-2020",
      company_name: "flipkart",
    },
    {
      _id: ObjectId("6491105343562da9f4130c2d"),
      "user-id": 2,
      user_name: "Ganesh",
      drive_date: "21-oct-2020",
      company_name: "amazon",
    },
    {
      _id: ObjectId("6491105343562da9f4130c2e"),
      "user-id": 3,
      user_name: "Vinoth",
      drive_date: "10-oct-2020",
      company_name: "twitter",
    },
    {
      _id: ObjectId("6491105343562da9f4130c2f"),
      "user-id": 4,
      user_name: "prem",
      drive_date: "11-oct-2020",
      company_name: "myntra",
    },
    {
      _id: ObjectId("6491105343562da9f4130c30"),
      "user-id": 5,
      user_name: "Arun",
      drive_date: "07-oct-2020",
      company_name: "zoho",
    }
  ];
  
  // -----------------------------------------------------
  // 4.Find the number of problems solved by the user in codekata
  
  db.codekata.aggregate([
    {
      $group: {
        _id: "$user-id",
        user_name: { $first: "$user_name" },
        total_problems_solved: { $sum: "$no_of_problems_solved" },
      },
    },
  ])[
    // Result:
    { _id: 1, user_name: "Raja", total_problems_solved: 15 },
    { _id: 4, user_name: "Prem", total_problems_solved: 28 },
    { _id: 3, user_name: "Vinoth", total_problems_solved: 19 },
    { _id: 5, user_name: "Arun", total_problems_solved: 21 },
    { _id: 2, user_name: "Ganesh", total_problems_solved: 20 }
  ];
  
  // --------------------------------------------
  // 5.Find all the mentors with who has the mentee's count more than 15
  db.mentor.find({ mentees_count: { $gte: 15 } })[
    // RESULT:
    ({
      _id: ObjectId("6491115043562da9f4130c36"),
      "mentor-id": 1,
      mentor_name: "sanjay",
      mentees_count: 16,
    },
    {
      _id: ObjectId("6491115043562da9f4130c37"),
      "mentor-id": 2,
      mentor_name: "farook",
      mentees_count: 18,
    })
  ];
  // --------------------------------------------------
  // 6.Find the number of users who are absent and task is not submitted  between 15 oct-2020 and 31-oct-2020
  db.task.aggregate([
    {
      $match: {
        task_submited_date: { $gte: "15-oct-2020", $lte: "31-oct-2020" },
      },
    },
    {
      $count: "totalCount",
    },
  ])[
    // RESULT:
    { totalCount: 2 }
  ];
  
  db.attendance.aggregate([
    { $match: { absent: { $gte: "15-oct-2020", $lte: "31-oct-2020" } } },
    { $count: "totalCount" },
  ])[
    // RESULT:
    { totalCount: 2 }
  ];