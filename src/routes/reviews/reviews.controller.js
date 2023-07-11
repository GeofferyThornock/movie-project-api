const service = require("./reviews.service");

async function urlExists(req, res, next) {
    const review_id = req.params.reviewId;
    const response = await service.read(review_id);

    if (response) {
        res.locals.review = response;
        next();
    } else {
        next({
            status: 404,
            message: "url with this id cannot be found",
        });
    }
}

async function destroy(req, res, next) {
    await service.delete(res.locals.review.review_id);
    res.status(204).json({});
}

async function update(req, res, next) {
    console.log(req.body.data);
    const updatedReview = {
        ...res.locals.review,
        ...req.body.data,
        review_id: res.locals.review.review_id,
    };
    const data = await service.update(updatedReview);
    res.json({ data });
}

module.exports = {
    delete: [urlExists, destroy],
    update: [urlExists, update],
};
