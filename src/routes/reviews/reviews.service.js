const knex = require("../../db/connection");
const mapProperties = require("../../utils/map-properties");

function read(id) {
    return knex("reviews").select("*").where({ review_id: id }).first();
}

function destroy(review_id) {
    return knex("reviews").where({ review_id }).del();
}

const addCritic = mapProperties({
    preferred_name: "critic.preferred_name",
    surname: "critic.surname",
    organization_name: "critic.organization_name",
});

function update(content) {
    return knex("reviews as r")
        .select("*")
        .where({ review_id: content.review_id })
        .update(content)
        .then(() =>
            knex("reviews")
                .join("critics", "reviews.critic_id", "critics.critic_id")
                .select("reviews.*", "critics.*")
                .where({ "reviews.review_id": content.review_id })
                .then((data) => data.map(addCritic)[0])
        );
}

module.exports = {
    read,
    delete: destroy,
    update,
};
