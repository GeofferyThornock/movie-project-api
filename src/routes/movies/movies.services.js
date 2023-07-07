const knex = require("../../db/connection");

function getList() {
    return knex("movies").select("*");
}

function getShowing() {
    return knex("movies as m")
        .select("*")
        .join("movies_theaters as mt", "m.movie_id", "mt.movie_id")
        .where({ is_showing: true });
}

module.exports = {
    getList,
    getShowing,
};
