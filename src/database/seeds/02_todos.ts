import { Knex } from 'knex';

const TABLE_NAME = 'tasks';

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
          title:'study book',
          completed:false,
          created_by:1
        },
        {
          title:'study novel',
          completed:false,
          created_by:2
        },
        {
          title:'study fictions',
          completed:false,
          created_by:3
        },
      ]);
    });
}