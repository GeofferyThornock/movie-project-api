const service = require("./movies.services");

async function list(req, res, next) {
    if (req.query.is_showing) {
        res.json({ data: await service.getShowing() });
    } else {
        res.json({ data: await service.getList() });
    }
}

module.exports = {
    list,
};
