
exports.up = function(knex) {
    return knex.schema
    .createTable('users', function (table) {
       table.int('id').notNullable();
       table.string('cpf').notNullable();
    });
};

exports.down = function(knex) {
    return knex.schema
    .dropTable("users");};
