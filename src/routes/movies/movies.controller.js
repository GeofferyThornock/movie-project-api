const service = require("./movies.service");

//validation handlers
async function movieExists(req, res, next) {
    const { movieId } = req.params;
    const movie = await service.read(movieId);
    if (movie) {
        res.locals.movie = movie;
        next();
    } else {
        next({ status: 404, message: `Movie cannot be found.` });
    }
}

async function list(req, res, next) {
    const { is_showing } = req.query;
    if (is_showing) {
        console.log("is_showing is true");
        res.json({ data: await service.getShowing() });
    } else {
        res.json({ data: await service.getList() });
    }
}

async function read(req, res, next) {
    const movie_id = res.locals.movie.movie_id;
    const data = await service.read(movie_id);
    res.json({ data: await service.read(movie_id) });
}

async function readTheaters(req, res, next) {
    const movie_id = res.locals.movie.movie_id;
    const data = await service.readTheaters(movie_id);
    res.json({ data });
}

async function readReviews(req, res, next) {
    const movie_id = res.locals.movie.movie_id;
    const data = await service.readReviews(movie_id);
    res.json({ data });
}

module.exports = {
    list,
    read: [movieExists, read],
    readTheaters: [movieExists, readTheaters],
    readReviews: [movieExists, readReviews],
};
