import Knex from 'knex';

export async function up(knex: Knex){
    return await knex.schema.createTable('connections', table => {
        table.increments('id').primary();
       
        table.integer('user_id')
        .notNullable()
        .references('id')
        .inTable('users')
        .onDelete('CASCADE')
        .onUpdate('CASCADE')

        table.timestamp('created_at')
        .defaultTo(knex.raw('CURRENT_TIMESTAMP'))
        .notNullable();
    });
}

export async function down(knex: Knex){
    return await knex.schema.dropTable('connections')
}