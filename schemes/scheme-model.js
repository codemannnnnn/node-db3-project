const knex = require("knex");
const knexConfig = require("../knexfile.js");
const db = knex(knexConfig.development);

module.exports = {
  find,
  findById,
  findSteps,
  add,
  update,
  remove,
};

function find() {
  return db("schemes");
}

function findById(id) {
  return db("schemes").where({ id: id });
}

function findSteps(id) {
  return db("schemes as s")
    .join("steps as st", "st.scheme_id", "s.id")
    .where("s.id", id)
    .select("st.id", "s.scheme_name", "st.step_number", "st.instructions")
    .orderBy("st.step_number");
}

function add(scheme) {
  return db("schemes as s")
    .insert(scheme, "id")
    .then((ids) => ({ id: ids }));
}

function update(changes, id) {
  return db("schemes as s").where({ id: id }).update(changes);
}

function remove(id) {
  return db("schemes as s").where({ id: id }).del();
}
