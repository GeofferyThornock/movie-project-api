const { map } = require("../../app");
const knex = require("../../db/connection");
const mapProperties = require("../../utils/map-properties");

function getList() {
    return knex("movies").select("*");
}

function getShowing() {
    return knex("movies_theaters as mt")
        .join("movies as m", "mt.movie_id", "m.movie_id")
        .select("m.*")
        .where({ "mt.is_showing": true })
        .groupBy("m.movie_id");
}

function read(movieId) {
    return knex("movies")
        .select("*")
        .where({ movie_id: movieId })
        .then((data) => data[0]);
}

function readTheaters(movieId) {
    return knex("movies_theaters as mt")
        .join("theaters as t", "mt.theater_id", "t.theater_id")
        .select("t.*", "mt.*", "movie_id")
        .where({ movie_id: movieId });
}

const addCritic = mapProperties({
    critic_id: "critic.critic_id",
    preferred_name: "critic.preferred_name",
    surname: "critic.surname",
    organization_name: "critic.organization_name",
    created_at: "critic.created_at",
    updated_at: "critic.updated_at",
});

function readReviews(movieId) {
    return knex("reviews as r")
        .join("critics as c", "r.critic_id", "c.critic_id")
        .select("r.*", "c.*")
        .where({ movie_id: movieId })
        .then((reviews) => reviews.map(addCritic));
}

module.exports = {
    getList,
    getShowing,
    read,
    readTheaters,
    readReviews,
};
