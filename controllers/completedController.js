const Issues = require("../models/Issues");
const Equipment = require("../models/Equipment");
const User = require("../models/User");
const Completed = require("../models/Complete_task");

exports.getCompletedAll = async (req, res) => {
  let page = parseInt(req.query.page) || 1;
  let limit = parseInt(req.query.limit) || 10;
  let offset = (page - 1) * limit;

  try {
    const { count, rows: completed } = await Completed.findAndCountAll({
      include: [
        {
          model: Equipment,
          as: "Equipment",
          attributes: ["equipment_name"],
        },
        {
          model: Issues,
          as: "Issues",
          attributes: ["description"],
        },
        {
          model: User,
          as: "User",
          attributes: ["username"],
        },
      ],
      limit: limit,
      offset: offset,
      order: [["id", "ASC"]],
    });
    const formattedIssues = completed.map((task) => ({
      id: task.id,
      issue_id : task.issue_id,
      equipment_name: task.Equipment?.equipment_name || "Not found",
      description: task.Issues?.description,
      username: task.User?.username,
      status: task.status,
      completed_at: task.completed_at
    }));
    res.json({
      completed: formattedIssues,
      currentPage: page,
      totalPages: Math.ceil(count / limit),
    });
  } catch (err) {
    console.error("Error fetching issues:", err);
    res.status(500).json({ message: "Error fetching issues" });
  }
};