import { Knex } from 'knex';

const TABLE_NAME = 'users';

/**
 * Delete existing entries and seed values for table TABLE_NAME.
 *
 * @param   {Knex} knex
 * @returns {Promise}
 */
export function seed(knex: Knex): Promise<void> {
  return knex(TABLE_NAME)
    .del()
    .then(() => {
      return knex(TABLE_NAME).insert([
        {
          username:'Ram',
          email:'ram@gmail.com',
          password:'11111111'
        },
        {
          username:'Hari',
          email:'hari@gmail.com',
          password:'22222222'
        },
        {
          username:'Michael',
          email:'michael@gmail.com',
          password:'33333333'
        },
      ]);
    });
}