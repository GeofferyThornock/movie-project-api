const knex = require("../../db/connection");
const reduceProperties = require("../../utils/reduce-properties");

function list() {
    return knex("theaters")
        .join(
            "movies_theaters",
            "theaters.theater_id",
            "movies_theaters.theater_id"
        )
        .join("movies", "movies_theaters.movie_id", "movies.movie_id")
        .select("*")
        .then(
            reduceProperties("theater_id", {
                title: ["movies", null, "title"],
                runtime_in_minutes: ["movies", null, "runtime_in_minutes"],
                rating: ["movies", null, "rating"],
            })
        );
}

module.exports = {
    list,
};
